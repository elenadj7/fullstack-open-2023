const PersonForm = (props) => {
    return(
        <form onSubmit={props.addPerson}>
            <div>
                name: <input value={props.newName} onChange={props.handleNewNameOnChange}></input>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNewNumberOnChange}></input>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm