window.updateWeatherData = function () {
  const weatherContainer = document.getElementById("weather-container");
  const cityName = "Cape Town";
  const apiKey = process.env.WEATHER_API_KEY; // Access the API key from the .env file
  const units = "metric";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&callback=updateWeather`;

  const script = document.createElement("script");
  script.src = weatherApiUrl;
  document.body.appendChild(script);
};

window.updateWeather = function (data) {
  const weatherContainer = document.getElementById("weather-container");
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  weatherContainer.innerHTML = `Weather in Cape Town: ${temperature}°C, ${description}`;
};

// Call the function here
window.updateWeatherData();
// Update weather data every 5 seconds (5000 milliseconds)
setInterval(window.updateWeatherData, 5000);
