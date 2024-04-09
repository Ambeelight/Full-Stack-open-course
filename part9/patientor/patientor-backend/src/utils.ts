import {
  NewPatientData,
  Gender,
  NewEntryData,
  Diagnosis,
  Types,
  HealthCheckRating,
  BaseEntry,
  Discharge,
  SickLeave,
} from './types';

export const toNewPatientData = (object: unknown): NewPatientData => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newData: NewPatientData = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newData;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  } else if (!isDate(dateOfBirth)) {
    throw new Error('Invalid date format');
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isType = (param: string): param is Types => {
  return Object.values(Types)
    .map((t) => t.toString())
    .includes(param);
};

const parseType = (type: unknown): Types => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error('Incorrect type');
  }

  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date');
  } else if (!isDate(date)) {
    throw new Error('Invalid date format');
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing date');
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }

  return employerName;
};

const isCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((rating) => Number(rating))
    .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (isNaN(Number(rating)) || !isCheckRating(Number(rating))) {
    throw new Error('Incorrect or missing healthcheck rating ' + rating);
  }

  return Number(rating);
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing sickleave data');
  }
  if ('startDate' in object && 'endDate' in object) {
    const newEntry: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseCriteria(object.endDate),
    };

    return newEntry;
  }

  throw new Error('Incorrect or missing start or end date');
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing sickleave data');
  }
  if ('date' in object && 'criteria' in object) {
    const newEntry: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };

    return newEntry;
  }

  throw new Error('Incorrect or missing date or criteria');
};

export const toNewEntryData = (object: unknown): NewEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    const baseEntry: Omit<BaseEntry, 'id'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };
    if ('diagnosisCode' in object)
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCode);
    const type = parseType(object.type);
    switch (type) {
      case 'Hospital':
        if ('discharge' in object) {
          const entry: NewEntryData = {
            ...baseEntry,
            discharge: parseDischarge(object.discharge),
            type,
          };

          return entry;
        }
        throw new Error('Incorrect data in discharge');

      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          const entry: NewEntryData = {
            ...baseEntry,
            employerName: parseEmployerName(object.employerName),
            type,
          };
          if ('sickLeave' in object)
            entry.sickLeave = parseSickLeave(object.sickLeave);

          return entry;
        }
        throw new Error('Incorrect data in employer name or sickLeave');

      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const entry: NewEntryData = {
            ...baseEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            type,
          };

          return entry;
        }
        throw new Error('Incorrect healthcheck rating');

      default:
        throw new Error('Invalid data');
    }
  }
  throw new Error('Incomplete data');
};
