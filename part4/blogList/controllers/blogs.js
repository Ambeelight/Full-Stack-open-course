const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  console.log('authorization', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('token', getTokenFrom(request))

  if (!body.title) {
    return response.status(400).json({ error: 'Title is missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'URL is missing' })
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken || !decodedToken.id)
    return response.status(401).json({ error: 'Invalid token' })

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    userId: user.id,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const body = await Blog.findByIdAndRemove(request.params.id)

  if (!body) return response.status(404).json({ error: 'Blog not found' })

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = await request.body

  if (!body || !body.likes)
    return response
      .status(400)
      .json({ error: 'Request body is empty or missing the likes property' })

  const blog = {
    likes: body.likes,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  if (!result) return response.status(404).json({ error: 'Blog not found' })

  response.status(200).json(result)
})

module.exports = blogsRouter
