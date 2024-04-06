import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <em>{entry.description}</em>
      <div>
        discharge: {entry.discharge.date} {entry.discharge.criteria}
      </div>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default Hospital;
