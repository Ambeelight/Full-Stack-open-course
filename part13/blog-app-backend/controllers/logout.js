import express from 'express';

import { ActiveSession } from '../models/index.js';
import { tokenExtractor, validToken } from '../util/middleware.js';

const router = express.Router();

router.delete('/', tokenExtractor, validToken, async (req, res) => {
  const token = req.validToken;
  console.log('Token', token);

  if (token) {
    const session = await ActiveSession.findOne({ where: { token } });
    const revokeAccess = await session.destroy();

    res.json(revokeAccess);
    console.log('You have logged out');
  } else return res.status(401).json({ error: 'token invalid' });
});

export default router;
