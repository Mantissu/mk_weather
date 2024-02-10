function updateInterface(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
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
