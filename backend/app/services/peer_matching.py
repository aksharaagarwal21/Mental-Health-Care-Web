
async def find_peers(situations: list, limit: int = 5) -> list:
    return [
        {"alias": "Anonymous Sunflower", "similarity": 94, "situation": situations[0] if situations else "General", "city": "Kota", "experience": "2 years ago", "badge": None},
        {"alias": "Anonymous River", "similarity": 88, "situation": situations[0] if situations else "General", "city": "Chennai", "experience": "1 year ago", "badge": "peer_mentor"},
        {"alias": "Anonymous Mountain", "similarity": 82, "situation": "General", "city": "Delhi", "experience": "6 months ago", "badge": None},
    ]
