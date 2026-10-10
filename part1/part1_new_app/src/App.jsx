import { useState } from "react";

const Button = (props) => (
  <button onClick={() => props.func(props.state + 1)}>{props.text}</button>
);

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
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
        </tbody>
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

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 1,
    1: 3,
    2: 4,
    3: 2,
    4: 9,
    5: 8,
    6: 7,
    7: 5,
  });

  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = (good * 100) / all;

  function handleVotes() {
    const newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  let highestVotedAnecdote = 0;
  const keys = Object.keys(votes);
  for (const item of keys) {
    if (votes[item] > votes[highestVotedAnecdote]) {
      highestVotedAnecdote = item;
    }
  }
  console.log(highestVotedAnecdote);

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
      <br />
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>vote</button>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        next anecdote
      </button>
      <h1>Anecdote with the most votes</h1>
      <div>{anecdotes[highestVotedAnecdote]}</div>
      <div>has {votes[highestVotedAnecdote]} votes</div>
    </div>
  );
};

export default App;
