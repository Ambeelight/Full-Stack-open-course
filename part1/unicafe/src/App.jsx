import { useState } from "react";

const Display = (props) => (
    <div>
        <strong>{props.value}</strong>
    </div>
);

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const setToValue = (setValue, newValue) => {
        console.log("value now", newValue);
        setValue(newValue);
    };

    return (
        <div>
            <Display value="Give feedback" />
            <p>
                <Button
                    handleClick={() => setToValue(setGood, good + 1)}
                    text="good"
                />
                <Button
                    handleClick={() => setToValue(setNeutral, neutral + 1)}
                    text="neutral"
                />
                <Button
                    handleClick={() => setToValue(setBad, bad + 1)}
                    text="bad"
                />
            </p>
            <Display value="Statistics" />
        </div>
    );
};

export default App;
