import json
import re

with open("data/skill_vocab.json") as f:
    SKILLS = json.load(f)

def extract_skills(text):
    """
    Extract skills using normalized vocabulary matching.
    """
    text = text.lower()
    found = {}

    for skill, aliases in SKILLS.items():
        for alias in aliases:
            if re.search(rf"\b{alias}\b", text):
                found[skill] = found.get(skill, 0) + 1

    return found