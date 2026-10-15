const Persons = ({ PersonsFilter, handleDeletePerson }) => {
  return (
    <>
      {PersonsFilter.map((person) => (
        <div key={person.id}>
          <div>
            {person.name} - <span>{person.number}</span>{" "}
            <button onClick={() => handleDeletePerson(person)}>delete</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Persons;
