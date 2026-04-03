
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB: str = "bloodwing"
    GROQ_API_KEY: str = ""
    MODEL_NAME: str = "llama3-8b-8192"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    SECRET_KEY: str = "change-me"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    class Config:
        env_file = ".env"

settings = Settings()
