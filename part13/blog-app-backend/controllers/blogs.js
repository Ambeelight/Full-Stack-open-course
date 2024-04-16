import express from 'express';
import Blog from '../models/blog.js';

const router = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(blogs);
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);

  return res.json(blog);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  await req.blog.destroy();

  return res.json({ message: 'The blog deleted successfully' });
});

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

export default router;
