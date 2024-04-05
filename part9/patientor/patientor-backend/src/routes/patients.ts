import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientData from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.get('/:id', (req, res) => {
  const patient = patientsService.findPatientById(req.params.id);

  if (patient) res.send(patient);
  else res.sendStatus(404);
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const addedPatient = patientsService.addPatient(newPatientData);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
