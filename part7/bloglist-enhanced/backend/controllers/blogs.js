const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  console.log('token', request.token)
  if (!body.title) {
    return response.status(400).json({ error: 'Title is missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'URL is missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('decoded token', decodedToken)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'Token missing or invalid' })

  const user = await request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(403).json({ error: 'You are not authorized to delete this blog' })
  }
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
