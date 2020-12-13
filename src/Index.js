function formatDate(date) {
  return `${days[dayIndex]}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");

let date = new Date();
let dayIndex = date.getDay();
let hours = date.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

dateElement.innerHTML = `${days[dayIndex]}, ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "52ab87c28c3fa62d2df55c9dfce87bc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);

}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "52ab87c28c3fa62d2df55c9dfce87bc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(handlePosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
