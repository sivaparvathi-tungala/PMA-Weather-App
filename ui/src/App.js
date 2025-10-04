import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false); // For info popup

  const getWeather = async () => {
    try {
      // Current weather
      const response = await axios.get(`http://127.0.0.1:8000/weather?city=${city}`);
      setWeather(response.data);

      // Forecast
      const forecastResponse = await axios.get(`http://127.0.0.1:8000/forecast?city=${city}`);
      setForecast(forecastResponse.data.forecast);

      setError("");
    } catch (err) {
      setError("Could not fetch weather data.");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Check Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !weather.error && (
        <div style={{ marginTop: "20px" }}>
          <h3>Current Weather in {weather.city}</h3>
          <p>🌤️ Temp: {weather.temperature} °C</p>
          <p>{weather.description}</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind_speed} m/s</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>5-Day Forecast</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {forecast.map((day, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "10px",
                  width: "120px",
                }}
              >
                <p><b>{day.date}</b></p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                />
                <p>{day.temperature} °C</p>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with your name + Info button */}
      <div style={{ marginTop: "50px" }}>
        <p>Built by <strong>Siva Parvathi Tungala</strong></p>
        <button onClick={() => setShowInfo(true)}>Info</button>
      </div>

      {/* Info Popup */}
      {showInfo && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "400px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <h3>About PMA</h3>
          <p>
            Product Manager Accelerator (PMA) is a training and bootcamp
            organization designed to help individuals transition into product
            management roles or level up in their current careers. They provide
            mentorship, skill-building, portfolio guidance, and job placement
            support to accelerate careers in product management.
          </p>
          <a
            href="https://www.linkedin.com/school/pmaccelerator/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit PMA LinkedIn
          </a>
          <br />
          <button
            style={{ marginTop: "10px" }}
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
