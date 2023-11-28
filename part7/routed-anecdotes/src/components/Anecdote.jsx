/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
    </div>
  )
}

export default Anecdote
