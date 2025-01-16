import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AudioPlayerProps } from '../types';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';

function AudioPlayer({ className, attempts }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressInterval = useRef<number | null>(null);

    const durations = [1, 2, 4, 7, 11, 16];
    const currentDuration = durations[attempts] || durations[durations.length - 1];

    const handlePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                if (progressInterval.current) {
                    window.clearInterval(progressInterval.current);
                }
            } else {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            
                progressInterval.current = window.setInterval(() => {
                if (audioRef.current) {
                    const currentProgress = (audioRef.current.currentTime / currentDuration) * 100;
                    setProgress(Math.min(currentProgress, 100));
                    
                    if (audioRef.current.currentTime >= currentDuration) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                        window.clearInterval(progressInterval.current!);
                    }
                }
            }, 50);
        }
        setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        return () => {
            if (progressInterval.current) {
                window.clearInterval(progressInterval.current);
            }
        };
    }, []);

    return (
        <div className={`${className} p-3 bg-dark rounded`}>
            <div className="d-flex align-items-center justify-content-between">
                <Button 
                    variant="heardle"
                    onClick={handlePlay}
                    className="play-button-circle flex-grow-1 d-flex justify-content-center"
                >
                    {isPlaying ? (
                        <BsPauseCircle size={44} />
                    ) : (
                        <BsPlayCircle size={44} />
                )}
                </Button>
            </div>
            <audio 
                ref={audioRef}
                // Replace with actual song URL from your backend
                src="https://example.com/sample.mp3"
                onEnded={() => {
                    setIsPlaying(false);
                    setProgress(0);
                }}
            />
        </div>
    );
}

export default AudioPlayer;