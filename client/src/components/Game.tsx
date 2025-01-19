import { useState, useEffect } from 'react';
import { Button, ProgressBar, Alert } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import GuessInput from './GuessInput';
import { GuessResult, GuessHistory, Track } from '../types';

function Game() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [playProgress, setPlayProgress] = useState(0);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [guessResult, setGuessResult] = useState<GuessResult | null>(null);
    const [guessHistory, setGuessHistory] = useState<GuessHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const maxAttempts = 6;
    const DURATION_INTERVALS = [1, 2, 4, 7, 11, 16];

    useEffect(() => {
        fetchNewTrack();
    }, []);

    const fetchNewTrack = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:4999/api/tracks/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const track: Track = {
                title: data.title,
                artist: data.artist,
                preview: data.preview
            };
            setCurrentTrack(track);
        } catch (error) {
            console.error('Error fetching track:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = (): void => {
        setAttempts(prev => prev + 1);
        setCurrentGuess('');
        setGuessHistory(prev => [...prev, { type: 'SKIPPED' }]);
        setGuessResult({
            isCorrect: false,
            message: "Skipped! More of the song is now available.",
            correctAnswer: attempts + 1 >= maxAttempts ? 
                `${currentTrack?.title} - ${currentTrack?.artist}` : undefined
        });
    };

    const handleSubmit = (): void => {
        if (!currentGuess || !currentTrack) return;

        const correctAnswer = `${currentTrack.title} - ${currentTrack.artist}`;
        const isCorrect = currentGuess.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        
        setAttempts(prev => prev + 1);
        setGuessHistory(prev => [...prev, {
            type: isCorrect ? 'CORRECT' : 'WRONG',
            guess: currentGuess
        }]);
        
        setGuessResult({
            isCorrect,
            message: isCorrect 
                ? "🎉 Correct! You got it!" 
                : attempts + 1 >= maxAttempts 
                    ? `Game Over! The song was "${correctAnswer}"`
                    : "Not quite! Try again...",
            correctAnswer: isCorrect || attempts + 1 >= maxAttempts ? correctAnswer : undefined
        });
        
        setCurrentGuess('');

        if (isCorrect || attempts + 1 >= maxAttempts) {
            setTimeout(() => {
                fetchNewTrack();
                setAttempts(0);
                setGuessHistory([]);
                setGuessResult(null);
            }, 3000);
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="game-container p-3">
            <div className="guess-history mb-4">
                {[...Array(maxAttempts)].map((_, index) => {
                    const guess = guessHistory[index];
                    return (
                        <div key={index} className="guess-box">
                            {guess && (
                                <div className="guess-content">
                                    {guess.type === 'SKIPPED' ? (
                                        <>
                                            <span className="skip-mark">□</span>
                                            <span className="skipped-text">SKIPPED</span>
                                        </>
                                    ) : (
                                        <>
                                            {guess.type === 'WRONG' && (
                                                <span className="wrong-mark">❌</span>
                                            )}
                                            <span className="guess-text">{guess.guess}</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="text-center mb-4">
                <div className="attempts-remaining mb-2">
                    {maxAttempts - attempts} attempts remaining
                </div>
                <div className="progress-container">
                    {DURATION_INTERVALS.map((duration, index) => {
                        const isUnlocked = index < attempts;
                        const isCurrentSegment = index === attempts;
                        const segmentProgress = isCurrentSegment ? playProgress : 0;
                        
                        return (
                            <div 
                                key={index} 
                                className={`progress-segment ${isUnlocked ? 'unlocked' : ''}`}
                            >
                                <div 
                                    className="progress-bar" 
                                    style={{ 
                                        width: isUnlocked ? '100%' : 
                                            isCurrentSegment ? `${segmentProgress}%` : '0%' 
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        
            <AudioPlayer 
                className="mb-4" 
                attempts={attempts} 
                previewUrl={currentTrack?.preview || ''}
                onProgressChange={setPlayProgress}
            />
            
            {guessResult && (
                <Alert 
                    variant={guessResult.isCorrect ? "success" : "warning"}
                    className="mb-3"
                >
                    {guessResult.message}
                </Alert>
            )}

            <GuessInput 
                onGuess={(guess: string) => setCurrentGuess(guess)}
                className="mb-3" 
            />
            
            <div className="d-flex gap-2 justify-content-between action-buttons">
                <Button 
                    variant="outline-light"
                    className="flex-grow-1"
                    onClick={handleSkip}
                >
                    Skip
                </Button>
                <Button 
                    variant="heardle"
                    className="flex-grow-1"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default Game;