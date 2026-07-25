import json
from services.groq_service import call_llm
from utils.prompts import EMERGENCY_AGENT_PROMPT

def emergency_node(state):
    """
    Detects if the symptoms indicate a medical emergency.
    """
    symptoms = state["symptoms"]
    
    messages = [
        {"role": "system", "content": EMERGENCY_AGENT_PROMPT},
        {"role": "user", "content": f"Symptoms: {symptoms}"}
    ]
    
    response = call_llm(messages, response_format={"type": "json_object"})
    
    try:
        result = json.loads(response)
        is_emergency = result.get("is_emergency", False)
    except:
        # Default to false if parsing fails to avoid false panic
        is_emergency = False
        
    return {"is_emergency": is_emergency}
