const Filter = ({ search, setSearch }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default Filter;
