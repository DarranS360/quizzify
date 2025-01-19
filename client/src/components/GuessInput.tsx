import { GuessInputProps } from '../types';
import { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { Track } from '../types';

function GuessInput({ onGuess, className }: GuessInputProps) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (input.length < 2) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:4999/api/tracks/search?query=${encodeURIComponent(input)}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [input]);

    const handleSelect = (track: Track) => {
        const guessString = `${track.title} - ${track.artist}`;
        setInput('');
        setSuggestions([]);
        onGuess(guessString);
    };

    return (
        <div className={className}>
            <Form.Control
                type="text"
                placeholder="Search for a song..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ListGroup className="mt-1">
                    {suggestions.map((track, index) => (
                        <ListGroup.Item 
                            key={index}
                            action
                            onClick={() => handleSelect(track)}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            {track.title} - {track.artist}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            {isLoading}
        </div>
    );
}

export default GuessInput;