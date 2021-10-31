function formatDayTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#weather-temp");
  let city = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-desc");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateNameTime = document.querySelector("#date-dayNameTime");
  let dateDay = document.querySelector("#date-day");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km / h`;
  dateNameTime.innerHTML = formatDayTime(response.data.dt * 1000);
  dateDay.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let changeCityElement = document.querySelector("#city-search");
  search(changeCityElement.value);
}

function searchLocation(position) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitValue = Math.round((celsiusTemp * 9) / 5 + 32);
  celsius.classList.remove("unit-active");
  fahrenheit.classList.add("unit-active");
  let temperature = document.querySelector("#weather-temp");
  temperature.innerHTML = fahrenheitValue;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#weather-temp");
  celsius.classList.add("unit-active");
  fahrenheit.classList.remove("unit-active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#select-city");
form.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

search("Sydney");
