from fastapi import APIRouter, UploadFile, File
from app.utils.gemini_helper import generate_caption, information_destination

router = APIRouter()

@router.post("/image")
async def image_caption(file: UploadFile = File(...)):
    image_bytes = await file.read()
    caption = await generate_caption(image_bytes)

    return {"caption": caption}

@router.post("/image/destination")
async def image_destination_info(file: UploadFile = File(...)):
    image_bytes = await file.read()
    info = await information_destination(image_bytes)
    return {"destination_info": info}