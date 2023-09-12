import Part from './Part'

const Content = ({content}) => {
    const parts = content.map(el => <Part key={el.id} name={el.name} exercises={el.exercises} />)
    const total = content.reduce((result, el) => result + el.exercises, 0)

    return (
        <div>
            {parts}
            <div>
                <b> {"total of " + total + " exercises"} </b>
            </div>
        </div>
    )
}

export default Content