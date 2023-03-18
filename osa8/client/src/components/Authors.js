import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const result = useQuery(QUERY);
  const authors = [...result.data];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
