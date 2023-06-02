// Uses the api key along with the base url to access all the weather information
const api = {
  key: "6b112c111200affe7c477e01c468ce21",
  base: "https://api.openweathermap.org/data/2.5/"
}

// Sets up an event listener in the search box for when a key is pressed
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// Sets the key we are looking of (13 is enter/return)
function setQuery(evt) {
  if (evt.keyCode == 13) {
      getResults(searchbox.value);
  }
}

// Once it has ben searched it will pass in the weather, search the query, 
// set the units, and get the api key, and return the weather in the json.
function getResults (query) {
fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
    return weather.json();
    }).then(displayResults);
}

// Takes the json and displays the results
function displayResults (weather) {
let city = document.querySelector('.location .city');
city.innerText = `${weather.name}, ${weather.sys.country}`;

// Gets the date at that location
let now = new Date();
let date = document.querySelector('.location .date');
date.innerText = dateBuilder(now);

// Gets the current temperature
let temp = document.querySelector('.current .temp');
temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

// Gets the current weather
let weather_el = document.querySelector('.current .weather');
weather_el.innerText = weather.weather[0].main;

// Gets the current hi-lo for the temperature
let hilow = document.querySelector('.hi-low');
hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

// This Sets up for the formatting of the month and day
function dateBuilder (d) {
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get the current date
let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

// Returns the date formatted
return `${day}, ${date} ${month}, ${year}`;
}
