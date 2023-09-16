import Person from "./Person"

const Persons = ({persons, onDelete}) => {
    if(persons.length === 0){
        return <div> </div>
    }
    const array = persons.map(p => <Person key={p.id} person={p} deletePerson={onDelete}/>)

    return <div> {array} </div>
}

export default Persons