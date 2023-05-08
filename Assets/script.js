//Variables & API key from OpenWeather API
const apiKey = "59e621791d69e3841a207d4d84317cf4";
// const currentDay = $(".currentDay");
const day1 = $(".day1");
const day2 = $(".day2");
const day3 = $(".day3");
const day4 = $(".day4");
const day5 = $(".day5");

// Function to fetch weather data for a given city
async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  );
  const data = await response.json();
  return data;
}

async function fetchWeatherDataLatLon(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  );
  const data = await response.json();
  return data;
}

async function fetchCityLatLon(city) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=1&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function fetchForecastDataLatLon(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

function displayForecastData(data) {
  const forecast = data.list;

  for (let i = 0; i < 5; i++) {
    const day = forecast[i];
    const container = document.getElementById("day" + i);
    container.innerHTML = `
      <h2>${day.dt_txt}</h2>
      <p>Temperature: ${day.main.temp} F</p>
      <p>Wind Speed: ${day.wind.speed} m/s</p>
      <p>Humidity: ${day.main.humidity} %</p>
    `;
  }
}

// Function to display weather data for a given city
function displayWeatherData(city, data) {
  const container = document.getElementById("weather-container");
  container.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${data.main.temp} F</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Humidity: ${data.main.humidity} %</p>
  `;
}

// Function to save searched cities in local storage
function saveSearch(city) {
  const history = localStorage.getItem("search-history") || "[]";
  const searchHistory = JSON.parse(history);
  searchHistory.push(city);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
}

// Function to retrieve search history from local storage
function getSearchHistory() {
  const history = localStorage.getItem("search-history") || "[]";
  const searchHistory = JSON.parse(history);
  const container = document.getElementById("search-history");
  container.innerHTML = "";
  for (const city of searchHistory) {
    const li = document.createElement("li");
    li.innerText = city;
    li.classList.add("search-item"); // Add the class "search-item"
    container.appendChild(li);
  }
}

// Function to handle button click
// Function to fetch and display weather data for a given city
function handleWeatherData(city) {
  fetchCityLatLon(city)
    .then((cityData) => {
      fetchWeatherDataLatLon(cityData[0].lat, cityData[0].lon)
        .then((data) => {
          displayWeatherData(city, data);
          saveSearch(city);
          getSearchHistory();
        })
        .catch((error) => console.log(error));

      fetchForecastDataLatLon(cityData[0].lat, cityData[0].lon)
        .then((data) => {
          displayForecastData(data);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// Function to handle button click
function handleButtonClick() {
  const input = document.getElementById("city-input");
  const city = input.value;
  handleWeatherData(city);
}

// Function to handle click on search history item
function handleSearchHistoryClick(event) {
  const city = event.target.innerText;
  handleWeatherData(city);
}

// Add event listener to search history items
const searchHistoryContainer = document.getElementById(
  "search-history-container"
);
searchHistoryContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("search-item")) {
    handleSearchHistoryClick(event);
  }
});

// Event listeners for button click and search history retrieval
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleButtonClick);
window.addEventListener("load", getSearchHistory);
