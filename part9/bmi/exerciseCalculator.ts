interface TrainingValues {
  exerciseHours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): TrainingValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const trainingHours = args.slice(2, args.length - 1).map(Number);

  if (trainingHours.some(isNaN) || isNaN(Number(args[args.length - 1]))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return {
      exerciseHours: trainingHours,
      target: Number(args[args.length - 1]),
    };
  }
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average =
    exerciseHours.reduce((sum, curr) => sum + curr, 0) / periodLength;
  const success = target >= average;
  const getRating = (average: number, target: number): number => {
    if (average < target) {
      return 1;
    } else if (average === target) {
      return 2;
    } else {
      return 3;
    }
  };
  const rating = getRating(average, target);
  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return 'not too bad but could be better';
    } else if (rating === 2) {
      return 'nicely done! You achieved the target';
    } else return 'you are machine, not a human';
  };
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
