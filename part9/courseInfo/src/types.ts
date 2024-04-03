interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesciption extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDesciption {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDesciption {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartDesciption {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
