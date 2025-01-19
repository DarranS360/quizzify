import requests
from pprint import pprint

def test_deezer_api():
    """Test basic Deezer API functionality"""
    print("Testing Deezer API...")
    
    # Search for tracks
    search_url = "https://api.deezer.com/search"
    params = {
        "q": "queen bohemian rhapsody",
        "limit": 5
    }
    
    try:
        response = requests.get(search_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        print("\nSearch Results:")
        for track in data['data']:
            print(f"\nTrack: {track['title']}")
            print(f"Artist: {track['artist']['name']}")
            print(f"Preview URL: {track['preview']}")
            print(f"Album: {track['album']['title']}")
            
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_deezer_api()