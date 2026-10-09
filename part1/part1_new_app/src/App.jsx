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
      <Part part={props.p1.name} exer={props.p1.exercises} />
      <Part part={props.p2.name} exer={props.p2.exercises} />
      <Part part={props.p3.name} exer={props.p3.exercises} />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.exer1 + props.exer2 + props.exer3}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total
        exer1={part1.exercises}
        exer2={part2.exercises}
        exer3={part3.exercises}
      />
    </div>
  );
};

export default App;
