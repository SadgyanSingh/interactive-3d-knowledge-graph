from collections import defaultdict
import random

def build_skill_events(skills):
    """
    Generate mock timeline events for each skill.
    Used to simulate learning progression.
    """
    events = defaultdict(list)

    for skill in skills:
        for _ in range(random.randint(1, 4)):
            events[skill].append(
                f"2024-0{random.randint(1,3)}-{random.randint(10,28)}"
            )

    return events