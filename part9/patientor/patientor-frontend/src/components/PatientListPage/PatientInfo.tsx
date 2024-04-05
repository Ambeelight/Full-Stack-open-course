import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Patient } from '../../types';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patientData = await patientService.getPatient(id);
        setPatient(patientData);
      }
    };

    fetchPatient();
  }, [id]);

  if (patient === undefined) return <div>Patient not found</div>;

  return (
    <div>
      <h1>
        {patient.name}
        {patient.gender === 'female' && <FemaleIcon></FemaleIcon>}
        {patient.gender === 'male' && <MaleIcon></MaleIcon>}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfo;
