
const Spotify = {
  async search(term) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Unable to search for songs.');
    }

    const data = await response.json();

    return data.results.map((track) => ({
      id: String(track.trackId),
      name: track.trackName,
      artist: track.artistName,
      album: track.collectionName || 'Unknown Album',
      uri: track.trackViewUrl
    }));
  }
};

export default Spotify;
