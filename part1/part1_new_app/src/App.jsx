import { useState } from "react";

const Button = (props) => (
  <button onClick={() => props.func(props.state + 1)}>{props.text}</button>
);

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <StatisticsLine text={"good"} value={props.good} />
      <StatisticsLine text={"neutral"} value={props.neutral} />
      <StatisticsLine text={"bad"} value={props.bad} />
      <StatisticsLine text={"all"} value={props.all} />
      <StatisticsLine text={"average"} value={props.average} />
      <StatisticsLine text={"positive"} value={props.positive} />
    </>
  );
};

const StatisticsLine = (props) => (
  <div>
    {props.text} {props.value} {props.text === "positive" ? " %" : ""}
  </div>
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
