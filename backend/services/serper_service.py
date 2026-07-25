import os
import requests

def search_doctors(specialty, city):
    """
    Uses the Serper API to search for doctors or hospitals.
    """
    api_key = os.getenv("SERPER_API_KEY")
    if not api_key:
        print("SERPER_API_KEY is not set.")
        return []

    url = "https://google.serper.dev/places"
    
    query = f"{specialty} near {city}"

    payload = {
        "q": query
    }
    
    headers = {
        'X-API-KEY': api_key,
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        
        # Parse the Serper places results
        places = data.get("places", [])
        
        # Format the response to be cleaner
        results = []
        for place in places:
            results.append({
                "name": place.get("title", "Unknown"),
                "address": place.get("address", "Address not available"),
                "rating": place.get("rating", "No rating"),
                "reviews": place.get("ratingCount", 0),
                "phone": place.get("phoneNumber", "No phone number available"),
                "website": place.get("website", ""),
                "google_maps_link": place.get("cid", "") # We can construct Google maps link from cid or just use place name
            })
            
        return results
    except Exception as e:
        print(f"Error calling Serper API: {e}")
        return []
