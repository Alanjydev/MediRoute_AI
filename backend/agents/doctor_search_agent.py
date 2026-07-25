from services.serper_service import search_doctors

def doctor_search_node(state):
    """
    Searches for the recommended specialist or hospital nearby.
    """
    is_emergency = state.get("is_emergency", False)
    user_location = state.get("user_location", "Unknown Location")
    
    specialist = state.get("specialist", "General Physician")
    
    specialist = state.get("specialist", "General Physician")
    
    if is_emergency:
        # User explicitly requested practicing doctors rather than just hospitals,
        # so we search for specific doctors but keep the emergency flag intact.
        results = search_doctors(f"best {specialist} doctors", user_location)
    else:
        # Search for specialist with explicit medical doctor context
        results = search_doctors(f"best {specialist} doctors", user_location)
        
    return {"doctor_list": results}
