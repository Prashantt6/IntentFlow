from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from app.service.analyze_intent import analyze_Intent
app = FastAPI()

class TextRequest(BaseModel):
    text: str
    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/get_intent')
async def analyze_intent(input: TextRequest):
    intent = analyze_Intent(input.text)
    return{"intent":intent}
@app.get('/')
def health():
    return{'status': "running"}