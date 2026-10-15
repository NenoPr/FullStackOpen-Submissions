import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/persons").then((response) => {
      console.log("persons data ", response.data);
      setPersons(response.data);
    });
  }, []);

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
      <Filter search={search} setSearch={setSearch} />
      <h1>add a new</h1>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons PersonsFilter={PersonsFilter} />
    </div>
  );
};

export default App;
