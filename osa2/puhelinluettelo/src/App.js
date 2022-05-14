import { useState } from "react";

const Persons = ({ persons }) => (
  <table>
    <tbody>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </tbody>
  </table>
);

const Person = ({ person }) => (
  <tr>
    <td> {person.name} </td>
    <td> {person.number} </td>
  </tr>
);

const Filter = ({ handleFilter, filter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilter} />
  </div>
);

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />{" "}
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    console.log("add clicked", event.target);
    const handleCheck = persons.some((person) => person.name === newName);
    console.log("duplicate", handleCheck);
    if (handleCheck) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => {
    console.log(`filter: ${event.target.value}`);
    setFilter(event.target.value);
  };

  const visiblePersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={visiblePersons} />
    </div>
  );
};

export default App;
