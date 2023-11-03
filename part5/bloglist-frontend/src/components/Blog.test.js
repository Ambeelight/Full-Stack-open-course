import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
