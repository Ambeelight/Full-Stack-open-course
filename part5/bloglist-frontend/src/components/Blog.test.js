import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Test You',
    author: 'Test Author',
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Test You')
  expect(div).toHaveTextContent('Test Author')
})

test('renders URL and number of likes when button get clicked', async () => {
  const blog = {
    url: 'www.test.com',
    likes: 32,
    user: {
      name: 'Test User',
    },
  }

  const username = {
    name: 'Test User',
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} toggleImportance={mockHandler} user={username} />)
  const div = container.querySelector('.blog')

  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  expect(div).toHaveTextContent('www.test.com')
  expect(div).toHaveTextContent(32)
})

test('like button clicked twice', async () => {
  const blog = {
    likes: 0,
    user: {
      name: 'Test User',
    },
  }

  const username = {
    name: 'Test User',
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleImportance={mockHandler} likeHandler={mockHandler} user={username} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
