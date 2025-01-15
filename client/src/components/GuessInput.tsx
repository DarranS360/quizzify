import { GuessInputProps } from '../types';
import { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

function GuessInput({ onGuess, className }: GuessInputProps) {
    const [input, setInput] = useState('');

    const mockSuggestions = [
        "Bohemian Rhapsody - Queen",
        "Hotel California - Eagles",
        "Stairway to Heaven - Led Zeppelin",
        "Imagine - John Lennon",
        "Like a Rolling Stone - Bob Dylan",
        "Hey Jude - The Beatles"
    ]

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const handleInputChange = (value: string) => {
        setInput(value);
        // Filter suggestions based on input
        if (value.length > 0) {
            const filtered = mockSuggestions.filter(song => 
                song.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (selection: string) => {
        setInput(selection);
        setSuggestions([]);
        onGuess(selection);
    }

    return (
        <div className={className}>
            <Form.Control
                type="text"
                placeholder="Know the song? Search for it!"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ListGroup className="mt-1">
                    {suggestions.map((suggestion, index) => (
                        <ListGroup.Item 
                            key={index}
                            action
                            onClick={() => handleSelect(suggestion)}
                            className="cursor-pointer"
                        >
                            {suggestion}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default GuessInput;