import os
from groq import Groq

# Initialize Groq client
# The GROQ_API_KEY is automatically picked up from the environment variables
client = Groq()

def call_llm(messages, response_format=None):
    """
    Calls the Groq API to get a response from the LLM.
    Uses the modern, fast Llama 3 model available on Groq.
    """
    try:
        # Default model for Groq, it is extremely fast and capable
        model = "llama-3.3-70b-versatile" 
        
        kwargs = {
            "model": model,
            "messages": messages,
            "temperature": 0.3, # Keep temperature low for more deterministic healthcare navigation
        }
        
        if response_format:
            kwargs["response_format"] = response_format
            
        chat_completion = client.chat.completions.create(**kwargs)
        
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return None
