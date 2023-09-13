import { useEffect, useState } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(data => {
        console.log('promise fulfilled')
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target.value)
    
    const existingPerson = persons.find(p => p.name === newName)

    if(existingPerson){
      if(window.confirm(`${newName} ${newNumber} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = {id: existingPerson.id, name: existingPerson.name, number: newNumber}
        personsService
        .updatePerson(updatedPerson)
        .then(data =>{
          const tempPersons = persons.filter(p => p.id !== updatedPerson.id)
          tempPersons.push(updatedPerson)
          setPersons(tempPersons);
          setMessage(`Person ${updatedPerson.name} is updated successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(err => {
          setMessage(`can\'t update ${updatedPerson.name}`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType('')
          }, 5000)
        })
      }
      
      return;
    }

    const newId = persons.length + 1
    const tempPerson = { id: newId, name: newName, number: newNumber} 
    const temp = [...persons]
    temp.push(tempPerson)
    personsService
    .addPerson(tempPerson)
    .then(data =>{
      setPersons(temp)
      setMessage(`Person ${tempPerson.name} is added successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(err => {
      setMessage(`can\'t add ${tempPerson.name}`)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    })
  }

  const deletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      
      personsService
        .deletePerson(id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(err => {
          setMessage(`can\'t delete ${personToDelete.name}`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType('')
          }, 5000)
        })
    }
  }

  const handleNewNameOnChange = (event) => {
    setNewName(event.target.value)
    //console.log(newName)
  }

  const handleNewNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilterOnChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filter = (event) => {
    event.preventDefault()

    const filtered = persons.filter(p => p.name.includes(newFilter))
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter filter={filter} newFilter={newFilter} handleNewFilterOnChange={handleNewFilterOnChange} persons={filteredPersons}/>
      <Notification message={message} type={messageType}/>
      <Header header="Add a new" />
      <PersonForm addPerson={addPerson} newName={newName} handleNewNameOnChange={handleNewNameOnChange} newNumber={newNumber} handleNewNumberOnChange={handleNewNumberOnChange} />
      <Header header="Numbers" />
      <Persons persons={persons} onDelete={deletePerson}/>
    </div>
  )
}

export default App