import express from 'express';
import diagnosesRouter from './routes/diagnoses';

const app = express();

app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('some magic happened');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
