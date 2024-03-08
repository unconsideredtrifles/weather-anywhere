function setWeatherInfo(weatherCategory, weatherInfo) {
  const weatherStatus = weatherCategory.querySelector('.weather-result-text');
  weatherStatus.textContent = weatherInfo.status;

  const weatherStatusImg = weatherCategory.querySelector('.weather-result-img');
  weatherStatusImg.style.backgroundImage = `url("${weatherInfo.icon}")`;

  const weatherTemp = weatherCategory.querySelector('.weather-temperature');
  weatherTemp.textContent = weatherInfo.temp.celsius;
}


function setCurrentWeather(weatherInfo) {
  const category = document.getElementsByClassName('current-weather')[0];
  setWeatherInfo(category, weatherInfo);
}


function setWeatherForecasts(forecasts) {
  const category = document.getElementsByClassName('weather-prediction')[0];
  Array.from(
    category.getElementsByClassName('weather-result'),
    (eachResult, idx) => {
      setWeatherInfo(eachResult, forecasts[idx]);
    },
  );
}

export {
  setCurrentWeather,
  setWeatherForecasts,
};