interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => {
  return <p>number of exercises {props.totalExercises}</p>;
};

export default Total;
