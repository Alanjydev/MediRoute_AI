# MediRoute AI 🏥🤖

**MediRoute AI** is an intelligent, conversational healthcare navigation assistant designed to help users identify the correct medical specialist based on their symptoms, detect potential life-threatening emergencies, and find nearby healthcare providers.

*Disclaimer: MediRoute AI is for informational purposes only. It does not diagnose diseases or prescribe medications. In case of a medical emergency, please contact your local emergency services immediately.*

## 🌟 Features

- **Intelligent Symptom Analysis:** Extracts key medical symptoms and context from natural language.
- **Dynamic Clarification:** Automatically asks polite follow-up questions if the initial symptom description is too vague.
- **Emergency Detection:** Prioritizes user safety by immediately identifying life-threatening symptoms and prioritizing hospital recommendations.
- **Precision Specialist Matching:** Maps symptoms to specific medical domains (e.g., Cardiologist, Neurologist) without diagnosing the actual disease.
- **Location-Based Healthcare Search:** Integrates with OpenStreetMap and Serper API to find local doctors or hospitals based on the user's city or exact GPS coordinates.

## 💻 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Python, FastAPI, Uvicorn
- **AI & Orchestration:** Groq API (LLM), LangChain, LangGraph (Multi-agent workflow)
- **External APIs:** Serper API (Google Search), OpenStreetMap (Geolocation)
- **Deployment Strategy:** Docker, AWS Elastic Beanstalk

## 🧠 Agentic Workflow Architecture

The core logic uses a **LangGraph** multi-agent state machine (`ConsultationState`):
1. **Symptom Agent:** Extracts symptoms and checks for vague inputs.
2. **Clarification Agent:** Asks follow-up questions if more info is needed.
3. **Specialist Agent:** Determines the most appropriate medical specialist.
4. **Emergency Agent:** Flags potential life-threatening conditions.
5. **Doctor Search Agent:** Uses Serper API and Geolocation to find local providers.
6. **Response Agent:** Compiles the final user-facing response with strict medical disclaimers.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- API Keys for **Groq** and **Serper**

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/doctor-ai.git
cd doctor-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory and add your API keys:
```env
GROQ_API_KEY=your_groq_api_key_here
SERPER_API_KEY=your_serper_api_key_here
```
Run the FastAPI server:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The application should now be running at `http://localhost:5173`.

## 🛡️ Safety & Guardrails
Building healthcare applications requires extreme care. MediRoute AI enforces strict prompt constraints preventing it from diagnosing conditions or prescribing medications. Multi-agent architecture isolates the specialist matching from the final response generation, ensuring safety guidelines are consistently applied.
