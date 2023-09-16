const express = require('express')
const { request } = require('http')
const app = express()
const morgan = require('morgan')

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const currentTime = new Date().toLocaleString()
    const personsCount = persons.length

    const res = `Phonebook has info for ${personsCount} people<br />${currentTime}`
    response.send(res)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).json({ error: 'there is no person with this id' })
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( p => p.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name || !body.number){
        response.status(400).json({ error: 'missing name or number' })
    }

    const isDuplicate = persons.some(p => p.name === body.name)
    if(isDuplicate){
        response.status(400).json({ error: 'name must be unique' })
    }

    const randomNum = Math.random() * 1000000000;
    const timestamp = Date.now()
    const uniqueID = randomNum + timestamp

    const newPerson = {
        id: uniqueID,
        name: body.name,
        number: body.number
    }

    persons.push(newPerson)
    response.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})