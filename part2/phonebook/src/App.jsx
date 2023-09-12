import { useState } from 'react'
import Header from './components/Header'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target.value)
    
    const ifPersonExists = persons.some(p => p.name === newName)

    if(ifPersonExists){
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const tempPerson = { name : newName}
    const temp = [...persons]
    temp.push(tempPerson)
    setPersons(temp)
  }

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
    //console.log(newName)
  }

  const elements = persons.map((p, index) => <div key={index}> {p.name} </div>)
  return (
    <div>
      <h2> Phonebook </h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNameOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {elements}
    </div>
  )
}

export default App