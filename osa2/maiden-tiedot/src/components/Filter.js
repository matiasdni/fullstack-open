export const Filter = ({ handleFilter, filter }) => (
  <div>
    find countries
    <input value={filter} onChange={handleFilter} />
  </div>
);
