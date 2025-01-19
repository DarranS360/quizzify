import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AudioPlayerProps } from '../types';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';

function AudioPlayer({ attempts, previewUrl, onProgressChange }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
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
                onProgressChange(0);  // Reset progress when paused
            } else {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            
                progressInterval.current = window.setInterval(() => {
                    if (audioRef.current) {
                        const currentProgress = (audioRef.current.currentTime / currentDuration) * 100;
                        onProgressChange(Math.min(currentProgress, 100));
                        
                        if (audioRef.current.currentTime >= currentDuration) {
                            audioRef.current.pause();
                            setIsPlaying(false);
                            window.clearInterval(progressInterval.current!);
                            onProgressChange(0);
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
        <div className="audio-player-container">
            <div className="player-button-wrapper">
                <Button 
                    variant="heardle"
                    onClick={handlePlay}
                    className="player-button"
                    disabled={!previewUrl}
                >
                    {isPlaying ? (
                        <BsPauseCircle size={64} />
                    ) : (
                        <BsPlayCircle size={64} />
                    )}
                </Button>
            </div>
            <audio 
                ref={audioRef}
                src={previewUrl}
                onEnded={() => {
                    setIsPlaying(false);
                    onProgressChange(0);
                }}
            />
        </div>
    );
}

export default AudioPlayer;