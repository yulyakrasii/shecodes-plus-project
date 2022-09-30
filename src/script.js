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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">
                  ${day}
                </div>
                <img
                src="http://openweathermap.org/img/wn/04d@2x.png"
                alt=""
                width="36"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-temperature-max">18°</span>
                  <span class="weather-temperature-min">12°</span>
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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

  celsiusTemperature = response.data.main.temp;
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temperature");
  celsius.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let showFahrenheit = document.querySelector("#fahrenheit-temperature");
showFahrenheit.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temperature");
  fahrenheit.innerHTML = Math.round(celsiusTemperature);
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
}

function showCurrentLocation(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

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
