function updateInterface(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#temp-value");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");
  let dateAndTime = document.querySelector("#date-and-time");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#current-weather-icon");

  currentCity.innerHTML = response.data.name;

  temp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temp;

  tempMax = Math.round(response.data.main.temp_max);
  tempHigh.innerHTML = tempMax;

  tempMin = Math.round(response.data.main.temp_min);
  tempLow.innerHTML = tempMin;

  dateAndTime.innerHTML = formatDate(response.data.timezone * 1000);

  description.innerHTML = response.data.weather[0].description;

  humidity.innerHTML = `${response.data.main.humidity}%`;

  wind.innerHTML = `${response.data.wind.speed}km/h`;

  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="" />`;
}

function formatDate(response) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentTimeUTC = new Date();
  let currentTime = new Date(currentTimeUTC.getTime() + response);

  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[currentTime.getDay()];

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8c5739a97b9293b1ed586257ba7ae85b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateInterface);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitSearch);

searchCity("London");
