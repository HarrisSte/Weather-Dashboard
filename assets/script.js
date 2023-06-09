// Variables & API key from OpenWeather API
const apiKey = '59e621791d69e3841a207d4d84317cf4';
const day1 = $('.day1');
const day2 = $('.day2');
const day3 = $('.day3');
const day4 = $('.day4');
const day5 = $('.day5');
var weatherIcon = 'http://openweathermap.org/img/wn/';

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
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=1&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function fetchForecastDataLatLon(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  );
  const data = await response.json();
  return data;
}

// Function that displays the five day forecast
function displayForecastData(data) {
  const forecast = data.list;

  let dayCounter = 0;

  // Increment by 8 instead of 1 to skip three-hour intervals
  for (let i = 0; i < forecast.length; i += 8) {
    const day = forecast[i];
    // Removes the date portion
    const date = new Date(day.dt_txt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const container = document.getElementById('day' + dayCounter);
    container.innerHTML = `
      <h2>${date}</h2> <img src="${weatherIcon}${day.weather[0].icon}.png" alt="Weather Icon" />
      <p>Temperature: ${day.main.temp} F</p>
      <p>Wind Speed: ${day.wind.speed} m/s</p>
      <p>Humidity: ${day.main.humidity} %</p>
    `;
    // Increment the day counter
    dayCounter++;
  }
}

// Function to display weather data for one given city
function displayWeatherData(city, data, currentDate) {
  const container = document.getElementById('weather-container');
  container.innerHTML = `
    <h2>${city}</h2>
    <p>${currentDate}</p>
    <img src="${weatherIcon}${data.weather[0].icon}.png" alt="Weather Icon" />
    <p>Temperature: ${data.main.temp} F</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Humidity: ${data.main.humidity} %</p>
  `;
}

// Function to save searched cities in local storage
function saveSearch(city) {
  const history = localStorage.getItem('search-history') || '[]';
  const searchHistory = JSON.parse(history);
  searchHistory.push(city);
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
}

// Function to retrieve search history from local storage
function getSearchHistory() {
  const history = localStorage.getItem('search-history') || '[]';
  const searchHistory = JSON.parse(history);
  const container = document.getElementById('search-history');
  container.innerHTML = '';
  for (const city of searchHistory) {
    const li = document.createElement('li');
    li.innerText = city;
    li.classList.add('search-item'); // Add the class "search-item"
    container.appendChild(li);
  }
}

// Function to handle button click to fetch and display weather data for a given city
function handleWeatherData(city) {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); // Get the current date

  fetchCityLatLon(city)
    .then((cityData) => {
      fetchWeatherDataLatLon(cityData[0].lat, cityData[0].lon)
        .then((data) => {
          displayWeatherData(city, data, currentDate); // Pass the current date to the displayWeatherData function
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
  const input = document.getElementById('city-input');
  const city = input.value;
  handleWeatherData(city);
}

// Function to handle click on search history item
function handleSearchHistoryClick(event) {
  const city = event.target.innerText;
  handleWeatherData(city);
}

// Add event listener to search history items
const searchHistoryContainer = document.getElementById('search-history-container');
searchHistoryContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('search-item')) {
    handleSearchHistoryClick(event);
  }
});

// Event listener for button click
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleButtonClick);

// Event listener for page load
window.addEventListener('load', function () {
  getSearchHistory();
});
