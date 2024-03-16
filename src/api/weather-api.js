import { apiDomain, apiEndpoint, apiKey } from './api-config';
import convertDate2Wday from '../date-util';


const enhanceIconSize = function enhanceIconSize(iconURL) {
  const biggerIconURL = iconURL.replace('64x64', '128x128');
  return `https:${biggerIconURL}`;
};


const getWeatherStatus = function getWeatherStatus(day) {
  const status = day.condition.text;
  const icon = enhanceIconSize(day.condition.icon);
  const tempC = (day.temp_c) ? day.temp_c : day.avgtemp_c;
  const tempF = (day.temp_f) ? day.temp_f : day.avgtemp_f;

  return {
    status,
    icon,
    temp: {
      celsius: `${tempC}°C`,
      fahrenheit: `${tempF}°F`,
    },
  };
};


const parseRelevantInfo = function parseRelevantInfo(weatherInfo) {
  const currentWeather = getWeatherStatus(weatherInfo.current);
  const weatherForecasts = weatherInfo.forecast.forecastday.map((eachForecastDay) => ({
    date: eachForecastDay.date,
    weekDay: convertDate2Wday(eachForecastDay.date),
    ...getWeatherStatus(eachForecastDay.day),
  }));

  return {
    currentWeather,
    weatherForecasts,
    city: weatherInfo.location.name,
  };
};


async function callWeatherAPI(apiURL) {
  let res;
  try {
    res = await fetch(apiURL, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      throw new Error('Bad HTTP Response');
    }
    const jsonOutput = await res.json();
    return jsonOutput;
  } catch ({ name, message }) {
    if (name === 'AbortError') {
      throw new Error('Connection timeout');
    }

    if (message !== 'Bad HTTP Response') {
      throw new Error('Network error or permission issue');
    }

    const contentType = res.headers.get('Content-Type');
    if (contentType === 'application/json') {
      const jsonBody = await res.json();
      throw new Error(jsonBody.error.message);
    }
    throw new Error(`${message}`);
  }
}


function getWeatherInfo(city) {
  const url = (
    `https://${apiDomain}/${apiEndpoint}?key=${apiKey}&q=${city}&days=3`
  );

  return callWeatherAPI(url).then((jsonOutput) => (
    parseRelevantInfo(jsonOutput)
  ));
}


export default getWeatherInfo;
