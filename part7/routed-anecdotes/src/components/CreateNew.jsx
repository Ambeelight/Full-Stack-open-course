/* eslint-disable react/prop-types */
import { useField } from '../hooks/index'

const CreateNew = ({ addNew }) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }
  const handleReset = () => {
    content.clearValue()
    author.clearValue()
    info.clearValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type="text" value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input type="text" value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input type="text" value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
