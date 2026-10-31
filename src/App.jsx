import { useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

const sampleTracks = [
  {
    id: 1,
    name: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    uri: 'spotify:track:1'
  },
  {
    id: 2,
    name: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    uri: 'spotify:track:2'
  },
  {
    id: 3,
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    uri: 'spotify:track:3'
  },
  {
    id: 4,
    name: 'Until I Found You',
    artist: 'Stephen Sanchez',
    album: 'Easy On My Eyes',
    uri: 'spotify:track:4'
  }
];

function App() {
  const [savedPlaylist] = useState(() => {
    try {
      const saved = localStorage.getItem('jammming-playlist');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(sampleTracks);

  const [playlistName, setPlaylistName] = useState(
    savedPlaylist?.name || 'My Playlist'
  );

  const [playlistTracks, setPlaylistTracks] = useState(
    savedPlaylist?.tracks || []
  );

  function handleSearch() {
    const query = searchTerm.toLowerCase().trim();

    setSearchResults(
      sampleTracks.filter(track =>
        `${track.name} ${track.artist} ${track.album}`
          .toLowerCase()
          .includes(query)
      )
    );
  }

  function addTrack(track) {
    setPlaylistTracks(previous => {
      if (previous.some(item => item.id === track.id)) {
        return previous;
      }

      return [...previous, track];
    });
  }

  function removeTrack(track) {
    setPlaylistTracks(previous =>
      previous.filter(item => item.id !== track.id)
    );
  }

  function savePlaylist() {
    if (playlistTracks.length === 0) {
      alert('Please add songs first!');
      return;
    }

    const playlist = {
      name: playlistName,
      tracks: playlistTracks
    };

    localStorage.setItem(
      'jammming-playlist',
      JSON.stringify(playlist)
    );

    alert('Your playlist has been saved successfully!');
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          Jammming<span>.</span>
        </h1>
        <p>Your music. Your playlist. Your vibe.</p>
      </header>

      <main className="main-content">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <div className="music-container">
          <SearchResults
            tracks={searchResults}
            onAddTrack={addTrack}
          />

          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            playlistTracks={playlistTracks}
            onRemoveTrack={removeTrack}
            onSavePlaylist={savePlaylist}
          />
        </div>
      </main>

      <footer>
        <p>Made with ♡ and music · Jammming</p>
      </footer>
    </div>
  );
}

export default App;