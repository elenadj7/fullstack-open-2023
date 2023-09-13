const Filter = (props) => {
    return(
        <form onSubmit={props.filter}>
            <div>
                filter shown with <input value={props.newFilter} onChange={props.handleNewFilterOnChange}></input>
            </div>
        </form>
    )
}

export default Filter