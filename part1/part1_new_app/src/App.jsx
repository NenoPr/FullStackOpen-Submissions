const Part = (props) => {
  return (
    <p>
      {props.part} {props.exer}
    </p>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part part={props.p1} exer={props.exer1} />
      <Part part={props.p2} exer={props.exer2} />
      <Part part={props.p3} exer={props.exer3} />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.exer1 + props.exer2 + props.exer3}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1}
        p2={part2}
        p3={part3}
        exer1={exercises1}
        exer2={exercises2}
        exer3={exercises3}
      />
      <Total exer1={exercises1} exer2={exercises2} exer3={exercises3} />
    </div>
  );
};

export default App;
