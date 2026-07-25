from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.osm_service import get_city_from_coordinates
from services.serper_service import search_doctors
# We will import LangGraph workflow here later when it's built
# from langgraph_setup.workflow import run_workflow

router = APIRouter()

class Coordinates(BaseModel):
    lat: float
    lon: float

class ConsultRequest(BaseModel):
    symptoms: str
    city: Optional[str] = None
    coordinates: Optional[Coordinates] = None

class ClarifyRequest(BaseModel):
    symptoms: str
    answers: str
    city: Optional[str] = None
    coordinates: Optional[Coordinates] = None
    # In a real system, we'd pass a session ID to load state, 
    # but for stateless we might need to pass the conversation history or previous state
    # For now, we will pass previous symptoms and the answers.

class SearchRequest(BaseModel):
    specialty: str
    city: Optional[str] = None
    coordinates: Optional[Coordinates] = None

def resolve_location(city: Optional[str], coords: Optional[Coordinates]) -> str:
    """Helper to resolve city from either manual input or coordinates."""
    if city:
        return city
    if coords:
        resolved_city = get_city_from_coordinates(coords.lat, coords.lon)
        return resolved_city
    return "Unknown Location"

@router.post("/consult")
async def start_consultation(request: ConsultRequest):
    """
    Starts a new consultation based on initial symptoms.
    """
    user_location = resolve_location(request.city, request.coordinates)
    
    # Initialize state
    initial_state = {
        "symptoms": request.symptoms,
        "user_location": user_location,
        "is_emergency": False,
        "more_info_needed": False,
        "follow_up_questions": [],
        "specialist": "",
        "doctor_list": [],
        "ai_response": ""
    }
    
    try:
        from langgraph_setup.workflow import workflow_app
        # Run LangGraph workflow
        final_state = workflow_app.invoke(initial_state)
        return final_state
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/clarify")
async def continue_consultation(request: ClarifyRequest):
    """
    Continues consultation by providing answers to follow-up questions.
    """
    user_location = resolve_location(request.city, request.coordinates)
    
    # We combine original symptoms with the new answers for the stateless execution
    combined_symptoms = f"{request.symptoms}. Additional info: {request.answers}"
    
    # Re-run from the beginning with combined info
    initial_state = {
        "symptoms": combined_symptoms,
        "user_location": user_location,
        "is_emergency": False,
        "more_info_needed": False,
        "follow_up_questions": [],
        "specialist": "",
        "doctor_list": [],
        "ai_response": ""
    }
    
    try:
        from langgraph_setup.workflow import workflow_app
        final_state = workflow_app.invoke(initial_state)
        return final_state
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/search-doctors")
async def search_specialists(request: SearchRequest):
    """
    Directly search for doctors (can be used independently).
    """
    user_location = resolve_location(request.city, request.coordinates)
    doctors = search_doctors(request.specialty, user_location)
    return {"doctors": doctors}

@router.post("/search-hospitals")
async def search_hospitals_route(request: SearchRequest):
    """
    Directly search for hospitals.
    """
    user_location = resolve_location(request.city, request.coordinates)
    # Search for hospitals instead of a specific specialty
    hospitals = search_doctors("Hospital", user_location)
    return {"hospitals": hospitals}
