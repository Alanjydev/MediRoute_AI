# Project Report: MediRoute AI Development

**Live AWS Application URL:** [http://medirouteai-env.eba-pesgmwka.us-east-1.elasticbeanstalk.com/](http://medirouteai-env.eba-pesgmwka.us-east-1.elasticbeanstalk.com/)

---

## 1. Application Overview and Tech Stack

**MediRoute AI** is an intelligent healthcare navigation assistant designed to help users identify the correct medical specialist based on their symptoms, detect potential life-threatening emergencies, and find nearby healthcare providers.

**Tech Stack:**
- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons.
- **Backend:** Python, FastAPI, Uvicorn.
- **AI / LLM:** Groq API (for high-speed inference), LangChain, LangGraph (for multi-agent orchestration).
- **External Services:** Serper API (Google Search integration for finding doctors), OpenStreetMap (for geolocation and coordinate mapping).
- **Deployment:** AWS Elastic Beanstalk (Dockerized/Python environment).

---

## 2. Prompting Strategy and Frameworks Used

The core of the application relies on an **Agentic Workflow Framework** using **LangGraph**. Instead of relying on a single monolithic prompt, the system routes the user's input through a `StateGraph` of specialized agents.

**Prompting Strategy:**
- **Role-Playing & Constraints:** Each node (agent) is given a highly specific role and strict constraints, outputting structured JSON to maintain state integrity across the graph.
- **Guardrails:** Prompts explicitly forbid diagnosing diseases or prescribing medications.

**Sample Prompts from the Project:**

1. **Symptom Extraction Agent:**
   > "You are a medical symptom extraction assistant. Analyze the user's input and extract key symptoms, duration, severity, age, and gender if present. Determine if the provided information is sufficient to recommend a general category of medical specialist. If the symptoms are extremely vague... set `more_info_needed` to true."

2. **Specialist Matching Agent:**
   > "You are a medical specialist matching assistant. Based on the following symptoms, determine the single most appropriate medical specialist the user should consult... DO NOT diagnose the disease. DO NOT prescribe medicine. Return your answer strictly as a JSON object."

3. **Emergency Detection Agent:**
   > "You are a critical medical emergency detection assistant. Analyze the symptoms and determine if they indicate a possible life-threatening emergency... Return your answer strictly as a JSON object with one key: 'is_emergency' (boolean)."

---

## 3. Phase-by-Phase Development Summary

- **Phase 1: Architecture & Graph Design**
  - Designed the LangGraph state machine (`ConsultationState`) to hold symptoms, location, emergency flags, and doctor lists.
  - Defined the conditional edges (e.g., if `more_info_needed` -> route to Clarification Agent; if `is_emergency` -> route to Hospital Search).

- **Phase 2: Backend & Agent Implementation**
  - Developed individual agent nodes using LangChain and Groq.
  - Implemented the FastAPI routes (`/api/consult`, `/api/clarify`, `/api/search-doctors`) to interface with the LangGraph workflow.
  - Integrated Serper API for localized healthcare provider searches.

- **Phase 3: Frontend Development**
  - Built a responsive chat interface using React and Tailwind CSS.
  - Implemented geolocation features to capture user coordinates and pass them to the FastAPI backend.

- **Phase 4: Testing & Deployment**
  - Conducted extensive prompt tuning to reduce hallucinations.
  - Packaged the React frontend build into the FastAPI static files.
  - Deployed the unified application to AWS Elastic Beanstalk.

---

## 4. Application Architecture

The architecture follows a modular, state-driven approach:
1. **Client Layer:** A React web app captures user input and geolocation, sending a REST payload to the backend.
2. **API Layer:** FastAPI receives the request and initializes the LangGraph state.
3. **Orchestration Layer (LangGraph):**
   - **Entry:** `symptom_agent`
   - **Branch 1 (Vague Input):** Routes to `clarification_agent` which asks follow-up questions.
   - **Branch 2 (Valid Input):** Routes to `specialist_agent` -> `emergency_agent`.
   - **Branch 3 (Action):** Depending on emergency status, routes to `doctor_search_agent` (Serper API) to find clinics or hospitals.
   - **Exit:** `response_agent` compiles the final user-facing response with medical disclaimers.

---

## 5. Challenges Encountered and Resolutions

- **Challenge: Hallucinations & Overstepping Boundaries**
  - *Issue:* Early iterations of the LLM attempted to diagnose specific conditions or suggest medications.
  - *Resolution:* Implemented strict prompt constraints ("DO NOT diagnose the disease. DO NOT prescribe medicine") and separated the workflow so one agent solely extracts symptoms while another matches the specialist.

- **Challenge: Handling Vague User Inputs**
  - *Issue:* Users typing "I feel sick" resulted in poor specialist recommendations.
  - *Resolution:* Leveraged LangGraph's conditional routing to create a `clarification_agent`. If the symptom agent flags the input as insufficient, the graph pauses and asks the user for more details before proceeding.

- **Challenge: Accurate Local Search**
  - *Issue:* Recommending doctors in the wrong state or country.
  - *Resolution:* Integrated HTML5 Geolocation in the React frontend, sending exact coordinates to the backend. OpenStreetMap (`osm_service.py`) resolves these into a city name, which is then fed into the Serper API query (e.g., "Cardiologist in New York").

---

## 6. Key Learnings and Reflection

1. **Multi-Agent Orchestration is Superior:** Breaking down a complex reasoning task (healthcare triage) into smaller, specialized agents using LangGraph proved significantly more reliable than using a single, massive prompt. It allowed for easier debugging and independent tuning of each step.
2. **State Management is Critical:** Passing a structured dictionary (`ConsultationState`) between nodes made the data flow predictable and robust.
3. **Safety First:** Building healthcare applications requires extreme care regarding liability and user safety. Hardcoding the medical disclaimer in the final `response_agent` and prioritizing the `emergency_agent` were crucial ethical implementations.
