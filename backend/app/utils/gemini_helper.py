import google.generativeai as genai

async def generate_caption(image_bytes: bytes) -> str:
    model = genai.GenerativeModel("gemini-1.5-flash-001")

    # Prompt yêu cầu sinh caption bằng tiếng Việt
    prompt = "Hãy mô tả bức ảnh này bằng tiếng Việt một cách chi tiết."

    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    return response.text.strip()
