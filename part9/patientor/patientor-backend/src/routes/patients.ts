import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientData, toNewEntryData } from '../utils';

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

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntryData = toNewEntryData(req.body);
    const patient = patientsService.findPatientById(req.params.id);

    if (!patient) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const addedEntry = patientsService.addEntry(newEntryData, patient);

      res.send(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';

    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }

    res.status(400).json({ error: errorMessage });
  }
});

export default patientsRouter;
