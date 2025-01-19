export interface GuessInputProps {
    onGuess: (guess: string) => void;
    className?: string;
}

export interface Track {
    title: string;
    artist: string;
    preview: string;
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

export interface AudioPlayerProps {
    className?: string;
    attempts: number;
    previewUrl: string;
    onProgressChange: (progress: number) => void; 
}