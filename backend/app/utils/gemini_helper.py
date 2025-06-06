import google.generativeai as genai

async def generate_caption(image_bytes: bytes) -> str:
    model = genai.GenerativeModel("gemini-1.5-flash-001")

    # Prompt yêu cầu sinh caption bằng tiếng Việt
    # prompt = "Hãy mô tả bức ảnh này bằng tiếng Việt một cách chi tiết."
    # prompt = "Đây là địa điểm nào ở Việt Nam, hãy cho tôi thông tin du lịch về địa điểm này bằng tiếng việt."
    
    prompt = "Hãy mô tả bức ảnh này bằng tiếng Việt chỉ bằng 1 câu, hãy miêu tả sai 1 vài đặc điểm."

    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    return response.text.strip()


async def information_destination(image_bytes: bytes) -> str:
    model = genai.GenerativeModel("gemini-1.5-flash-001")

    prompt = "Đây là địa điểm nào ở Việt Nam, hãy cho tôi thông tin du lịch về địa điểm này bằng tiếng Việt."

    # prompt = "Đây là địa điểm nào ở Việt Nam."
    
    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    return response.text.strip()
