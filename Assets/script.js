// Variables & API key from OpenWeather API
const apiKey = "9e7d1b0a51b2cdd53ceb30a255a08f48";

// Function to fetch weather data for city input
async function fetchWeatherData(city) {
  const response = await fetch(
    `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
  );
  const data = await response.json();
  return data;
}

// Function to display weather data for a given city
function displayWeatherData(city, data) {
  const container = document.getElementById("weather-container");
  container.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${data.main.temp} K</p>
    <p>Humidity: ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

// function getWeather() {
//   var apiKey = "9e7d1b0a51b2cdd53ceb30a255a08f48";
//   var location = document.getElementById("location").value;
//   var apiUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=$9e7d1b0a51b2cdd53ceb30a255a08f48&units=imperial";
// }

// function (cityInput) {
//     $("#searchBtn").on("click"), function (event) {
//       event.preventDefault();
//       var cityInput = $("#input").val();
//       var allCities = [];

//       allCities = JSON.parse(localStorage.getItem("allCities")) || [];
//       allCities.push(cityInput);
//       localStorage.setItem("allCities", JSON.stringify(allCities));

//       showWeather(cityInput);
//     });

// function showWeather(cityInput) {
//   $("dailyWeather").empty();
//   $("#fiveDay").empty();
//   $("#day1").empty();
//   $("#day2").empty();
//   $("#day3").empty();
//   $("#day4").empty();
//   $("#day5").empty();

//   var oneDay =
//     "http://api.openweathermap.org/data/2.5/forecast?id=" +
//     cityInput +
//     "&units=imperial";

//   $.ajax({
//     url: oneDay,
//     method: "GET",
//   }).then(function (response) {
//     var iconUrl =
//       "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
//     var lat = response.coord.lat;
//     var lon = response.coord.lon;

//     $("#dailyWeather").append(
//       "<div class='col s12 m6'>" +
//         "<h2 class='daily'>" +
//         response.name +
//         " (" +
//         startDate +
//         ")" +
//         "&nbsp" +
//         "<img src='" +
//         iconUrl +
//         "'>" +
//         "</h2>" +
//         "<ul class='daily'>" +
//         "Temperature: " +
//         response.main.temp +
//         " °F" +
//         "</ul>" +
//         "<ul class='daily'>" +
//         "Humidity: " +
//         response.main.humidity +
//         "%" +
//         "</ul>" +
//         "<ul class='daily'>" +
//         "Wind Speed: " +
//         response.wind.speed +
//         " MPH" +
//         "</ul>" +
//         "</div>"
//     );
//   });
// }

//Set up response for when user clicks/enters city information
//add WeatherAPI
