import express from 'express';
import { Op } from 'sequelize';

import { User, Blog, ActiveSession } from '../models/index.js';
import { tokenExtractor, validToken } from '../util/middleware.js';

const router = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: req.query.search,
        },
      },
      {
        author: {
          [Op.substring]: req.query.search,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username', 'name'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  console.log(blogs);
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const token = req.validToken;
  const sessionToken = await ActiveSession.findOne({ where: { token } });
  if (sessionToken) {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });

    return res.json(blog);
  } else res.status(401).json({ message: 'Your token has been expired' });
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete(
  '/:id',
  blogFinder,
  tokenExtractor,
  validToken,
  async (req, res) => {
    const token = req.validToken;
    const sessionToken = await ActiveSession.findOne({ where: { token } });

    if (sessionToken) {
      const user = await User.findByPk(req.decodedToken.id);

      if (user.id === req.blog.userId) {
        await req.blog.destroy();
        return res.json({ message: 'The blog deleted successfully' });
      } else
        res.status(401).json({ message: 'Only author can delete the blog' });

      res.status(500).json({ message: 'Internal server error' });
    } else res.status(401).json({ message: 'Your token has been expired' });
  }
);

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

export default router;
