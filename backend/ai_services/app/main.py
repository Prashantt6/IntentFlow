from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from app.service import analyze_intent
app = FastAPI()

class TextRequest(BaseModel):
    text: str
    user_id: Optional[int]= None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/find_intent')
def analyze_intent(input: TextRequest):
    intent = analyze_intent(input)
    return{intent}