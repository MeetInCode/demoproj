from groq import Groq
import os

class GroqClient:
    def __init__(self):
        self.client = Groq(api_key="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")
        self.system_prompt = {
            "role": "system",
            "content": "You are a helpful assistant. You reply with short answers.If needed give details about the user's question."
        }
        self.chat_history = [self.system_prompt]
    
    def get_response(self, user_message):
        self.chat_history.append({"role": "user", "content": user_message})
        
        response = self.client.chat.completions.create(
            model="llama3-70b-8192",
            messages=self.chat_history,
            max_tokens=100,
            temperature=1.2
        )
        
        assistant_response = response.choices[0].message.content
        self.chat_history.append({"role": "assistant", "content": assistant_response})
        return assistant_response 