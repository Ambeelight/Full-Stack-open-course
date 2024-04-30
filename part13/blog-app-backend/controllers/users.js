import express from 'express';
import bcrypt from 'bcrypt';
import { User, Blog, ReadingList } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      // {
      //   model: Blog,
      //   as: 'marked_blogs',
      //   attributes: { exclude: ['userId'] },
      //   through: {
      //     attributes: [],
      //   },
      // },
    ],
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog,
        as: 'marked_blogs',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username: username,
    name: name,
    password: passwordHash,
  });
  console.log('User', user);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  req.user = await User.findByPk(req.params.username);
  req.user.username = req.body.username;
  await req.user.save();
  res.json(req.user);
});

router.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Incorrect username format. It should be an email address',
    });
  }
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;
