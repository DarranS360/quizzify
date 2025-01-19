from pydantic import BaseModel
from typing import Optional

class TrackResponse(BaseModel):
    track_name: str
    artist: str
    album: str
    preview_url: Optional[str]
    cover_image: str

class SearchQuery(BaseModel):
    query: str
    limit: Optional[int] = 5