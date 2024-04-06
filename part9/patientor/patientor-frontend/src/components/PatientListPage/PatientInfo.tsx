import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import Hospital from './Hospital';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patientData = await patientService.getPatient(id);
        setPatient(patientData);
      }
    };

    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnosesService.getAll();
      setDiagnoses(diagnosesData);
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (patient === undefined) return <div>Patient not found</div>;

  const findDiagnosisName = (code: string): string | undefined => {
    const diagnosisName = diagnoses?.find((d) => d.code === code);

    return diagnosisName?.name;
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <Hospital key={entry.id} entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck key={entry.id} entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare key={entry.id} entry={entry} />;
    }
  };

  return (
    <div>
      <h1>
        {patient.name}
        {patient.gender === 'female' && <FemaleIcon></FemaleIcon>}
        {patient.gender === 'male' && <MaleIcon></MaleIcon>}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries?.map((entry) => EntryDetails({ entry }))}
      {/* {patient.entries.map((e) => (
        <div key={e.id}>
          <p>
            {e.date} {e.description}
          </p>
          <ul>
            {' '}
            {e.diagnosisCodes?.map((diagnosisCode) => (
              <li key={diagnosisCode}>
                {diagnosisCode} {findDiagnosisName(diagnosisCode)}
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
};

export default PatientInfo;
