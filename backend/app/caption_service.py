from fastapi import APIRouter, UploadFile, File
from app.utils.gemini_helper import generate_caption

router = APIRouter()

@router.post("/image")
async def image_caption(file: UploadFile = File(...)):
    image_bytes = await file.read()
    caption = await generate_caption(image_bytes)

    return {"caption": caption}
