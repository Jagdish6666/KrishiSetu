from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class PredictionRequest(BaseModel):
    crop_name: str
    region: str
    current_price: float
    demand_index: float

class PredictionResponse(BaseModel):
    predicted_price: float
    trend: str

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    # Mock ML Logic replacement for RandomForestRegressor
    # In a real scenario: model.predict([[current_price, demand_index, ...]])
    
    # We'll simulate a prediction based on demand and price
    # Demand index > 0.5 usually pushes price up
    variation = random.uniform(-0.02, 0.08) if request.demand_index > 0.5 else random.uniform(-0.08, 0.02)
    
    predicted_price = round(request.current_price * (1 + variation), 2)
    trend = "UP" if predicted_price > request.current_price else "DOWN"
    
    return {
        "predicted_price": predicted_price,
        "trend": trend
    }

@app.get("/")
async def root():
    return {"message": "KrishiSetu ML Prediction Service Active"}
