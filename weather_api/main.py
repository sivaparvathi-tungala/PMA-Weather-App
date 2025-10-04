from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables (API key from .env file)
load_dotenv()
API_KEY = os.getenv("WEATHER_API_KEY")  # Put your key in a .env file

app = FastAPI(title="PMA Weather API")

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to the PMA Weather API"}

#  Current Weather Endpoint
@app.get("/weather")
def get_weather(city: str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "weather": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "icon": data["weather"][0]["icon"]  # add weather icon
        }

    return {"error": "Could not fetch weather data."}

#  5-Day Forecast Endpoint (one result per day at 12:00)
@app.get("/forecast")
def get_forecast(city: str):
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        forecast_list = []

        for item in data["list"]:
            if "12:00:00" in item["dt_txt"]:  # pick forecast for noon
                forecast_list.append({
                    "date": item["dt_txt"].split(" ")[0],
                    "temperature": item["main"]["temp"],
                    "description": item["weather"][0]["description"],
                    "icon": item["weather"][0]["icon"]
                })

        return {"city": data["city"]["name"], "forecast": forecast_list}

    return {"error": "Could not fetch forecast data."}
