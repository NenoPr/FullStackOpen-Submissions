import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

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
    // const checkDuplicateName = persons.some(
    //   (person) => person.name === newName,
    // );
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (
          window.confirm(
            `${existingPerson.name} is already in the phonebook, replace the old number with a new one?`,
          )
        ) {
          handleUpdatePerson(existingPerson);
          setNewName("");
          setNewNumber("");
          setMessage(`${existingPerson.name}'s number has been updated.`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
      } else {
        alert(`${newName} is already added to phonebook`);
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
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
    setMessage(`${newPerson.name} has been added to the notebook.`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleDeletePerson = (person) => {
    console.log(person.id);
    if (window.confirm(`Delete ${person.name}`)) {
      personsService.remove(person.id).then((response) => {
        console.log(response);
        setPersons((prevPersons) =>
          prevPersons.filter((item) => item.id !== person.id),
        );
      });
    }
    setMessage(`${person.name} has been deleted from the phonebook.`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleUpdatePerson = (existingPerson) => {
    const updatedPerson = {
      ...existingPerson,
      number: newNumber,
    };

    personsService
      .update(existingPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === returnedPerson.id ? returnedPerson : person,
          ),
        );
      });
  };

  const PersonsFilter =
    search === ""
      ? persons
      : persons.filter((item) => item.name.toLowerCase().includes(search));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        PersonsFilter={PersonsFilter}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
