from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import SessionLocal
from app.utils.email_helper import send_otp_email, OTP_STORE
from app.utils.auth_utils import hash_password, verify_password, generate_jwt_token
import uuid


router = APIRouter()

# Fake OTP storage (in real case, use Redis or DB)
OTP_STORE = {}

async def get_db():
    async with SessionLocal() as session:
        yield session

# @router.post("/register")
# async def register(email: str, password: str, db: AsyncSession = Depends(get_db)):
#     hashed = hash_password(password)

#     query = text("""
#         INSERT INTO users (user_id, email, username, password)
#         VALUES (:id, :email, :email, :password)
#     """)
#     await db.execute(query, {
#         "id": str(uuid.uuid4()),
#         "email": email,
#         "password": hashed  # nhớ lưu cả mật khẩu hash vào DB
#     })
#     await db.commit()

#     await send_otp_email(email, OTP_STORE)
#     return {"message": "Registration successful. Please check your email for the OTP."}


@router.post("/register")
async def register(email: str, password: str, db: AsyncSession = Depends(get_db)):
    # Kiểm tra xem email đã tồn tại chưa
    check_query = text("SELECT 1 FROM users WHERE email = :email")
    result = await db.execute(check_query, {"email": email})
    existing_user = result.fetchone()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email đã được đăng ký.")

    # Nếu chưa có, tiến hành đăng ký
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
    query = text("SELECT * FROM users WHERE email = :email")
    result = await db.execute(query, {"email": email})
    user = result.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # user là Row, truy cập bằng tuple hoặc dict, tuỳ DB engine
    stored_password = user.password if hasattr(user, 'password') else user['password']

    if not verify_password(password, stored_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = generate_jwt_token(user.user_id)
    return {"token": token}

@router.post("/logout")
async def logout():
    return {"message": "Logout successful."}
