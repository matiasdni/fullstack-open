export const Filter = ({ handleFilter, filter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilter} />
  </div>
);
