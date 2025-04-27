from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import SessionLocal
from app.utils.email_helper import send_otp_email, OTP_STORE
from app.utils.auth_utils import hash_password, verify_password, generate_jwt_token
import uuid
from .database import get_db


router = APIRouter()

OTP_STORE = {}

async def get_db():
    async with SessionLocal() as session:
        yield session
@router.post("/register")
async def register(email: str, password: str, db: AsyncSession = Depends(get_db)):
    check_query = text("SELECT 1 FROM users WHERE email = :email")
    result = await db.execute(check_query, {"email": email})
    existing_user = result.fetchone()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email đã được đăng ký.")

    hashed = hash_password(password)

    insert_query = text("""
        INSERT INTO users (user_id, email, username, password)
        VALUES (:id, :email, :email, :password)
    """)
    await db.execute(insert_query, {
        "id": str(uuid.uuid4()),
        "email": email,
        "password": hashed
    })
    await db.commit()

    await send_otp_email(email, OTP_STORE)
    return {"message": "Đăng ký thành công. Vui lòng kiểm tra email để nhận mã OTP."}



@router.post("/send-otp")
async def send_otp(email: str):
    await send_otp_email(email, OTP_STORE)
    return {"message": "OTP sent to email."}

@router.post("/verify-otp")
async def verify_otp(email: str, otp: str):
    if OTP_STORE.get(email) == otp:
        del OTP_STORE[email]
        return {"message": "OTP verification successful."}
    return {"message": "Invalid OTP."}

@router.post("/login")
async def login(email: str, password: str, db: AsyncSession = Depends(get_db)):
    # Truy vấn người dùng từ cơ sở dữ liệu PostgreSQL
    query = text("SELECT * FROM users WHERE email = :email")
    result = await db.execute(query, {"email": email})
    user = result.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_password = user.password if hasattr(user, 'password') else user['password']

    # Kiểm tra mật khẩu
    if not verify_password(password, stored_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Lấy thông tin người dùng và tạo token JWT
    user_info = {
        "user_id": user.user_id,
        "email": user.email,
        "user_name": user.username
    }
    
    # Sinh JWT token với thông tin người dùng
    token = generate_jwt_token(user_info)
    return {"token": token}



@router.post("/logout")
async def logout():
    return {"message": "Logout successful."}
