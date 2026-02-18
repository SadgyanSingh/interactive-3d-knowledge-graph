from nlp.github_loader import load_github_text
from skill_extraction import extract_skills
from nlp.event_builder import build_skill_events
from progression import compute_skill_score
import json

def run_pipeline():
    text = load_github_text()
    skills = extract_skills(text)

    skill_events = build_skill_events(skills.keys())
    confidence = compute_skill_score(skill_events)

    output = {
        "user": "student_123",
        "skills": [
            {"name": k, "confidence": v}
            for k, v in confidence.items()
        ]
    }

    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    run_pipeline()