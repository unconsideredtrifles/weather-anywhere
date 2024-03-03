import {apiDomain, apiEndpoint, apiKey} from './api-config';


function enhanceIconSize(iconURL) {
  let biggerIconURL = iconURL.replace('64x64', '128x128');
  return `https:${biggerIconURL}`;
}


function getWeatherStatus(day) {
    const status = day.condition.text;
    const icon = enhanceIconSize(day.condition.icon);

    return { status, icon };
}


function parseRelevantInfo(weatherInfo) {
  let currentWeather = getWeatherStatus(weatherInfo.current);
  let weatherForecasts = weatherInfo.forecast.forecastday.map((eachForecastDay) => {
    return getWeatherStatus(eachForecastDay.day);
  });

  return { currentWeather, weatherForecasts };
}


async function callWeatherAPI(apiURL) {
  try {
    const res = await fetch(apiURL);
    if (!res.ok) {
      throw new Error('Bad HTTP Response');
    }
    const jsonOutput = await res.json();
    return jsonOutput;
  } catch ({message}) {
    if (message === 'Bad HTTP Response') {
      throw new Error(`${message}`);
    }
    throw new Error('Network error or permission issue');
  }
}


function getWeatherInfo(city) {
  const url = (
    `https://${apiDomain}/${apiEndpoint}?key=${apiKey}&q=${city}&days=3`
  );

  return callWeatherAPI(url).then((jsonOutput) => {
    return parseRelevantInfo(jsonOutput);
  });
}


export default getWeatherInfo;
