# Project Concept Note: MediRoute AI

**1. Project Title and Application Name**
- **Project Title:** AI-Powered Healthcare Navigation and Specialist Recommendation System
- **Application Name:** MediRoute AI

**2. Problem Statement / Objective**
When experiencing medical symptoms, individuals often struggle to identify the correct medical specialist to consult. This uncertainty leads to self-diagnosis via search engines (often causing anxiety), wasted time and resources visiting incorrect specialists, or dangerous delays in recognizing life-threatening emergencies. 
**Objective:** To develop an intelligent, conversational AI assistant that accurately analyzes user symptoms, identifies potential medical emergencies, recommends the appropriate specialist, and seamlessly connects the user with relevant healthcare professionals in their local area.

**3. Target User and Use Case**
- **Target User:** The general public, particularly individuals experiencing new or unfamiliar medical symptoms who need quick guidance on the next steps for their healthcare journey.
- **Use Case:** A user feels unwell (e.g., experiencing persistent chest pain). They access MediRoute AI, describe their symptoms, and optionally provide their location. The AI immediately flags the symptoms as a potential emergency, urges the user to seek immediate medical attention, and provides a localized list of nearby hospitals. For non-emergencies (e.g., skin rash), it recommends the exact specialist (e.g., Dermatologist) and lists nearby highly-rated clinics.

**4. LLM Model and API Used**
- **LLM Provider:** Groq API (leveraging ultra-fast, open-source models for near-instant inference).
- **Orchestration Framework:** LangChain and LangGraph for managing stateful, multi-agent workflows.
- **Search API:** Serper API for real-time, location-based doctor and hospital searches.

**5. Key Features of the Application**
- **Intelligent Symptom Analysis:** Accurately extracts key medical symptoms and context from natural language.
- **Dynamic Clarification:** Automatically asks polite follow-up questions if the initial symptom description is too vague to make a recommendation.
- **Emergency Detection:** Prioritizes user safety by immediately identifying life-threatening symptoms (e.g., stroke, severe bleeding) and pivoting the workflow to hospital recommendations.
- **Precision Specialist Matching:** Maps symptoms to specific medical domains (e.g., Cardiologist, Pulmonologist, Neurologist) without attempting to diagnose the actual disease.
- **Location-Based Healthcare Search:** Integrates with OpenStreetMap and Serper to find local doctors or hospitals based on the user's city or exact GPS coordinates.
- **Medical Disclaimer Enforcement:** Ensures professional boundaries by strictly appending medical disclaimers and refusing to prescribe medications.

**6. Expected User Experience and Outcomes**
Users will experience a seamless, modern, and empathetic chat interface. Instead of reading through dense medical articles, they receive a concise, actionable recommendation in seconds. The outcome is reduced anxiety, faster routing to the correct medical professional, and improved health literacy regarding when to seek emergency care.

---

**Live Application**
**Live AWS Application URL:** [http://medirouteai-env.eba-pesgmwka.us-east-1.elasticbeanstalk.com/](http://medirouteai-env.eba-pesgmwka.us-east-1.elasticbeanstalk.com/)
