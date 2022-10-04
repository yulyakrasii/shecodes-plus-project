let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentTime = new Date();
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinute = currentTime.getMinutes();

let now = document.querySelector("#now");
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
now.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">
                  ${formatDay(forecastDay.dt)}
                </div>
                <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="36"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#your-city");
  cityElement.innerHTML = `${searchInput.value}`;
  let cityName = `${searchInput.value}`;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getLocationTemperature);
}

function getLocationTemperature(response) {
  let locationTemperature = document.querySelector("#current-temperature");
  locationTemperature.innerHTML = Math.round(`${response.data.main.temp}`);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(`${response.data.wind.speed}`);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");

  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temperature");
  celsius.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");
}
let showFahrenheit = document.querySelector("#fahrenheit-temperature");
showFahrenheit.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temperature");
  fahrenheit.innerHTML = Math.round(celsiusTemperature);
  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");
}

let showCelsius = document.querySelector("#celsius-temperature");
showCelsius.addEventListener("click", changeFahrenheit);

function getCurrentTemperature(response) {
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerHTML = Math.round(`${response.data.main.temp}`);
  let location = document.querySelector("h2");
  location.innerHTML = `${response.data.name}`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(`${response.data.wind.speed}`);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getCurrentTemperature);
}

function navigatorOn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", navigatorOn);
