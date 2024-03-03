import getWeatherInfo from './api/weather-api';

getWeatherInfo('yangon').then((info) => {
  console.log(info);
}).catch((error) => {
  console.log(`"${error}"`);
});

