import { useState } from "react";

const Display = ({ arr, element, points, votes }) => {
    const selectedAnecdote = arr[element];
    const voteCounter = points[votes];

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{selectedAnecdote}</p>
            <p>has {voteCounter} votes</p>
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const MostVoted = ({ anecdotes, points }) => {
    const mostVotedIndex = points.indexOf(Math.max(...points));
    const mostVotedAnecdote = anecdotes[mostVotedIndex];
    const mostVotes = points[mostVotedIndex];

    return (
        <div>
            <h2>Anecdote with most votes</h2>
            {mostVotes === 0 ? (
                <p>No votes yet.</p>
            ) : (
                <>
                    <p>{mostVotedAnecdote}</p>
                    <p>has {mostVotes} votes</p>
                </>
            )}
        </div>
    );
};

function App() {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

    const randomArrElement = () =>
        setSelected(Math.floor(Math.random() * anecdotes.length));

    const voteAnecdote = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
    };

    return (
        <div>
            <Display
                arr={anecdotes}
                element={selected}
                points={points}
                votes={selected}
            />
            <Button handleClick={voteAnecdote} text="Vote" />
            <Button handleClick={randomArrElement} text="Next anecdote" />
            <MostVoted anecdotes={anecdotes} points={points} />
        </div>
    );
}

export default App;
