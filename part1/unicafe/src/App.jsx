import { useState } from 'react'

const Title = props => <div> <h1> {props.title} </h1></div>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return(
    <tr> 
      <td> {props.name} </td>
      <td> {props.count} </td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.total === 0){
    return(
      <div>
        <p>
        No feedback given
        </p>
      </div>
    )
  }
  
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine name="good" count={props.good} />
          <StatisticLine name="neutral" count={props.neutral} />
          <StatisticLine name="bad" count={props.bad} />
          <StatisticLine name="average" count={props.average} />
          <StatisticLine name="positive" count={props.positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const average = (good - bad) / total; //average?
  const positive = (good / total) * 100; //percentage 

  return (
    <div>
      <Title title="give feedback" />

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Title title="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} average={average} positive={positive} total={total}/>
    </div>
  )
}

export default App