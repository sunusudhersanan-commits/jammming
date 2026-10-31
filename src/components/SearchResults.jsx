
import TrackList from './TrackList';

function SearchResults({ tracks, onAddTrack }) {
  return (
    <section className="music-panel">
      <h2>Search Results</h2>
      <TrackList
        tracks={tracks}
        buttonText="+"
        onAction={onAddTrack}
      />
    </section>
  );
}

export default SearchResults;
