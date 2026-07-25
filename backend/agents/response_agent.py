from services.groq_service import call_llm
from utils.prompts import RESPONSE_AGENT_PROMPT

def response_node(state):
    """
    Generates the final conversational response.
    """
    symptoms = state.get("symptoms", "")
    specialist = state.get("specialist", "")
    is_emergency = state.get("is_emergency", False)
    doctor_list = state.get("doctor_list", [])
    
    doc_count = len(doctor_list)
    
    prompt = RESPONSE_AGENT_PROMPT.format(
        symptoms=symptoms,
        specialist=specialist,
        is_emergency=is_emergency,
        doc_count=doc_count
    )
    
    messages = [
        {"role": "user", "content": prompt}
    ]
    
    # We don't use JSON format here because we want conversational text
    ai_response = call_llm(messages)
    
    if not ai_response:
        ai_response = "I'm sorry, I couldn't generate a response at this time. Please consult a qualified healthcare professional."
        
    # Double check that the disclaimer is there
    disclaimer = "This AI assistant provides general healthcare guidance only and is not a substitute for professional medical advice. Please consult a qualified healthcare professional."
    if disclaimer not in ai_response:
        ai_response += "\n\n" + disclaimer
        
    return {"ai_response": ai_response}
