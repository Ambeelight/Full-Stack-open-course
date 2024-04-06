import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>
      <em>{entry.description}</em>
      {entry.sickLeave ? (
        <div>
          <strong>Sick leave:</strong>From {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}{' '}
        </div>
      ) : null}
    </div>
  );
};

export default OccupationalHealthcare;
