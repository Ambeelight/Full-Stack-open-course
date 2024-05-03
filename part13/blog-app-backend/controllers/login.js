import jwt from 'jsonwebtoken';
import express from 'express';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

import User from '../models/user.js';
import ActiveSession from '../models/activeSession.js';

config();

const SECRET = process.env.SECRET;
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  console.log('Passwords', { body: password, user: user.password });

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  const newSession = await ActiveSession.create({ token });

  if (!newSession)
    res.status(500).json({ error: 'could not create a session' });

  res.status(200).send({ token, username: user.username, name: user.name });
});

export default router;
