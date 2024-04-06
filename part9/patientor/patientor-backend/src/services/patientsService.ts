import patientsData from '../../data/patients';
import { Patient, NonSensitivePatients, NewPatientData } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientsData = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);

  return patient;
};

const addPatient = (data: NewPatientData): Patient => {
  const newPatientData = {
    id: uuid(),
    ...data,
  };

  patientsData.push(newPatientData);
  return newPatientData;
};

export default {
  getNonSensitivePatients,
  getPatientsData,
  findPatientById,
  addPatient,
};