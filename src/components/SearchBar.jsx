
function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        placeholder="Search for songs or artists..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
