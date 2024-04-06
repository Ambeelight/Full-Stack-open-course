import { yellow } from '@mui/material/colors';
import { HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const healthCheckRating = (number: number) => {
    switch (number) {
      case 0:
        return <FavoriteIcon color='success' />;
      case 1:
        return <FavoriteIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon color='warning' />;
      case 3:
        return <FavoriteIcon color='error' />;
      default:
        return <div>Number not found</div>;
    }
  };

  return (
    <div>
      <p>
        {entry.date} <MedicalInformationIcon />
      </p>
      <em>{entry.description}</em>
      <div>{healthCheckRating(entry.healthCheckRating)}</div>
    </div>
  );
};

export default HealthCheck;
