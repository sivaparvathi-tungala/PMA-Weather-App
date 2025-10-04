# PMA Weather App – Assessment 1  

This project is a "Weather Application" developed as part of Assessment 1.  
It uses FastAPI (Python) for the backend and React (JavaScript) for the frontend.  
The app fetches live weather data and a 5-day forecast using the "OpenWeatherMap API", and displays it to the user in a clean UI.  

-----------------------------------------------------------------------

# Features  

-  Real-time weather search by city  
-  5-day forecast with temperature, description and weather icons  
-  Built with FastAPI + React   
-  REST API with Swagger UI docs at `http://127.0.0.1:8000/docs`  
-  Cross-Origin support (CORS enabled)  
-  User-friendly interface  

-----------------------------------------------------------------------

# Tech Stack  

- Backend: FastAPI (Python), Uvicorn, Requests, dotenv  
- Frontend: React, Axios, CSS  
- API Provider: [OpenWeatherMap](https://openweathermap.org/api)  

-----------------------------------------------------------------------

# Setup Instructions  

#  Backend (FastAPI)  

1. Go to backend folder:  
   ```bash
   cd Assessment1/weather_API
   ```

2. Create and activate a virtual environment:  
   ```bash
   python -m venv venv
   venv\Scripts\activate    # (Windows)
   source venv/bin/activate # (Mac/Linux)
   ```

3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```

4. Add your OpenWeatherMap API Key in `.env`:  
   ```
   WEATHER_API_KEY=your_api_key_here
   ```

5. Run the FastAPI server:  
   ```bash
   uvicorn main:app --reload
   ```

    Backend runs at: `http://127.0.0.1:8000`  
    Swagger Docs: `http://127.0.0.1:8000/docs`  

-----------------------------------------------------------------------

#  Frontend (React)  

1. Go to frontend folder:  
   ```bash
   cd ../ui
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start React development server:  
   ```bash
   npm start
   ```

   Frontend runs at: `http://localhost:3000`  

-----------------------------------------------------------------------

# How It Works  

1. User enters a "city name" in the search box  
2. React (frontend) calls FastAPI (backend) via Axios  
3. FastAPI fetches data from "OpenWeatherMap API"  
4. Results (temperature, humidity, wind, forecast) are displayed in the UI  

-----------------------------------------------------------------------

# Demo (Video)  

- Demo of my PMA Weather App – Assessment 1 submission, built with FastAPI (Python) and React, showing real-time weather and 5-day forecast.  

Watch the Demo Video Here: https://drive.google.com/file/d/1BiXO4C6IyUqTCbVeXfwQaQCYdYneXTYR/view?usp=sharing

-----------------------------------------------------------------------
