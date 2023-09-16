const Filter = (props) => {
    const array = props.persons.map(p => <div key={p.id}> {p.name} {p.number} </div>)
    return(
        <div>
            <form onSubmit={props.filter}>
                <div>
                    filter shown with <input value={props.newFilter} onChange={props.handleNewFilterOnChange}></input>
                </div>
            </form>
            {array}
        </div>
    )
}

export default Filter