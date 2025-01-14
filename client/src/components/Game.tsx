import { useState } from 'react';
import { card, button } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import GuessInput from './GuessInput';
import ProgressBar from 'react-bootstrap';

function Game() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
}

export default Game;


