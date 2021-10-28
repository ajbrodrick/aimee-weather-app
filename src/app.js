function formatDate(timestamp) {
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

function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = document.querySelector("#weather-temp");
  let city = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-desc");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateNameTime = document.querySelector("#date-dayNameTime");
  let dateDay = document.querySelector("#date-day");
  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km / h`;
  dateNameTime.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
let units = "metric";
let city = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
