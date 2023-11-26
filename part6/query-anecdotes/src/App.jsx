import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './anecdotes'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotification()

  const updateVotes = useMutation({
    mutationFn: updateAnecdote,
    onMutate: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      )
      notify(`anecdotes '${updatedAnecdote.content}' voted`)
    },
  })

  const handleVote = (anecdote) => {
    updateVotes.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>Loading...</div>

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  console.log('Anecdotes', result)
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
