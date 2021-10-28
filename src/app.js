function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = document.querySelector("#weather-temp");
  let city = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-desc");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km / h`;
}

let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
let units = "metric";
let city = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
