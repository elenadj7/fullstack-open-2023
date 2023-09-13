import { useEffect, useState } from "react"
import CountryAndButton from "./CountryAndButton"
import Country from "./Country"

const Countries = ({elements}) => {

    const [countries, setCoutries] = useState('')

    const countryOnAction = (name) => {
        const el = elements.find(e => e.name.common === name)
        setCoutries(<Country country={el} />)
    }

    useEffect(() => {
        const size = elements.length
        console.log(size)

        if(size === 0){
            setCoutries("There is no match")
        }
        else if (size === 1){
            setCoutries(<Country country={elements[0]} />)
        }
        else if(size > 10){
            setCoutries("Too many matches, specify another filter")
        }
        else{
            setCoutries(elements.map(el => <CountryAndButton key={el.name.common} name={el.name.common} buttonOnAction={countryOnAction}/>))
        }
    }, [elements])

    return <div> {countries} </div>
}

export default Countries