import json
from services.groq_service import call_llm
from utils.prompts import CLARIFICATION_AGENT_PROMPT

def clarification_node(state):
    """
    Generates follow-up questions if more info is needed.
    """
    symptoms = state["symptoms"]
    
    messages = [
        {"role": "system", "content": CLARIFICATION_AGENT_PROMPT},
        {"role": "user", "content": f"User symptoms: {symptoms}"}
    ]
    
    # We don't force JSON object here because we want a list, 
    # but Groq JSON mode requires an object. We'll ask for an object with a "questions" list in the prompt.
    # Let's adjust the prompt locally for strictly JSON object with a list inside.
    prompt = CLARIFICATION_AGENT_PROMPT + "\nReturn as JSON object with key 'questions' containing a list of strings."
    messages[0]["content"] = prompt
    
    response = call_llm(messages, response_format={"type": "json_object"})
    
    try:
        result = json.loads(response)
        questions = result.get("questions", ["Can you describe your symptoms in a bit more detail?"])
    except:
        questions = ["Can you describe your symptoms in a bit more detail?"]
        
    return {"follow_up_questions": questions}
