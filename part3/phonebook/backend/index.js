const express = require('express')
const { request } = require('http')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

app.use(morgan('tiny'))

morgan.token('req-body-json', (request) => {
    if (request.body) {
      return JSON.stringify(request.body)
    }
    return ''
});
  
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body-json')
)
  
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err); 
  
    res.status(500).json({ error: 'Internal Server Error' });
  });
  

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response, next) => {
    const currentTime = new Date().toLocaleString()
    Person.find({})
    .then(ps => {
      const personsCount = ps.length

      const res = `Phonebook has info for ${personsCount} people<br />${currentTime}`
      response.send(res)
    })
    .catch(error => {
        next(error)
    });
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(ps => {
        response.json(ps)
    })
    .catch(error => {
        next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        response.json(person)
    })
    .catch(error => {
        next(error)
    });
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findOneAndDelete({ _id: request.params.id})
    .then(person => {
        response.status(204).end()
    })
    .catch(error => {
        next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name || !body.number){
        response.status(400).json({ error: 'missing name or number' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(p =>{
        response.status(204).json(p)
    })
    .catch(error =>{
        next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if(!body.number){
        response.status(400).json({error: 'missing number'})
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'}).then(p => {
        response.status(200).json(person)
    })
    .catch(error => {
        next(error)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})