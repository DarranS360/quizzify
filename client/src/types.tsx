export interface GuessInputProps {
    onGuess: (guess: string) => void;
    className?: string;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    previewUrl: string;
}

export interface AudioPlayerProps {
    className?: string;
    attempts: number;  
}

export interface GuessResult {
    isCorrect: boolean;
    message: string;
    correctAnswer?: string;
}

export interface GuessHistory {
    type: 'SKIPPED' | 'WRONG' | 'CORRECT';
    guess?: string;
}