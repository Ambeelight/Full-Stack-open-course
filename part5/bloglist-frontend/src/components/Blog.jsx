import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, likeHandler }) => {
  const [showData, setShowData] = useState(false)

  const toggleData = () => setShowData(!showData)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleData}>{showData ? 'Hide' : 'Show'}</button>
      </div>
      {showData && (
        <div>
          Website: {blog.url}
          <br />
          Likes: {blog.likes}
          <button onClick={() => likeHandler(blog)}>like</button>
          <br />
          Added by {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog
