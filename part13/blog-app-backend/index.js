import express from 'express';
import { config } from 'dotenv';
import 'express-async-errors';

import { connectToDB } from './util/db.js';

import blogsRouter from './controllers/blogs.js';
import userRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import authorRouter from './controllers/authors.js';

const app = express();

app.use(express.json());
config();

const PORT = process.env.PORT || 3001;

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);

const start = async () => {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
