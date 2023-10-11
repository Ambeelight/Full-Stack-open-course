const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  //   let topBlog = blogs[0]

  //   for (let i = 0; i < blogs.length; i++) {
  //     if (topBlog.likes < blogs[i].likes) topBlog = blogs[i]
  //   }

  const topBlog = blogs.reduce((maxBlog, currentBlog) =>
    currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
  )

  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounter = {}

  blogs.forEach((blog) => {
    if (authorCounter[blog.author]) authorCounter[blog.author]++
    else authorCounter[blog.author] = 1
  })

  let maxAuthor = ''
  let maxBlogs = 0

  for (const author in authorCounter) {
    if (authorCounter[author] > maxBlogs) {
      maxAuthor = author
      maxBlogs = authorCounter[author]
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  blogs.forEach((blog) => {
    if (authorLikes[blog.author]) authorLikes[blog.author] += blog.likes
    else authorLikes[blog.author] = blog.likes
  })

  let maxAuthor = ''
  let maxLikes = 0

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxAuthor = author
      maxLikes = authorLikes[author]
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
