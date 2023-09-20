import { useState } from "react";

const Display = ({ value }) => (
    <div>
        <h2>{value}</h2>
    </div>
);

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <th style={{ textAlign: "left" }}>{text}</th>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad, total }) => {
    return (
        <div>
            <Display value="Statistics" />

            {total === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table width="150">
                    <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />
                        <StatisticLine text="total" value={total} />
                        <StatisticLine
                            text="average"
                            value={((good - bad) / total).toFixed(1)}
                        />
                        <StatisticLine
                            text="positive"
                            value={`${((good / total) * 100).toFixed(1)} %`}
                        />
                    </tbody>
                </table>
            )}
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);

    const setToValue = (setValue, newValue) => {
        setValue(newValue);
        setTotal(total + 1);
    };

    return (
        <div>
            <Display value="Give feedback" />
            <div>
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
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} />
        </div>
    );
};

export default App;
