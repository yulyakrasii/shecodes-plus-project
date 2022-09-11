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

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let cityName = `${searchInput.value}`;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getLocationTemperature);
}

function getLocationTemperature(response) {
  let locationTemperature = document.querySelector("#current-temperature");
  locationTemperature.innerHTML = `${response.data.main.temp}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temperature");
  celsius.innerHTML = `76°`;
}
let showFahrenheit = document.querySelector("#fahrenheit-temperature");
showFahrenheit.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temperature");
  fahrenheit.innerHTML = `24°`;
}

let showCelsius = document.querySelector("#celsius-temperature");
showCelsius.addEventListener("click", changeFahrenheit);

function getCurrentTemperature(response) {
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerHTML = `${response.data.main.temp}`;
  let location = document.querySelector("h2");
  location.innerHTML = `${response.data.name}`;
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
