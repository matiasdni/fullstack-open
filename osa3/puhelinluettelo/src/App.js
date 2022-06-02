import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personsService from "./services/persons";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setFilter(event.target.value);

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    setNewName("");
    setNewNumber("");

    const getExisting = persons.find((person) => person.name === newPerson.name);
    if (getExisting) {
      const updateNumber = window.confirm(
        `${newPerson.name} is already added to phonebook, update number?`
      );
      if (updateNumber) {
        personsService
          .update(getExisting.id, { ...getExisting, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) => (person.id !== getExisting.id ? person : updatedPerson))
            );
            showMessage(`${newPerson.name} information updated successfully`);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setPersons(persons.filter((person) => person.id !== getExisting.id));
            }
            showMessage(`ERROR:${error.response.data.error}`);
          });
      }
    } else {
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showMessage(`added ${newName}`);
        })
        .catch((error) => {
          const errorMessage = `ERROR:${error.response.data.error}`;
          showMessage(errorMessage);
          return;
        });
    }
  };

  const removePerson = (id) => {
    const removedPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${removedPerson.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showMessage(`removed ${removedPerson.name}`);
        })
        .catch((error) => {
          console.log(error);
          showMessage(
            `ERROR:Information of ${removedPerson.name} has already been removed from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const visiblePersons =
    filter.length === 0
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={visiblePersons} remove={removePerson} />
    </div>
  );
};

export default App;
