export const Persons = ({ persons, remove }) => (
  <div>
    {persons.map((person) => (
      <Person
        key={person.id}
        person={person}
        remove={() => remove(person.id)}
      />
    ))}
  </div>
);
const Person = ({ person, remove }) => (
  <div>
    {person.name} {person.number}
    <button onClick={remove}>delete</button>
  </div>
);
