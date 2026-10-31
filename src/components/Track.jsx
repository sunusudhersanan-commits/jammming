
function Track({ track, buttonText, onAction }) {
  return (
    <div className="track">
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} · {track.album}</p>
      </div>
      <button onClick={() => onAction(track)}>
        {buttonText}
      </button>
    </div>
  );
}

export default Track;
