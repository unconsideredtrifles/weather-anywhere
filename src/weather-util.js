const setWeatherDate = function setWeatherDate(
  dateComponent,
  info,
  isToday = false,
) {
  const dateInfo = info;
  const dateEl = dateComponent.children[0];
  dateEl.textContent = info.date;
  dateEl.setAttribute('datetime', info.date);

  if (isToday) {
    dateInfo.weekDay = `Today/${dateInfo.weekDay}`;
  }

  const weekDayEl = dateComponent.children[2];
  weekDayEl.textContent = `(${dateInfo.weekDay})`;
};


const setWeatherInfo = function setWeatherInfo(weatherCategory, weatherInfo) {
  const weatherStatus = weatherCategory.querySelector('.weather-result-text');
  weatherStatus.textContent = weatherInfo.status;

  const weatherStatusImg = weatherCategory.querySelector('.weather-icon');
  weatherStatusImg.style.backgroundImage = `url("${weatherInfo.icon}")`;

  const weatherTemp = weatherCategory.querySelector('.weather-temperature');
  weatherTemp.textContent = weatherInfo.temp.celsius;
};


const setCurrentWeather = function setCurrentWeather(weatherInfo) {
  const category = document.getElementsByClassName('current-weather')[0];
  setWeatherInfo(category, weatherInfo);
};


const setWeatherForecasts = function setWeatherForecasts(forecasts) {
  const weatherDates = [...document.getElementsByClassName('weather-date')];
  const category = document.getElementsByClassName('weather-prediction')[0];

  const categories = [...category.getElementsByClassName('weather-card')];
  categories.forEach((eachResult, idx) => {
    setWeatherDate(weatherDates[idx], forecasts[idx], !idx);
    setWeatherInfo(eachResult, forecasts[idx]);
  });
};


export {
  setCurrentWeather,
  setWeatherForecasts,
};
