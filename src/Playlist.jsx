
import Track from './Track';

function Playlist(props) {
  return (
    <div className="playlist">
      <h2>My Playlist</h2>

      <input
        type="text"
        value={props.playlistName}
        onChange={(event) => props.onNameChange(event.target.value)}
        placeholder="Enter playlist name"
      />

      {props.tracks.length === 0 ? (
        <p>Your playlist is empty. Add some songs!</p>
      ) : (
        props.tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={() => props.onRemove(track)}
          />
        ))
      )}

      <button
        type="button"
        onClick={props.onSave}
        disabled={props.tracks.length === 0}
      >
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;
