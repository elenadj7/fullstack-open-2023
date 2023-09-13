import { useState } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target.value)
    
    const ifPersonExists = persons.some(p => p.name === newName && p.number === newNumber)

    if(ifPersonExists){
      alert(`${newName} ${newNumber} is already added to phonebook`)
      return;
    }

    const newId = persons.length + 1
    const tempPerson = { id: newId, name: newName, number: newNumber} 
    const temp = [...persons]
    temp.push(tempPerson)
    setPersons(temp)
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
      <Filter filter={filter} newFilter={newFilter} handleNewFilterOnChange={handleNewFilterOnChange} />
      <Persons persons={filteredPersons} />
      <Header header="Add a new" />
      <PersonForm addPerson={addPerson} newName={newName} handleNewNameOnChange={handleNewNameOnChange} newNumber={newNumber} handleNewNumberOnChange={handleNewNumberOnChange} />
      <Header header="Numbers" />
      <Persons persons={persons} />
    </div>
  )
}

export default App