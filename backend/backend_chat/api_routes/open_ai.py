import requests
from django.conf import settings


def generate_answer(message):
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {settings.OPEN_AI_ROUTER}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": message}
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()

    # 🔥 Extract only AI text
    return result["choices"][0]["message"]["content"]