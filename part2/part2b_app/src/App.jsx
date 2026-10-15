import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
    // axios.get("http://localhost:3002/persons").then((response) => {
    //   console.log("persons data ", response.data);
    //   setPersons(response.data);
    // });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const checkDuplicate = persons.some((person) => person.name === newName);

    if (checkDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length,
    };

    personsService
      .create(newPerson)
      .then((person) => setPersons(persons.concat(person)));

    // axios
    //   .post("http://localhost:3002/persons", newPerson)
    //   .then((response) => console.log(response));
    // setPersons(persons.concat(newPerson));

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
