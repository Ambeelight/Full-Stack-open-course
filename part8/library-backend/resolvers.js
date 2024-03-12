import Author from './models/author.js'
import Book from './models/book.js'

export const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return Book.find({}).filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        )
      }
      if (args.author) return Book({ author: args.author })
      if (args.genre) return Book({ genres: args.genre })
      return Book.find({})
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        })
        await newAuthor.save()
      }

      const book = new Book({ ...args, author: author._id })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({
        name: args.name,
      })

      if (!author) return null

      author.born = args.setBornTo

      return author.save()
    },
  },
}
