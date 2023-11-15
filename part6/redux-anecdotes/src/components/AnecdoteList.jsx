/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') return anecdotes
    return anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (anecdote) => dispatch(voteAnecdote({ id: anecdote.id }))

  const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}
export default AnecdoteList
