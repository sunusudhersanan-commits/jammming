
import TrackList from './TrackList';

function Playlist({
  playlistName,
  setPlaylistName,
  playlistTracks,
  onRemoveTrack,
  onSavePlaylist
}) {
  return (
    <section className="music-panel">
      <h2>Your Playlist</h2>

      <input
        className="playlist-name"
        value={playlistName}
        onChange={(event) => setPlaylistName(event.target.value)}
      />

      <TrackList
        tracks={playlistTracks}
        buttonText="−"
        onAction={onRemoveTrack}
      />

      <button className="save-button" onClick={onSavePlaylist}>
        Save Playlist
      </button>
    </section>
  );
}

export default Playlist;
