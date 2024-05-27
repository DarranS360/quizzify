import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
import os
from audio_utils import extract_audio_snippet
import random

load_dotenv()
# Get the Spotify API credentials from the environment
client_id = os.environ.get('SPOTIFY_CLIENT_ID')
client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')

# Create a Spotify API object
auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

# def get_random_track():
#     # Get a random track from the Spotify API
#     track = None
#     while track is None:
#         results = sp.recommendations(seed_genres=['pop', 'rock'], limit=1)['tracks'][0]

#         track_id = results['id']
#         track_name = results['name']
#         artist = results['artists'][0]['name']
#         album = results['album']['name']
#         preview_url = results['preview_url']

#         if preview_url:
#             # snippet_path = extract_audio_snippet(preview_url, 'audio_snippet.mp3', 15)
#             print(artist, track_name, album, preview_url)
#             return {
#                 'name': track_name,
#                 'artist': artist,
#                 'album': album,
#                 'preview_url': preview_url
#             }

#         else:
#             track = None
# song_name = "Living in America"
# artist_name = "James Brown"
# results = sp.search(q=f"track:{song_name} artist:{artist_name}", type="track", limit=1)

def get_random_track():
    results = sp.search(q='greatest hits OR top tracks OR best of', type='playlist', limit=50)

    if results['playlists']['items']:
        playlist = random.choice(results['playlists']['items'])  # Choose a random playlist
        playlist_tracks = sp.playlist_items(playlist['id'], fields='items(track(name, artists, album, preview_url))', additional_types=['track'])['items']
        
        #Choose random track from playlist
        if playlist_tracks:
            track = random.choice(playlist_tracks)['track']
            
            return {
                'name': track['name'],
                'artist': track['artists'][0]['name'],
                'album': track['album']['name'],
                'preview_url': track['preview_url'],
                'album_cover': track['album']['images'][0]['url']
                }
        else:
            print("No tracks in playlist. Trying again...")
    else:
        print("No playlists found.")
    
    # If no suitable track was found, return None
    return None    

get_random_track()