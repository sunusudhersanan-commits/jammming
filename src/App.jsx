
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';
import './App.css';

function loadSavedPlaylist() {
  try {
    return JSON.parse(localStorage.getItem('jammming_playlist')) || {};
  } catch {
    return {};
  }
}

function App() {
  const [playlistTracks, setPlaylistTracks] = useState(
    () => loadSavedPlaylist().tracks || []
  );

  const [playlistName, setPlaylistName] = useState(
    () => loadSavedPlaylist().name || 'My Playlist'
  );

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchTracks(term) {
    if (!term.trim()) {
      setSearchResults([]);
      setError('Please enter a song or artist name.');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const results = await Spotify.search(term);
      setSearchResults(results);

      if (results.length === 0) {
        setError('No songs found. Try another search.');
      }
    } catch {
      setError('Song search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function addTrack(track) {
    setPlaylistTracks((previousTracks) => {
      if (previousTracks.some((item) => item.id === track.id)) {
        return previousTracks;
      }

      return [...previousTracks, track];
    });
  }

  function removeTrack(track) {
    setPlaylistTracks((previousTracks) =>
      previousTracks.filter((item) => item.id !== track.id)
    );
  }

  function savePlaylist() {
    if (playlistTracks.length === 0) {
      alert('Please add songs first!');
      return;
    }

    const trimmedName = playlistName.trim();

    if (!trimmedName) {
      alert('Please enter a playlist name!');
      return;
    }

    const savedPlaylist = {
      name: trimmedName,
      tracks: playlistTracks,
      trackURIs: playlistTracks.map((track) => track.uri)
    };

    localStorage.setItem(
      'jammming_playlist',
      JSON.stringify(savedPlaylist)
    );

    setPlaylistTracks([]);
    alert(`"${trimmedName}" saved successfully in this browser!`);
  }

  return (
    <div>
      <h1>Jammming.</h1>
      <p>Your music. Your playlist. Your vibe.</p>
      <p>Free Demo Mode — Music search powered by Apple iTunes.</p>

      <SearchBar onSearch={searchTracks} />

      {loading && <p>Searching for songs...</p>}
      {error && <p role="alert">{error}</p>}

      <SearchResults
        tracks={searchResults}
        onAdd={addTrack}
      />

      <Playlist
        tracks={playlistTracks}
        playlistName={playlistName}
        onNameChange={setPlaylistName}
        onRemove={removeTrack}
        onSave={savePlaylist}
      />

      <p>Last saved playlist: {playlistName}</p>
      <p>Made with ♡ and music · Jammming</p>
    </div>
  );
}

export default App;
