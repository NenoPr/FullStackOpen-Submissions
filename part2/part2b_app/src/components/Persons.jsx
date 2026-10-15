const Persons = ({ PersonsFilter }) => {
  return (
    <>
      {PersonsFilter.map((person) => (
        <div key={person.id}>
          <div>
            {person.name} - <span>{person.number}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Persons;
