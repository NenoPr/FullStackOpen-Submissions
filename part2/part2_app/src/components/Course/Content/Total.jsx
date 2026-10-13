const Total = (props) => {
  const total = props.parts.reduce((sum, parts) => sum + parts.exercises, 0);

  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export default Total;
