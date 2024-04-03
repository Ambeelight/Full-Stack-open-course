import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          <Part part={part} />
        </p>
      ))}
    </div>
  );
};

export default Content;
