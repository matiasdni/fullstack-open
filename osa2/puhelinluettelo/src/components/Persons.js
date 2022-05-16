export const Persons = ({persons}) => (
    <table>
        <tbody>
        {persons.map((person) => (
            <Person key={person.name} person={person}/>
        ))}
        </tbody>
    </table>
);
const Person = ({person}) => (
    <tr>
        <td> {person.name} </td>
        <td> {person.number} </td>
    </tr>
);