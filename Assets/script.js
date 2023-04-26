// Variables & API key from OpenWeather API
const apiKey = "9e7d1b0a51b2cdd53ceb30a255a08f48";
var currentDay = $(".currentDay");
var day1 = $(".day1");
var day2 = $(".day2");
var day3 = $(".day3");
var day4 = $(".day4");
var day5 = $(".day5");

// Function to fetch weather data for city input
async function fetchWeatherData(city) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}`
  );
  const data = await response.json();
  return data;
}

// Function to display weather data for a given city
function displayWeatherData(city, data) {
  const container = document.getElementById("weather-container");
  container.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${data.main.temp} F</p>
    <p>Humidity: ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
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
    container.appendChild(li);
  }
}

// Function to handle button click
function handleButtonClick() {
  const input = document.getElementById("city-input");
  const city = input.value;
  fetchWeatherData(city)
    .then((data) => {
      displayWeatherData(city, data);
      saveSearch(city);
      getSearchHistory();
    })
    .catch((error) => console.log(error));
}

// Event listeners for button click and search history retrieval
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleButtonClick);
window.addEventListener("load", getSearchHistory);
