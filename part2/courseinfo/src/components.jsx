const Header = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <h2 key={course.id}>{course.name}</h2>
            ))}
        </div>
    );
};

const Content = ({ courses }) => {
    const flattenedParts = courses.flatMap((course) => course.parts);

    return (
        <div>
            {flattenedParts.map((part, index) => (
                <p key={index}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    );
};

const Total = ({ courses }) => {
    const totalExercises = courses.reduce(
        (sum, course) =>
            sum +
            course.parts.reduce((partSum, part) => partSum + part.exercises, 0),
        0
    );

    return <strong> Total of {totalExercises} exercises </strong>;
};

const Part = ({ course }) => {
    return (
        <div>
            <Header courses={course} />
            <Content courses={course} />
            <Total courses={course} />
        </div>
    );
};

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => (
                <Part key={course.id} course={[course]} />
            ))}
        </div>
    );
};

export default Course;
