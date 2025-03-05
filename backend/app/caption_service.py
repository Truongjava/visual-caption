from fastapi import APIRouter, UploadFile, File
from app.utils.gemini_helper import generate_caption

router = APIRouter()

@router.post("/image")
async def image_caption(file: UploadFile = File(...)):
    # Đọc toàn bộ nội dung file ảnh ra bytes
    image_bytes = await file.read()

    # Gửi ảnh binary đến Gemini
    caption = await generate_caption(image_bytes)

    return {"caption": caption}
