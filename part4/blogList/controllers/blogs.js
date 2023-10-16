const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  if (!body.title) {
    return response.status(400).json({ error: 'Title is missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'URL is missing' })
  }

  const result = await body.save()

  response.status(201).json(result)
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
