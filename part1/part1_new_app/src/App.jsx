import { useState } from "react";

const Button = (props) => (
  <button onClick={() => props.func(props.state + 1)}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button func={setGood} state={good} text="good" />
        <Button func={setNeutral} state={neutral} text="neutral" />
        <Button func={setBad} state={bad} text="bad" />
      </div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
