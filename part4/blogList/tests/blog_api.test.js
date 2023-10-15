const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('data inside db should have id instead of _id', async () => {
  const blog = new Blog({
    title: 'Test',
    author: 'Test Author',
    url: 'www.test.com',
    likes: 2,
  })

  await blog.save()

  expect(blog.id).toBeDefined()
})

test('URL successfully creates a new blog post', async () => {
  const initialBlogCount = await Blog.countDocuments({})
  const newBlog = {
    title: 'POST',
    author: 'Test POST',
    url: 'www.test.com',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogs = await api.get('/api/blogs')

  expect(blogs.body).toHaveLength(initialBlogCount + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})
