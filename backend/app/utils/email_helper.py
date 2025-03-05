import random

async def send_otp_email(email, store):
    otp = "".join([str(random.randint(0, 9)) for _ in range(6)])
    store[email] = otp
    print(f"📧 Sent OTP {otp} to {email}")  # Thực tế gửi qua SMTP
