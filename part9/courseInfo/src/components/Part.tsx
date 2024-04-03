import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
        </div>
      );
    case 'group':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
          <div>
            required skills:
            {part.requirements.map((requirement) => requirement).join(', ')}
          </div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
