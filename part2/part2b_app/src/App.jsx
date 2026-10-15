import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    let checkDuplicate = false;
    persons.map((person) => {
      if (newName === person.name) checkDuplicate = true;
    });
    if (!checkDuplicate) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.at(-1).id + 1,
      };
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const PersonsFilter =
    search === ""
      ? persons
      : persons.filter((item) => item.name.toLowerCase().includes(search));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <h1>add a new</h1>
      <form onSubmit={handleAddPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {PersonsFilter.map((person) => (
        <div key={person.name}>
          <div>
            {person.name} - <span>{person.number}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
