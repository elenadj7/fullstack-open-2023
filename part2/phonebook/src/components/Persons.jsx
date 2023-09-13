import Person from "./Person"

const Persons = ({persons}) => {
    if(persons.length === 0){
        return <div> </div>
    }
    const array = persons.map(p => <Person key={p.id} name={p.name} number={p.number} />)

    return <div> {array} </div>
}

export default Persons