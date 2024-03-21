import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const UserRecommendations = () => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])

  const { data: userData, loading: userLoading } = useQuery(ME)

  useEffect(() => {
    if (userData) {
      setFavoriteGenre(userData.me.favoriteGenre)
    }
  }, [userData])

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  })

  useEffect(() => {
    if (booksData) {
      setBooks(booksData.allBooks)
    }
  }, [booksData])

  if (userLoading || booksLoading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>patterns</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserRecommendations
