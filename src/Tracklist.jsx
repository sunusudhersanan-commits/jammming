
import Track from './Track';

function Tracklist(props) {
  return (
    <div>
      <h2>Search Results</h2>

      {props.tracks.length > 0 ? (
        props.tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onAdd={() => props.onAdd(track)}
          />
        ))
      ) : (
        <p>Search for a song to see results.</p>
      )}
    </div>
  );
}

export default Tracklist;

