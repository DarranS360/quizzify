from flask import Flask, jsonify
from flask_cors import CORS
from spotify_api import get_random_track


app = Flask(__name__)
CORS(app)

@app.route('/')
def get_track_data():
    track = get_random_track()
    if track:
        return jsonify({
            'track_name': track['name'],
            'artist': track['artist'],
            'album': track['album'],
            'preview_url': track['preview_url'],
            'cover_image': track['album_cover']
        })
    else:
        return jsonify({
            'error': 'Error getting track data'
        }), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4999 , debug=True)
