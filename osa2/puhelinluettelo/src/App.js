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

  const handleCheck = persons.some((person) => person.name === newName);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setFilter(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    console.log("add clicked", event.target);
    console.log("duplicate", handleCheck);
    if (handleCheck) {
      const person = persons.find((person) => person.name === newName);
      if (person.number !== newNumber) {
        console.log("Updating number");
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const changedPerson = { ...person, number: newNumber };
          const id = person.id;
          personsService
            .update(person.id, changedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== id ? person : returnedPerson
                )
              );
              setMessage(`${person.name} updated successfully`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setMessage(
                `ERROR: Information of ${changedPerson.name} has already been removed from server`
              );
              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== changedPerson.id)
              );
            });
        }
      } else {
        console.log("Name and number already in phonebook");
        setMessage(`ERROR: ${newName} is already added to phonebook`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      personsService.create(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const removePerson = (id) => {
    const removedPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${removedPerson.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          personsService.getAll().then((persons) => {
            setPersons(persons);
            setMessage(`${removedPerson.name} removed`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
        })
        .catch((error) => {
          setMessage(
            `ERROR: Information of ${removedPerson.name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const visiblePersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()) ||
      person.number.match(/\d+/g).join("").includes(filter)
  );

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
