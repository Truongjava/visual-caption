from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import get_db
from uuid import uuid4
from datetime import datetime

router = APIRouter()

# API để thêm bản ghi vào bảng uploads
@router.post("/upload")
async def upload_image(user_id: str, file_url: str, file_type: str, caption: str, db: AsyncSession = Depends(get_db)):
    try:
        # Tạo upload_id ngẫu nhiên
        upload_id = str(uuid4())
        uploaded_at = datetime.now()  # Lấy thời gian hiện tại

        # Thêm bản ghi vào bảng uploads
        insert_query = text("""
            INSERT INTO uploads (upload_id, user_id, uploaded_at, file_url, file_type, caption)
            VALUES (:upload_id, :user_id, :uploaded_at, :file_url, :file_type, :caption)
        """)
        await db.execute(insert_query, {
            "upload_id": upload_id,
            "user_id": user_id,
            "uploaded_at": uploaded_at,
            "file_url": file_url,
            "file_type": file_type,
            "caption": caption
        })
        await db.commit()

        return {"message": "File uploaded successfully", "upload_id": upload_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API để lấy các bản ghi của user từ bảng uploads
@router.get("/uploads/{user_id}")
async def get_user_uploads(user_id: str, db: AsyncSession = Depends(get_db)):
    try:
        # Truy vấn các bản ghi của user_id từ bảng uploads
        select_query = text("SELECT * FROM uploads WHERE user_id = :user_id")
        result = await db.execute(select_query, {"user_id": user_id})
        uploads = result.fetchall()

        # Nếu không có bản ghi nào, trả về lỗi
        if not uploads:
            raise HTTPException(status_code=404, detail="No uploads found for this user")

        # Trả về các bản ghi của user
        uploads_data = [{"upload_id": upload.upload_id, "file_url": upload.file_url, "file_type": upload.file_type, "caption": upload.caption, "uploaded_at": upload.uploaded_at} for upload in uploads]
        return {"uploads": uploads_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
