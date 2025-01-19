# app/services/deezer.py
import random
import requests
from fastapi import HTTPException

class DeezerService:
    BASE_URL = "https://api.deezer.com"
    
    async def get_random_track(self):
        """Get a random track from popular playlists"""
        try:
            # Search with random term
            search_term = random.choice([
                "greatest hits",
                "classic rock",
                "pop hits"
            ])
            
            response = requests.get(
                f"{self.BASE_URL}/search",
                params={"q": search_term, "limit": 25}
            )
            response.raise_for_status()
            data = response.json()
            
            if not data.get('data'):
                raise HTTPException(status_code=404, detail="No tracks found")
                
            # Get random track
            track = random.choice(data['data'])
            
            return {
                'title': track['title'],
                'artist': track['artist']['name'],
                'preview': track['preview']
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def search_tracks(self, query: str, limit: int = 5):
        """Search for tracks on Deezer"""
        try:
            response = requests.get(
                f"{self.BASE_URL}/search",
                params={"q": query, "limit": limit}
            )
            response.raise_for_status()
            data = response.json()
            
            return [
                {
                    'title': track['title'],
                    'artist': track['artist']['name'],
                    'preview': track['preview']
                }
                for track in data['data']
                if track.get('preview')
            ]
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))