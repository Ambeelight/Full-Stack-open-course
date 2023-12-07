import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const deleteBtnStyle = {
  backgroundColor: '#526FFF',
  color: 'white',
}

const Blog = ({ blog, likeHandler, deleteBlog, user }) => {
  const [showData, setShowData] = useState(false)

  const toggleData = () => setShowData(!showData)

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleData}>{showData ? 'Hide' : 'Show'}</button>
      </div>
      {showData && (
        <div className="blog__hided">
          Website: {blog.url} <br />
          Likes: {blog.likes}
          <button className="like" onClick={() => likeHandler(blog)}>
            like
          </button>{' '}
          <br />
          Added by {blog.user.name} <br />
          {blog.user.name === user.name ? (
            <button className="removeBlog" onClick={() => deleteBlog(blog)} style={deleteBtnStyle}>
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
