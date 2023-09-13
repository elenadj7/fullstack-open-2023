const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type === 'error'){

    const color = {
        color: 'red'
    }

    return(
        <div className='message' style={color}>
            {message}
        </div>
    )
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

export default Notification