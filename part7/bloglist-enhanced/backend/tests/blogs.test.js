const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('the most popular blog', () => {
  test('return the blog with biggest amount of likes', () => {
    const blogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
        likes: 5,
      },
      {
        title: 'Blog 2',
        author: 'Author 2',
        likes: 10,
      },
      {
        title: 'Blog 3',
        author: 'Author 3',
        likes: 7,
      },
    ]

    const topBlog = {
      title: 'Blog 2',
      author: 'Author 2',
      likes: 10,
    }

    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual(topBlog)
  })

  describe('the most active author', () => {
    test('return author with the biggest amount of blogs', () => {
      const blogs = [
        {
          title: 'Blog Post 1',
          author: 'Author 1',
          likes: 10,
        },
        {
          title: 'Blog Post 2',
          author: 'Author 2',
          likes: 15,
        },
        {
          title: 'Blog Post 3',
          author: 'Author 1',
          likes: 8,
        },
        {
          title: 'Blog Post 4',
          author: 'Author 3',
          likes: 12,
        },
        {
          title: 'Blog Post 5',
          author: 'Author 2',
          likes: 6,
        },
        {
          title: 'Blog Post 6',
          author: 'Author 3',
          likes: 7,
        },
        {
          title: 'Blog Post 7',
          author: 'Author 1',
          likes: 9,
        },
        {
          title: 'Blog Post 8',
          author: 'Author 2',
          likes: 11,
        },
      ]

      const result = listHelper.mostBlogs(blogs)
      const maxBlogs = {
        author: 'Author 1',
        blogs: 3,
      }

      expect(result).toEqual(maxBlogs)
    })
  })

  describe('the most popular author', () => {
    test('return author with the biggest amount of likes', () => {
      const blogs = [
        {
          title: 'Blog Post 1',
          author: 'Author 1',
          likes: 10,
        },
        {
          title: 'Blog Post 2',
          author: 'Author 2',
          likes: 15,
        },
        {
          title: 'Blog Post 3',
          author: 'Author 1',
          likes: 8,
        },
        {
          title: 'Blog Post 4',
          author: 'Author 3',
          likes: 12,
        },
        {
          title: 'Blog Post 5',
          author: 'Author 2',
          likes: 6,
        },
        {
          title: 'Blog Post 6',
          author: 'Author 3',
          likes: 7,
        },
        {
          title: 'Blog Post 7',
          author: 'Author 1',
          likes: 9,
        },
        {
          title: 'Blog Post 8',
          author: 'Author 2',
          likes: 11,
        },
      ]

      const result = listHelper.mostLikes(blogs)
      const maxLikes = {
        author: 'Author 2',
        likes: 32,
      }

      expect(result).toEqual(maxLikes)
    })
  })
})
