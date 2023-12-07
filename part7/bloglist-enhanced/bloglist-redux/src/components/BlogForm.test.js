import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('fulfilled blogform', async () => {
  const createBlogHandler = jest.fn()
  const notificationHandler = jest.fn()

  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlogHandler} showNotification={notificationHandler} />)

  const input = screen.getAllByRole('textbox')
  const createBtn = screen.getByText('Create')

  await user.type(input[0], 'Test Blog')
  await user.type(input[1], 'Test Author')
  await user.type(input[2], 'www.test.com')
  await user.click(createBtn)

  expect(createBlogHandler.mock.calls).toHaveLength(1)
  expect(createBlogHandler.mock.calls[0][0].title).toBe('Test Blog')
  expect(createBlogHandler.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlogHandler.mock.calls[0][0].url).toBe('www.test.com')
})
