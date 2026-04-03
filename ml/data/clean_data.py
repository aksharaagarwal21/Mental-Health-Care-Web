"""
Clean and anonymize mental health data before training.
"""
import pandas as pd
import re
import json

def clean_text(text: str) -> str:
    text = re.sub(r"\b\d{10}\b", "[PHONE]", text)          # phone numbers
    text = re.sub(r"\S+@\S+", "[EMAIL]", text)              # emails
    text = re.sub(r"\b[A-Z][a-z]+ [A-Z][a-z]+\b", "[NAME]", text)  # names
    text = re.sub(r"\b(https?://\S+)", "[URL]", text)       # URLs
    return text.strip()

def format_for_training(row) -> dict:
    return {
        "instruction": clean_text(str(row.get("user_message", ""))),
        "output": clean_text(str(row.get("therapist_response", "")))
    }

def process_csv(input_file: str, output_file: str):
    df = pd.read_csv(input_file)
    df = df.dropna()
    df = df[df.apply(lambda r: len(str(r.get("user_message", ""))) > 30, axis=1)]
    
    with open(output_file, "w") as f:
        for _, row in df.iterrows():
            entry = format_for_training(row)
            if len(entry["instruction"]) > 20 and len(entry["output"]) > 50:
                f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print(f"Processed {len(df)} examples -> {output_file}")

if __name__ == "__main__":
    process_csv("raw_data.csv", "training_data.jsonl")
