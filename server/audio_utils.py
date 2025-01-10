import librosa  
import soundfile as sf
import requests
import os

def extract_audio_snippet(preview_url, output_path, duration):
    """
    Extracts a snippet of specified duration from a Spotify preview URL
    """
    try:
        # Download the audio from the URL
        with requests.get(preview_url, stream=True) as r:
            r.raise_for_status()
            with open('temp_audio.mp3', 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)

        # Load and process the downloaded audio
        y, sr = librosa.load('temp_audio.mp3', duration=duration, mono=True)
        sf.write(output_path, y, sr)
        
        # Delete the temporary file
        os.remove('temp_audio.mp3')

        return output_path
    
    except Exception as e:
        print(f"Error extracting audio snippet: {e}")
        return None
        
        