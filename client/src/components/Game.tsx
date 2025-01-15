import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import GuessInput from './GuessInput';
import ProgressBar from './ProgressBar';

function Game() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);

    const handleGuess = (guess: string) => {
        console.log("Guessed:", guess);
    };

    return (
        <Card className="game-container">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Score: {score}</h3>
                <Button 
                    variant="primary"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? 'Stop Game' : 'Start Game'}
                </Button>
                </div>
        
                {isPlaying && (
                <>
                    <AudioPlayer />
                    <GuessInput onGuess={handleGuess} />
                    <ProgressBar progress={60} />
                </>
                )}
            </Card.Body>
            </Card>
        );
        }

export default Game;


