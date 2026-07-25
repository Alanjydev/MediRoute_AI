import requests

def get_city_from_coordinates(lat, lon):
    """
    Uses OpenStreetMap's Nominatim API to get city name from latitude and longitude.
    """
    try:
        url = "https://nominatim.openstreetmap.org/reverse"
        
        params = {
            "lat": lat,
            "lon": lon,
            "format": "json",
            "zoom": 10 # Zoom level 10 gives city-level precision usually
        }
        
        # Nominatim requires a user-agent
        headers = {
            "User-Agent": "AI_Healthcare_Navigation_Assistant/1.0"
        }
        
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        address = data.get("address", {})
        
        # City might be under different keys depending on the location
        city = address.get("city") or address.get("town") or address.get("village") or address.get("county") or "Unknown Location"
        
        return city
        
    except Exception as e:
        print(f"Error calling OpenStreetMap API: {e}")
        return "Unknown Location"
