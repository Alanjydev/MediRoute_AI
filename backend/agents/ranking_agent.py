def ranking_node(state):
    """
    Ranks the doctors or hospitals based on rating and reviews.
    """
    doctor_list = state.get("doctor_list", [])
    
    if not doctor_list:
        return {"doctor_list": []}
        
    # We rank by rating first, then by review count
    # Note: Serper API ratings are strings or floats, count is int
    
    def get_score(doc):
        try:
            rating = float(doc.get("rating", 0))
        except:
            rating = 0.0
            
        try:
            reviews = int(doc.get("reviews", 0))
        except:
            reviews = 0
            
        # simple heuristic: rating heavily weighted, reviews break ties
        return (rating * 1000) + reviews
        
    ranked_doctors = sorted(doctor_list, key=get_score, reverse=True)
    
    # Return top 5
    return {"doctor_list": ranked_doctors[:5]}
