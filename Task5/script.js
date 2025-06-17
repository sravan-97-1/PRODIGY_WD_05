const apiKey = "cd8d9d469285d6a1e74b893ee6330eb4";

function getWeatherByCity() {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    },
    () => alert("Unable to retrieve location.")
  );
}

function fetchWeather(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(err.message || "Error fetching weather.");
        });
      }
      return res.json();
    })
    .then(data => displayWeather(data))
    .catch(err => {
      document.getElementById("weatherResult").classList.add("hidden");
      alert(err.message);
    });
}

function displayWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").innerText = data.main.temp;
  document.getElementById("condition").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("weatherIcon").src = iconUrl;

  document.getElementById("weatherResult").classList.remove("hidden");
}
