from fastapi import FastAPI
from pydantic import BaseModel
from skill_extraction import extract_skills
from nlp.event_builder import build_skill_events
from progression import compute_skill_score

app = FastAPI()

class GitHubInput(BaseModel):
    github_text: str

@app.get("/")
def root():
    return {"status": "ML Engine is running"}

@app.post("/extract-skills")
def extract(github_input: GitHubInput):
    skills = extract_skills(github_input.github_text)
    skill_events = build_skill_events(skills.keys())
    confidence = compute_skill_score(skill_events)

    return {
        "skills": [
            {"name": k, "confidence": v}
            for k, v in confidence.items()
        ]
    }