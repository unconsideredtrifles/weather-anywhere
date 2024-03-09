import getWeatherInfo from './api/weather-api';
import  { setCurrentWeather, setWeatherForecasts } from './weather-util.js';


function searchCityWeather(city) {
  getWeatherInfo(city).then((info) => {
    setCurrentWeather(info.currentWeather);
    setWeatherForecasts(info.weatherForecasts);
  })/*.catch((error) => {
    console.log(`"${error}"`);
  });*/
}


const searchBar = document.getElementsByClassName('search-bar')[0];
searchBar.addEventListener('submit', (e) => {
  const city = e.currentTarget.querySelector('.search-input').value;
  searchCityWeather(city);
  e.preventDefault();
});