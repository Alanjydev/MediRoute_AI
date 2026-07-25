from langgraph.graph import StateGraph, END
from langgraph_setup.state import ConsultationState
from agents.symptom_agent import symptom_node
from agents.clarification_agent import clarification_node
from agents.specialist_agent import specialist_node
from agents.emergency_agent import emergency_node
from agents.doctor_search_agent import doctor_search_node
from agents.ranking_agent import ranking_node
from agents.response_agent import response_node

# Create the graph
workflow = StateGraph(ConsultationState)

# Add nodes
workflow.add_node("symptom_agent", symptom_node)
workflow.add_node("clarification_agent", clarification_node)
workflow.add_node("specialist_agent", specialist_node)
workflow.add_node("emergency_agent", emergency_node)
workflow.add_node("doctor_search_agent", doctor_search_node)
workflow.add_node("ranking_agent", ranking_node)
workflow.add_node("response_agent", response_node)

# Add edges
# Start goes to symptom agent
workflow.set_entry_point("symptom_agent")

# Condition: Does it need more info?
def check_more_info(state: ConsultationState):
    if state.get("more_info_needed"):
        return "clarify"
    return "analyze"

workflow.add_conditional_edges(
    "symptom_agent",
    check_more_info,
    {
        "clarify": "clarification_agent",
        "analyze": "specialist_agent"
    }
)

# Clarification ends the current turn (returns questions to user)
workflow.add_edge("clarification_agent", END)

# Specialist agent passes to emergency detection
workflow.add_edge("specialist_agent", "emergency_agent")

# Condition: Is it an emergency?
def check_emergency(state: ConsultationState):
    if state.get("is_emergency"):
        return "hospital_search"
    return "doctor_search"

workflow.add_conditional_edges(
    "emergency_agent",
    check_emergency,
    {
        "hospital_search": "doctor_search_agent",
        "doctor_search": "doctor_search_agent"
    }
)

# Doctor search goes to ranking
workflow.add_edge("doctor_search_agent", "ranking_agent")

# Ranking goes to final response
workflow.add_edge("ranking_agent", "response_agent")

# Response ends the workflow
workflow.add_edge("response_agent", END)

# Compile the workflow
workflow_app = workflow.compile()
