import getWeatherInfo from './api/weather-api';
import  { setCurrentWeather, setWeatherForecasts } from './weather-util.js';


function displayCityName(city) {
  const cityName = document.getElementsByClassName('city-name')[0];
  cityName.textContent = city;
}


function searchCityWeather(city) {
  getWeatherInfo(city).then((info) => {
    displayCityName(city);
    setCurrentWeather(info.currentWeather);
    setWeatherForecasts(info.weatherForecasts);
  }).catch((error) => {
    console.log(`"${error}"`);
  });
}


searchCityWeather('New York');


const searchBar = document.getElementsByClassName('search-bar')[0];
searchBar.addEventListener('submit', (e) => {
  const city = e.currentTarget.querySelector('.search-input').value;
  searchCityWeather(city);
  e.preventDefault();
});


const searchInput = document.getElementsByClassName('search-input')[0];
searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && e.currentTarget.value.length === 0) {
    e.preventDefault();
  }
});

