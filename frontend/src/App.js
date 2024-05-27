import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './AudioPlayer.css';
import { ReactComponent as PlayIcon } from './play.svg';

function App() {
  const [currentDuration, setCurrentDuration] = useState(1);
  const audioRef = useRef(null);
  const [trackData, setTrackData] = useState(null);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null); // Ref to store the timeout ID
  const [isLoading, setIsLoading] = useState(true); // New loading state variable
  const [segment, setSegment] = useState([false, false, false, false, false, false]); // New state variable to store the segment

  useEffect(() => {
    let isMounted = true; // Add this line

    const fetchTrack = async () => {
      if (isMounted) { // Check if the component is still mounted
        try {
          const response = await fetch('http://localhost:4999/');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setTrackData(data);
          setError(null);
        } catch (error) {
          console.error('Error fetching track:', error);
          setError('Failed to fetch track data.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTrack();

    return () => { // Cleanup function
      clearTimeout(timeoutRef.current); // Clear the timeout on unmount
      isMounted = false; // Set it to false when the component unmounts
    };
  }, []);

  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (audio) {
      clearTimeout(timeoutRef.current); // Clear previous timeout

      audio.currentTime = 0;  // Reset to start
      audio.play(); // Play the audio

      const increments = [1, 2, 4, 7, 11, 16]; // Increment values
      const currentIndex = increments.indexOf(currentDuration);
      const nextDuration = increments[Math.min(currentIndex + 1, increments.length - 1)];

      // Update duration for the next play
      setCurrentDuration(nextDuration);

      timeoutRef.current = setTimeout(() => {
        if (!audio.paused) {
          audio.pause();
        }
      }, currentDuration * 1000);

      setSegment(prevSegments => {
        const newSegments = [...prevSegments];
        newSegments[currentIndex] = true;
        return newSegments;
      });
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quizzify</h1>
        {error ? (
          <p>{error}</p>
        ) : trackData ? (
          <>
            <img src={trackData.cover_image} alt="Album cover" />
            <p>Track: {trackData.track_name}</p>
            <p>Artist: {trackData.artist}</p>
            <p>Album: {trackData.album}</p>
            <div className="progress-bar-container">
              <div className="top-border"></div>
              <div className="progress-bar">
                {segment.map((segment, index) => (
                  <div
                    key={index}
                    className={`segment ${segment ? 'filled' : ''}`}
                    style={{ width: `${[1, 2, 4, 7, 11, 16][index] * 100 / 16}%` }} // Ensure proportional width
                  ></div>
                ))}
              </div>
              <div className="bottom-border"></div>
            </div>
            <button onClick={handlePlayClick} className="custom-play-button">
              <PlayIcon /> 
            </button>
            <audio ref={audioRef} src={trackData.preview_url} /> {/* Audio element */}
          </>
        ) : (
          <p>Loading track data...</p> 
        )}
      </header>
    </div>
  );
}

export default App;
