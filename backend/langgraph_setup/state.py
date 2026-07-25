from typing import TypedDict, List, Annotated
import operator

# The LangGraph state schema defines the data passed between agents
class ConsultationState(TypedDict):
    # User inputs
    symptoms: str
    user_location: str
    
    # Symptom extraction / Clarification
    more_info_needed: bool
    follow_up_questions: List[str]
    
    # Assessment
    is_emergency: bool
    specialist: str
    
    # Recommendations
    doctor_list: List[dict]
    
    # Final Response
    ai_response: str
