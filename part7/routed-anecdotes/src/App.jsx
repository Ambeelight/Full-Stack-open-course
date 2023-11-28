/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])
  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    notify(`New anecdote '${anecdote.content}' has beed added`)

    navigate('/anecdotes')
  }

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   }

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  // }

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>{notification}</div>
      <div>
        <Link style={padding} to="/anecdotes">
          anecdotes
        </Link>
        <Link style={padding} to="/create_new">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />}></Route>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path="/create_new" element={<CreateNew addNew={addNew} />}></Route>
        <Route path="about" element={<About />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
