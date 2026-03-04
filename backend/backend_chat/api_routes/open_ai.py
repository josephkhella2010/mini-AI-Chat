""" import requests
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
    return result["choices"][0]["message"]["content"] """
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

    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)

        # 🔥 If API fails, raise clear error
        if response.status_code != 200:
            return f"AI Error: {response.text}"

        result = response.json()

        if "choices" not in result:
            return f"AI Error: {result}"

        return result["choices"][0]["message"]["content"]

    except Exception as e:
        return f"AI Exception: {str(e)}"