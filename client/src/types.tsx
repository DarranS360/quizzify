// src/types.ts
export interface GuessInputProps {
    onGuess: (guess: string) => void;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    previewUrl: string;
}