import patientsData from '../../data/patients';
import { Patient, NonSensitivePatients } from '../types';

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

export default { getNonSensitivePatients, getPatientsData };
