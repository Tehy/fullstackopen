import React, { useState } from "react";
import ReactDOM from "react-dom";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good - bad) / all).toFixed(1);

  const pos = ((good / all) * 100).toFixed(1).toString() + " %";
  return (
    <>
      {all === 0 ? (
        <p>no feedback given</p>
      ) : (
        <>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="pos" value={pos} />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
const Button = ({ handleCLick, text }) => {
  return <button onClick={handleCLick}>{text}</button>;
};

const Feedback = () => {
  return (
    <>
      <h1>Give feedback</h1>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <Feedback />
      <Button
        handleCLick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        handleCLick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        handleCLick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
