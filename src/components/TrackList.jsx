
import Track from './Track';

function TrackList({ tracks, buttonText, onAction }) {
  return (
    <div className="track-list">
      {tracks.length === 0 ? (
        <p className="empty-message">No songs found.</p>
      ) : (
        tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            buttonText={buttonText}
            onAction={onAction}
          />
        ))
      )}
    </div>
  );
}

export default TrackList;
