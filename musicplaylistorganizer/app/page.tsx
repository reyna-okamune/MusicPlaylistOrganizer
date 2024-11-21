'use client';

import { useState } from 'react';
import { FaTrash, FaRedo } from 'react-icons/fa';
import Image from 'next/image'

export default function Home() {
  const [originalSongs, setOriginalSongs] = useState<Array<{id: string, title: string, artist: string}>>([]);
  const [songs, setSongs] = useState<Array<{id: string, title: string, artist: string}>>([]);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newArtistName, setNewArtistName] = useState('');

  // Add song handler
  const handleAddSong = () => {
    if (newSongTitle && newArtistName) {
      const capitalizedTitle = newSongTitle
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      const newSong = { 
        id: Math.random().toString(36).substring(2, 15),
        title: capitalizedTitle, 
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

  // Selection sort handler
  const selectionSort = () => {
    // copy songs array
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

    // swap songsCopy[i] and songsCopy[minIndex]
    if (minIndex !== i) {
      [songsCopy[i], songsCopy[minIndex]] = [songsCopy[minIndex], songsCopy[i]];
    }
  }

  // set sorted songs
  setSongs(songsCopy);
}

// Insertion Sort Handler
const insertionSort = () => {
  // copy songs array
  const songsCopy = [...songs];

  // get size of songs array (songsCopy)
  const n = songsCopy.length;

  for (let i = 2; i <= n; i++) {
    const sortMe = songsCopy[i - 1];
    let j = i - 2;

    while (j >= 0 && sortMe.title.toLowerCase() < songsCopy[j].title.toLowerCase()) {
      songsCopy[j + 1] = songsCopy[j];
      j--;
    }
    songsCopy[j + 1] = sortMe;
  }

  // set sorted songs
  songsCopy.forEach(song => {
    song.title = song.title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  });

  setSongs(songsCopy);
}

  // refresh playlist handler
  const refreshPlaylist = () => {
    setSongs([...originalSongs]);
  }

  return (
    <main className="page-container animate__animated animate__zoomIn">
      <div className="home-container">
        <Image 
          src="/project_title.png"
          alt="Music Playlist Sorting"
          width={1000}
          height={250}
          className="w-[90%] max-w-[800px] h-auto mx-auto"
          priority
        />

        <div className="playlist-container">
          <div className="playlist-header">
            <h2>Playlist</h2>
            <button className="refresh-button" onClick={refreshPlaylist}>
              <FaRedo />
            </button>
          </div>

          <div className="playlist-items-container">
            {/* Replace static items with mapped songs array */}
            {songs.map((song) => (
              <div key={song.id} className="playlist-item">
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
            <div className="sort-button" onClick={insertionSort}>Insertion Sort</div>
            <div className="sort-button">Bubble Sort</div>
          </div>
        </div>
      </div>
    </main>
  );
}
