from fastapi import FastAPI
from app.auth_service import router as auth_router
from app.caption_service import router as caption_router
from app.history_service import router as history_router
import google.generativeai as genai
from fastapi.responses import FileResponse

genai.configure(api_key="AIzaSyBWHNuLH-RMoCSxa1TMnZ9pFaVl43z8CCQ")

app = FastAPI()


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("path/to/favicon.ico")
    
@app.get("/")
def home():
    return {"message": "Welcome to Image Caption API!"}

app.include_router(caption_router, prefix="/api/caption", tags=["caption"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(caption_router, prefix="/api/caption", tags=["Caption"])
app.include_router(history_router, prefix="/api", tags=["History"])
