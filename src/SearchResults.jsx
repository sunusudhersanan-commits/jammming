
import Tracklist from './Tracklist';

function SearchResults(props) {
  return (
    <div>
      <Tracklist
        tracks={props.tracks}
        onAdd={props.onAdd}
      />
    </div>
  );
}

export default SearchResults;
