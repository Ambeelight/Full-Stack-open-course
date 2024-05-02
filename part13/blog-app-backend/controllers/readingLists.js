import express from 'express';
import { User, Blog, ReadingList } from '../models/index.js';
import { tokenExtractor } from '../util/middleware.js';

const router = express.Router();

router.post('/', tokenExtractor, async (req, res) => {
  const userId = req.decodedToken.id;
  const { blogId } = req.body;

  const user = await User.findByPk(userId);
  if (!user) return res.status(400).json({ error: 'user not found' });

  const blog = await Blog.findByPk(blogId);
  if (!blog) return res.status(400).json({ error: 'blog not found' });

  const list = await ReadingList.create({ userId, blogId });

  res.json(list);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params;

  const readingBlog = await ReadingList.findByPk(id);
  if (!readingBlog) return res.status(404).end();

  if (req.decodedToken.id !== readingBlog.userId)
    return res.status(400).json({ error: 'You do not have permission' });

  const updatedBlog = await ReadingList.update(
    { read: req.body.read },
    { where: { id } }
  );

  res.json(updatedBlog);
});

export default router;
