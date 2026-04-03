"""
Fine-tune LLM on Indian mental health data using LoRA.
Run on Google Colab (free T4 GPU) — takes ~2-4 hours.

Usage:
    python finetune.py
"""
from unsloth import FastLanguageModel
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset
import torch

MODEL_NAME = "unsloth/mistral-7b-instruct-v0.3"
OUTPUT_DIR = "india_mental_health_llm"

def load_model():
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=MODEL_NAME,
        max_seq_length=2048,
        load_in_4bit=True,  # Fits on free T4 GPU
    )
    model = FastLanguageModel.get_peft_model(
        model,
        r=16,
        target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
        lora_alpha=16,
        lora_dropout=0,
        bias="none",
    )
    return model, tokenizer

def format_prompt(example):
    """Format as instruction-following pairs with Indian mental health context."""
    return {
        "text": f"""### System:
You are a compassionate mental health assistant trained on Indian cultural context.
Respond with empathy, cultural sensitivity, and evidence-based advice.
Always recommend professional help (iCall: 9152987821) for serious concerns.

### User:
{example["instruction"]}

### Assistant:
{example["output"]}"""
    }

def train():
    model, tokenizer = load_model()
    
    # Load your cleaned dataset (see data/README.md for format)
    dataset = load_dataset("json", data_files="data/training_data.jsonl", split="train")
    dataset = dataset.map(format_prompt)
    
    trainer = SFTTrainer(
        model=model,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=2048,
        args=TrainingArguments(
            per_device_train_batch_size=2,
            gradient_accumulation_steps=4,
            num_train_epochs=3,
            learning_rate=2e-4,
            output_dir=OUTPUT_DIR,
            fp16=not torch.cuda.is_bf16_supported(),
            bf16=torch.cuda.is_bf16_supported(),
            logging_steps=10,
            save_steps=100,
            warmup_steps=50,
        ),
    )
    
    print("Starting fine-tuning...")
    trainer.train()
    
    # Save model
    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)
    print(f"Model saved to {OUTPUT_DIR}")
    
    # Push to HuggingFace Hub (optional)
    # model.push_to_hub("your-username/india-mental-health-llm")

if __name__ == "__main__":
    train()
