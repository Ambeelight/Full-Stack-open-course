const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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

test('responds with 0 if likes property is missing', async () => {
  const newBlog = {
    title: 'Likes missing',
    author: 'Test Likes',
    url: 'www.wherearelikes.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('responds with 400 Bad Request if title is missing', async () => {
  const newBlog = {
    author: 'Test Title',
    url: 'www.checktitle.com',
    likes: 1,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('responds with 400 Bad Request if url is missing', async () => {
  const newBlog = {
    title: 'Test URL',
    author: 'Test URL',
    likes: 1,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

describe('DELETE method', () => {
  test('blog deleted successfully', async () => {
    const newBlog = new Blog({
      title: 'Test Delete',
      author: 'Deleted',
      url: 'https://deletedblog.com',
      likes: 3,
    })
    const savedBlog = await newBlog.save()

    await api.delete(`/api/blogs/${savedBlog.id}`).expect(204)

    const deletedBlog = await Blog.findById(savedBlog.id)
    expect(deletedBlog).toBeNull()
  })

  test('responds with 404 Not Found if blog not found', async () => {
    const nonExistentId = '000000000000000000000000'

    await api.delete(`/api/blogs/${nonExistentId}`).expect(404)
  })
})

describe('PUT method', () => {
  test('blog updated successfully', async () => {
    const newBlog = new Blog({
      title: 'Test Update',
      author: 'Updated',
      url: 'https://updateme.com',
      likes: 3,
    })

    const saveBlog = await newBlog.save()

    const updatedLikes = 5

    const result = await api
      .put(`/api/blogs/${saveBlog.id}`)
      .send({ likes: updatedLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log('updted blog', result)
    expect(result.body.likes).toBe(updatedLikes)
  })

  test('responds with 404 Not Found if blog not found', async () => {
    const nonExistentId = '000000000000000000000000'
    const updatedLikes = 5

    await api.put(`/api/blogs/${nonExistentId}`).send({ likes: updatedLikes }).expect(404)
  })

  test('responds with 400 if likes property is missing', async () => {
    const blog = new Blog({
      title: 'Missing Likes',
      author: 'Test Author',
      url: 'www.missing-likes.com',
      likes: 5,
    })
    const savedBlog = await blog.save()

    await api.put(`/api/blogs/${savedBlog.id}`).send({}).expect(400)
  })
})

describe('Check user login data', () => {
  test('responds with 400 Bad Request if user login is too short', async () => {
    const user = {
      username: 'Si',
      name: 'Sisi',
      password: '123si',
    }

    await api.post('/api/users').send(user).expect(400)
  })

  test('responds with 400 Bad Request if user password is too short', async () => {
    const user = {
      username: 'Sisi',
      name: 'Sisi',
      password: '12',
    }

    await api.post('/api/users').send(user).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
