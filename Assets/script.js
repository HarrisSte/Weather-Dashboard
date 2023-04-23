//Variables & days for weather
var currentDate = dayjs().format("YYYY-MM-DD");
var day1 = dayjs().format("YYYY-MM-DD");
var day2 = dayjs().format("YYYY-MM-DD");
var day3 = dayjs().format("YYYY-MM-DD");
var day4 = dayjs().format("YYYY-MM-DD");
var day5 = dayjs().format("YYYY-MM-DD");

function getWeather() {
  var apiKey = "9e7d1b0a51b2cdd53ceb30a255a08f48";
  var location = document.getElementById("location").value;
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=$9e7d1b0a51b2cdd53ceb30a255a08f48&units=imperial";
}

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var cityInput = $("#input").val();
  var allCities = [];

  allCities = JSON.parse(localStorage.getItem("allCities")) || [];
  allCities.push(cityInput);
  localStorage.setItem("allCities", JSON.stringify(allCities));

  showWeather(cityInput);
});

$("dailyWeather").empty();
$("#fiveDay").empty();
$("#day1").empty();
$("#day2").empty();
$("#day3").empty();
$("#day4").empty();
$("#day5").empty();

//Set up response for when user clicks/enters city information
//add WeatherAPI
