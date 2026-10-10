import { useState } from "react";

const Button = (props) => (
  <button onClick={() => props.func(props.state + 1)}>{props.text}</button>
);

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tr>
          <StatisticsLine text={"good"} value={props.good} />
        </tr>
        <tr>
          <StatisticsLine text={"neutral"} value={props.neutral} />
        </tr>
        <tr>
          <StatisticsLine text={"bad"} value={props.bad} />
        </tr>
        <tr>
          <StatisticsLine text={"all"} value={props.all} />
        </tr>
        <tr>
          <StatisticsLine text={"average"} value={props.average} />
        </tr>
        <tr>
          <StatisticsLine text={"positive"} value={props.positive} />
        </tr>
      </table>
    </>
  );
};

const StatisticsLine = (props) => (
  <>
    <td>{props.text}</td>
    <td>
      {props.text === "average"
        ? props.value.toFixed(1)
        : props.text === "positive"
          ? props.value.toFixed(2)
          : props.value}
      {props.text === "positive" ? " %" : ""}
    </td>
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = (good * 100) / all;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button func={setGood} state={good} text="good" />
        <Button func={setNeutral} state={neutral} text="neutral" />
        <Button func={setBad} state={bad} text="bad" />
      </div>
      {all > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
