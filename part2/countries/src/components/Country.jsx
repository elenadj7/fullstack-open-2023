const Country = ({ country }) => {
    const languages = Object.entries(country.languages).map(([code, name]) => (
      <li key={code}>{name}</li>
    ))

    return (
      <div>
        <h2> {country.name.common} </h2>
        <p> capital: {country.capital} </p>
        <p> area: {country.area} </p>
        <b> languages </b>
        <ul>
            {languages}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}></img>
      </div>
    )
  }
  
  export default Country
  