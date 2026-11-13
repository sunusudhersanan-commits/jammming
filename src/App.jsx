
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import './App.css';

const sampleTracks = [
  { id: '1', name: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', uri: 'spotify:track:7qiZfU4dY1lWllzX7mPBI3' },
  { id: '2', name: 'Perfect', artist: 'Ed Sheeran', album: 'Divide', uri: 'spotify:track:0tgVpDi06FyKpA1z0VMD4v' },
  { id: '3', name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', uri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b' },
  { id: '4', name: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', uri: 'spotify:track:463CkQjx2Zk1yXoBuierM9' },
  { id: '5', name: 'Perfect', artist: 'Ed Sheeran', album: 'Divide', uri: 'spotify:track:3U4isOIWM3VvDubwSI3y7a' }
];

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

  const [savedPlaylistName, setSavedPlaylistName] = useState(
    () => loadSavedPlaylist().name || ''
  );

  const [searchResults, setSearchResults] = useState([]);

  function searchTracks(term) {
    const results = sampleTracks.filter((track) =>
      `${track.name} ${track.artist} ${track.album}`
        .toLowerCase()
        .includes(term.toLowerCase())
    );

    setSearchResults(results);
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

    const name = prompt('Enter your playlist name:', savedPlaylistName || 'My Playlist');

    if (!name || !name.trim()) {
      return;
    }

    const savedPlaylist = {
      name: name.trim(),
      tracks: playlistTracks
    };

    localStorage.setItem(
      'jammming_playlist',
      JSON.stringify(savedPlaylist)
    );

    setSavedPlaylistName(name.trim());

    alert(`"${name.trim()}" saved successfully!`);
  }

  return (
    <div>
      <h1>Jammming.</h1>
      <p>Your music. Your playlist. Your vibe.</p>
      <p>Free Demo Mode — No Spotify Premium required.</p>

      <SearchBar onSearch={searchTracks} />

      <SearchResults
        tracks={searchResults}
        onAdd={addTrack}
      />

      <Playlist
        tracks={playlistTracks}
        onRemove={removeTrack}
        onSave={savePlaylist}
      />

      {savedPlaylistName && (
        <p>Last saved playlist: {savedPlaylistName}</p>
      )}

      <p>Made with ♡ and music · Jammming</p>
    </div>
  );
}

export default App;
