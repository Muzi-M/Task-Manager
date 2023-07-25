function updateWeatherData() {
  const weatherContainer = document.getElementById("weather-container");
  const cityName = "Cape Town";
  const apiKey = "ef88820bb5d38cdcc2117972cae6cc4b";
  const units = "metric";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios
    .get(weatherApiUrl)
    .then((response) => {
      const weatherData = response.data;
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      weatherContainer.innerHTML = `Weather in ${cityName}: ${temperature}°C, ${description}`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

updateWeatherData();
// Update weather data every 5 seconds (5000 milliseconds)
setInterval(updateWeatherData, 5000);
