export const Persons = ({ persons, remove }) => {
  persons = persons.filter((person) => person !== null);
  return (
    <div>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => remove(person.id)}>remove</button>
          </p>
        );
      })}
    </div>
  );
};
