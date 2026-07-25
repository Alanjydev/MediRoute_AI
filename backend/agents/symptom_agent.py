import json
from services.groq_service import call_llm
from utils.prompts import SYMPTOM_AGENT_PROMPT

def symptom_node(state):
    """
    Extracts symptoms and determines if more info is needed.
    """
    symptoms = state["symptoms"]
    
    messages = [
        {"role": "system", "content": SYMPTOM_AGENT_PROMPT},
        {"role": "user", "content": f"Here is the user input: {symptoms}"}
    ]
    
    response = call_llm(messages, response_format={"type": "json_object"})
    
    try:
        result = json.loads(response)
        more_info_needed = result.get("more_info_needed", False)
        # We could update the symptoms with the cleaned context if we want
        # cleaned_symptoms = result.get("context", symptoms)
    except:
        more_info_needed = False
        
    return {"more_info_needed": more_info_needed}
