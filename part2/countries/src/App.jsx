import { useEffect, useState } from "react"
import getAll from "./services/coutries"
import Countries from "./components/Countries"

const App = () => {

  const [countries, setCoutries] = useState([])
  const [newInput, setNewInput] = useState('')
  const [filteredCoutries, setFilteredCoutries] = useState([])


  useEffect(() => {
    getAll().then(data =>{
      setCoutries(data)
    })
  }, [])

  const handleNewInputOnChange = (event) => {
    setNewInput(event.target.value)
  }

  const filterCountries = (event) => {
    event.preventDefault()
    setFilteredCoutries(countries.filter(c => c.name.common.toUpperCase().includes(newInput.toUpperCase())))
  }

  return(
    <div>
      <form onSubmit={filterCountries}>
        <div>
          find countries: <input value={newInput} onChange={handleNewInputOnChange}></input>
        </div>
      </form>
      <Countries elements={filteredCoutries} />
    </div>
  )
}

export default App