import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_res, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({ error: 'malformed parameters' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    (daily_exercises as string[]).map(Number).some(isNaN)
  ) {
    return res.status(400).send({ error: 'malformed parameters' });
  }

  const exercisesResult = calculateExercises(
    daily_exercises as number[],
    Number(target)
  );

  return res.json(exercisesResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
