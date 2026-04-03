
from pydantic import BaseModel, Field
from typing import List

class ArticleCreate(BaseModel):
    title: str = Field(..., min_length=10, max_length=200)
    content: str = Field(..., min_length=50)
    category: str
    language: str = "English"
    author_type: str = "peer"
    tags: List[str] = []
