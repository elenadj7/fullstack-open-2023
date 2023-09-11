import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Anecdote = (props) => (
  <div>
    {props.anecdotes[props.selected]}
    <div>
      {"has " + props.points[props.selected] + " points"}
    </div>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votes = Array(anecdotes.length).fill(0)

  const getRandomIndex = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  }
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(votes)
  const maxVotes = points.indexOf(Math.max(...points))

  const handleNextAnecdote = () => {  
    const index = getRandomIndex(anecdotes)
    setSelected(index)
  }

  const handleVote = () => {
    const tempPoints = [...points]
    tempPoints[selected] += 1
    setPoints(tempPoints)
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <Anecdote anecdotes={anecdotes} selected={selected} points={points} />
      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleNextAnecdote} />
      <h1>
        Anecdote with the most vote
      </h1>
      <Anecdote anecdotes={anecdotes} selected={maxVotes} points={points} />
    </div>
  )
}

export default App