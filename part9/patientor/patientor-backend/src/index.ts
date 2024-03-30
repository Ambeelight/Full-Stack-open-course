import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('some magic happened');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
