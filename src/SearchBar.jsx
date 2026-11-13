
import { useState } from 'react';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    props.onSearch(searchTerm.trim());
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter a song title..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
