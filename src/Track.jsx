
function Track(props) {
  return (
    <div className="track">
      <div className="track-details">
        <h3>{props.track.name}</h3>
        <p>Artist: {props.track.artist}</p>
        <p>Album: {props.track.album}</p>
      </div>

      {props.onAdd && (
        <button type="button" onClick={props.onAdd}>
          Add to Playlist
        </button>
      )}

      {props.onRemove && (
        <button type="button" onClick={props.onRemove}>
          Remove
        </button>
      )}
    </div>
  );
}

export default Track;
