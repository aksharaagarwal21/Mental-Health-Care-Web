
import re

PATTERNS = [
    r"(suicid|kill myself|end my life|want to die|no point living)",
    r"(nobody will miss me|better off dead|cant take this anymore)",
    r"(overdose|hang myself|hurt myself|self.harm)",
]
HELPLINES = [
    {"name": "iCall (TISS)", "number": "9152987821", "hours": "Mon-Sat 8am-10pm"},
    {"name": "Vandrevala Foundation", "number": "1860-2662-345", "hours": "24/7"},
    {"name": "NIMHANS", "number": "080-46110007", "hours": "24/7"},
]

def detect_crisis(text: str) -> dict:
    detected = any(re.search(p, text.lower()) for p in PATTERNS)
    return {"crisis_detected": detected, "helplines": HELPLINES if detected else []}
