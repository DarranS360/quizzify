import { useState } from 'react';
import { Button, ProgressBar, Alert } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import GuessInput from './GuessInput';
import { GuessResult, GuessHistory } from '../types';

function Game() {
    const [currentSong, setCurrentSong] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [guessResult, setGuessResult] = useState<GuessResult | null>(null);
    const [guessHistory, setGuessHistory] = useState<GuessHistory[]>([]);
    const maxAttempts = 6;

    const correctAnswer = 'Bohemian Rhapsody - Queen';

    const handleSkip = (): void => {
        setAttempts(prev => prev + 1);
        setCurrentGuess('');
        setGuessHistory(prev => [...prev, { type: 'SKIPPED' }]);
        setGuessResult({
            isCorrect: false,
            message: "Skipped! More of the song is now available.",
            correctAnswer: attempts + 1 >= maxAttempts ? correctAnswer : undefined
        });
    };

    const handleSubmit = (): void => {
        if (currentGuess) {
            const isCorrect = currentGuess === correctAnswer;
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
        }
    };

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
                <div className="d-flex gap-2 mb-3">
                    {[...Array(maxAttempts)].map((_, index) => (
                        <ProgressBar 
                            key={index}
                            now={index < attempts ? 100 : 0}
                            className="flex-grow-1"
                            style={{ height: '4px' }}
                        />
                    ))}
                </div>
            </div>
        
            <AudioPlayer className="mb-4" attempts={attempts} />
            
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
            
            <div className="d-flex gap-2 justify-content-between">
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


