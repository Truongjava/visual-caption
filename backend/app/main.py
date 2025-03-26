from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.auth_service import router as auth_router
from app.caption_service import router as caption_router
from app.history_service import router as history_router
import google.generativeai as genai

# Cấu hình Google Gemini API
genai.configure(api_key="AIzaSyBWHNuLH-RMoCSxa1TMnZ9pFaVl43z8CCQ")

# Khởi tạo FastAPI
app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Chấp nhận tất cả domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("path/to/favicon.ico")

@app.get("/")
def home():
    return {"message": "Welcome to Image Caption API!"}

# Import các router
app.include_router(caption_router, prefix="/api/caption", tags=["Caption"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(history_router, prefix="/api", tags=["History"])
