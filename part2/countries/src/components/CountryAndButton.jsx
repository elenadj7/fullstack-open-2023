const CountryAndButton = ({name, buttonOnAction}) => {
    return(
        <div>
            {name} <button onClick={() => buttonOnAction(name)}> show </button>
        </div>
    )
}

export default CountryAndButton