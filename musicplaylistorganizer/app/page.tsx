'use client';
import { useState } from 'react';
import { FaTrash, FaRedo } from 'react-icons/fa';

export default function Home() {
  const [originalSongs, setOriginalSongs] = useState<Array<{id: string, title: string, artist: string, highlighting?: boolean}>>([]);
  const [songs, setSongs] = useState<Array<{id: string, title: string, artist: string, highlighting?: boolean, swapping?: boolean}>>([]);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newArtistName, setNewArtistName] = useState('');

  // Add song handler
  const handleAddSong = () => {
    if (newSongTitle && newArtistName) {
      const newSong = { 
        id: crypto.randomUUID(),
        title: newSongTitle, 
        artist: newArtistName 
      };
      setOriginalSongs([...originalSongs, newSong]);
      setSongs([...songs, newSong]);
      setNewSongTitle('');
      setNewArtistName('');
    }
  };

  // Delete song handler
  const handleDeleteSong = (idToDelete: string) => {
    setOriginalSongs(originalSongs.filter(song => song.id !== idToDelete));
    setSongs(songs.filter(song => song.id !== idToDelete));
  };

  // Add this delay helper function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Update the selection sort function to be async
  const selectionSort = async () => {
    const songsCopy = [...songs];

    // get size of songs array (songsCopy)
    const n = songsCopy.length;

    // loop through songsCopy
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (songsCopy[j].title.toLowerCase() < songsCopy[minIndex].title.toLowerCase()) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        // Highlight elements to be swapped
        const tempArray = [...songsCopy];
        tempArray[i] = { ...tempArray[i], highlighting: true };
        tempArray[minIndex] = { ...tempArray[minIndex], highlighting: true };
        setSongs(tempArray);

        // Wait to show highlighting
        await delay(800);

        // Remove highlighting and add swapping class
        tempArray[i] = { ...tempArray[i], highlighting: false, swapping: true };
        tempArray[minIndex] = { ...tempArray[minIndex], highlighting: false, swapping: true };
        setSongs(tempArray);

        // Wait for swap animation
        await delay(800);

        // Perform the actual swap
        [songsCopy[i], songsCopy[minIndex]] = [songsCopy[minIndex], songsCopy[i]];
        
        // Update with swapped items, remove swapping class
        setSongs(songsCopy.map(song => ({ ...song, swapping: false })));
      }
    }
  };

  // refresh playlist handler
  const refreshPlaylist = () => {
    setSongs([...originalSongs]);
  }

  return (
    <main className="page-container animate__animated animate__zoomIn">
      <div className="home-container">
        <h1>Music Playlist Sorting</h1>

        <div className="playlist-container">
          <div className="playlist-header">
            <h2>Playlist</h2>
            <button className="refresh-button" onClick={refreshPlaylist}>
              <FaRedo />
            </button>
          </div>

          <div className="playlist-items-container">
            {/* Replace static items with mapped songs array */}
            {songs.map((song: any) => (
              <div 
                key={song.id} 
                className={`playlist-item ${song.highlighting ? 'highlighting' : ''} ${song.swapping ? 'swapping' : ''}`}
              >
                <div>
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteSong(song.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="add-song-form">
            <input 
              type="text"
              placeholder="Enter song name"
              className="song-input"
              value={newSongTitle}
              onChange={(e) => setNewSongTitle(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Enter artist name"
              className="artist-input"
              value={newArtistName}
              onChange={(e) => setNewArtistName(e.target.value)}
            />
            <button 
              className="add-song-button"
              onClick={handleAddSong}
            >
              +
            </button>
          </div>

          <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>Total Songs on Playlist: {songs.length}</h3>

          <div className="sort-button-container">
            <div className="sort-button" onClick={selectionSort}>Selection Sort</div>
          </div>
        </div>
      </div>
    </main>
  );
}
