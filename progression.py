from datetime import datetime

def compute_skill_score(skill_events):
    """
    Compute skill confidence using frequency + recency weighting.
    """
    scores = {}
    now = datetime.now()

    for skill, dates in skill_events.items():
        score = 0
        for d in dates:
            days_ago = (now - datetime.strptime(d, "%Y-%m-%d")).days
            weight = max(0.1, 1 - days_ago / 365)
            score += weight
        scores[skill] = round(score, 2)

    total = sum(scores.values()) or 1
    return {k: round(v / total, 2) for k, v in scores.items()}