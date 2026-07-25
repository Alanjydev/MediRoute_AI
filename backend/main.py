import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from routes.consultation import router as consultation_router
from dotenv import load_dotenv

# Load environment variables (API Keys) from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Healthcare Navigation Assistant",
    description="An AI-powered assistant to navigate healthcare options.",
    version="1.0.0"
)

# Setup CORS to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(consultation_router, prefix="/api")

# Serve the built frontend
if os.path.isdir("dist"):
    # Mount the assets folder
    assets_path = os.path.join("dist", "assets")
    if os.path.isdir(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

    # Catch-all to serve index.html for React Router and other root files
    @app.get("/{catchall:path}")
    def serve_frontend(catchall: str):
        file_path = os.path.join("dist", catchall)
        if catchall and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        index_path = os.path.join("dist", "index.html")
        if os.path.isfile(index_path):
            return FileResponse(index_path)
        
        return {"message": "Frontend build not found"}
else:
    @app.get("/")
    def read_root():
        return {"message": "Welcome to the AI Healthcare Navigation Assistant API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
