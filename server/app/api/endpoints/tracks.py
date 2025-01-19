from fastapi import APIRouter, HTTPException
from app.services.deezer import DeezerService

router = APIRouter(prefix="/tracks", tags=["tracks"])
deezer = DeezerService()

@router.get("/random")
async def get_random_track():
    try:
        return await deezer.get_random_track()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
async def search_tracks(query: str, limit: int = 5):
    try:
        return await deezer.search_tracks(query, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))