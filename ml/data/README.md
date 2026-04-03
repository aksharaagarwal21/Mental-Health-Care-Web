# Training Data Guide

## Required Format (JSONL)
Each line should be a JSON object:
```json
{"instruction": "I have JEE in 2 months and my parents expect rank under 100. I cannot sleep.", "output": "That pressure sounds incredibly heavy..."}
```

## Data Sources
1. **iCall (TISS Mumbai)** — Request anonymized transcripts: icallhelpline.org
2. **Kaggle**: Search "mental health India dataset"
3. **Reddit** (with permission): r/india, r/indianparents, r/beinghuman
4. **PubMed**: Indian mental health research papers
5. **NIMHANS publications**: nimhans.ac.in

## Data Cleaning
Run: `python clean_data.py`

## Privacy Rules
- Remove all names, phone numbers, emails before training
- Never include identifying information
- Get explicit consent or use only public data
