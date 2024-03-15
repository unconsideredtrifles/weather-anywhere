import getWeatherInfo from './api/weather-api';
import  { setCurrentWeather, setWeatherForecasts } from './weather-util';
import { startLoading, stopLoading } from './components/loading-handler';
import displayErrorMsg from './components/error-handler';


const clearSearchForm = function clearSearchForm() {
  searchInput.value = '';
}


function displayCityName(city) {
  const cityName = document.getElementsByClassName('city-name')[0];
  cityName.textContent = city;
}

const checkIfExactCity = function checkIfExactCity(givenCity, returnedCity) {
  return (
    givenCity.trim().toLowerCase() === returnedCity.trim().toLowerCase()
  );
};


function searchCityWeather(city) {
  startLoading();
  getWeatherInfo(city).then((info) => {
    if (!checkIfExactCity(city, info.city)) {
      throw new Error('No matching location found.');
    }
    stopLoading();
    displayCityName(city);
    setCurrentWeather(info.currentWeather);
    setWeatherForecasts(info.weatherForecasts);
  }).catch((error) => {
    displayErrorMsg(`"${error}"`);
  });
}


searchCityWeather('New York');


const searchBar = document.getElementsByClassName('search-bar')[0];
searchBar.addEventListener('submit', (e) => {
  const city = e.currentTarget.querySelector('.search-input').value;
  searchCityWeather(city);
  clearSearchForm();
  e.preventDefault();
});


const searchInput = document.getElementsByClassName('search-input')[0];
searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && e.currentTarget.value.length === 0) {
    e.preventDefault();
  }
});

