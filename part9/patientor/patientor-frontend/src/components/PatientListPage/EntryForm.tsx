import { useState } from 'react';
import { Diagnosis, HealthCheckRating } from '../../types';
import { NewEntryData, NewBaseEntry, Types } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface EntryFormProps {
  id: string;
  diagnoses: Diagnosis[];
}

const EntryForm: React.FC<EntryFormProps> = ({ id, diagnoses }) => {
  const [description, setDesciption] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<string>('HealthCheck');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry: NewBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case Types.HealthCheck:
        const healthRating = Object.values(HealthCheckRating).find(
          (rating) => rating === Number(healthCheckRating)
        );
        const newHealthCheckEntry: NewEntryData = {
          ...baseEntry,
          healthCheckRating: healthRating as HealthCheckRating,
          type: Types.HealthCheck,
        };
        createEntry(newHealthCheckEntry);
        break;

      case Types.OccupationalHealthcare:
        const newOccupationalHealthcare: NewEntryData = {
          ...baseEntry,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
          type: Types.OccupationalHealthcare,
        };
        createEntry(newOccupationalHealthcare);
        break;

      case Types.Hospital:
        const newHospitalEntry: NewEntryData = {
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria,
          },
          type: Types.Hospital,
        };
        createEntry(newHospitalEntry);
        break;

      default:
        throw new Error('Incorrect type');
    }

    setDesciption('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setType('HealthCheck');
    setDischargeDate('');
    setCriteria('');
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName('');
    setStartDate('');
    setEndDate('');
  };

  const createEntry = async (entry: NewEntryData) => {
    try {
      await patientService.createEntry(entry, id);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) console.error(error);
    }
  };

  const addDiagnosisCode = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <button onClick={toggleVisibility}> {isVisible ? 'Hide' : 'Show'}</button>
      {isVisible && (
        <div>
          <form onSubmit={handleSubmit}>
            <h3>New {type} entry</h3>
            <div>
              Description:
              <input
                type='text'
                value={description}
                onChange={({ target }) => setDesciption(target.value)}
              />
            </div>
            <div>
              Date:
              <input
                type='date'
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </div>
            <div>
              Specialist:
              <input
                type='text'
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
            </div>
            <div>
              Diagnosis codes:
              <Select
                name='diagnosisCodes'
                value={diagnosisCodes}
                onChange={addDiagnosisCode}
                multiple
              >
                {diagnoses.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    {d.code}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <select
              name='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option defaultValue='HealthCheck'>HealthCheck</option>
              <option value='OccupationalHealthcare'>
                OccupationalHealthcare
              </option>
              <option value='Hospital'>Hospital</option>
            </select>

            {type === 'HealthCheck' && (
              <div>
                Healthcheck rating
                <select
                  name='healthCheckRating'
                  onChange={(e) => setHealthCheckRating(Number(e.target.value))}
                >
                  <option value={HealthCheckRating.Healthy}>Healthy</option>
                  <option value={HealthCheckRating.LowRisk}>Low risk</option>
                  <option value={HealthCheckRating.HighRisk}>High risk</option>
                  <option value={HealthCheckRating.CriticalRisk}>
                    Critical risk
                  </option>
                </select>
              </div>
            )}
            {type === 'OccupationalHealthcare' && (
              <div>
                <div>
                  Employer name:
                  <input
                    type='text'
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                  />
                </div>
                <div>
                  Sick leave:
                  <div>
                    From
                    <input
                      type='date'
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    to
                    <input
                      type='date'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            {type === 'Hospital' && (
              <div>
                <div>
                  Discharge:
                  <div>
                    Date:
                    <input
                      type='date'
                      value={dischargeDate}
                      onChange={(e) => setDischargeDate(e.target.value)}
                    />
                  </div>
                  <div>
                    Criteria:
                    <input
                      type='text'
                      value={criteria}
                      onChange={(e) => setCriteria(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <button onChange={handleSubmit}>create</button>
          </form>
          <button onClick={() => toggleVisibility()}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EntryForm;
