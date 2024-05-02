import express from 'express';
import bcrypt from 'bcrypt';
import { User, Blog } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    ],
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const where = {};
  const { id } = req.params;
  const { read } = req.query;

  if (read && read === 'true') {
    where.read = true;
  } else where.read = false;

  const user = await User.findByPk(id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: ['read', 'id'],
          as: 'readinglists',
          where,
        },
      },
    ],
  });

  res.json(user);
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
