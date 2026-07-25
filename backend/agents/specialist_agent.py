import json
from services.groq_service import call_llm
from utils.prompts import SPECIALIST_AGENT_PROMPT

def specialist_node(state):
    """
    Determines the best specialist for the given symptoms.
    """
    symptoms = state["symptoms"]
    
    messages = [
        {"role": "system", "content": SPECIALIST_AGENT_PROMPT},
        {"role": "user", "content": f"Symptoms: {symptoms}"}
    ]
    
    response = call_llm(messages, response_format={"type": "json_object"})
    
    try:
        result = json.loads(response)
        specialist = result.get("specialist", "General Physician")
    except:
        specialist = "General Physician"
        
    return {"specialist": specialist}
