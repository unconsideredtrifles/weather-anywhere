/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/api-config.js":
/*!*******************************!*\
  !*** ./src/api/api-config.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiDomain: () => (/* binding */ apiDomain),
/* harmony export */   apiEndpoint: () => (/* binding */ apiEndpoint),
/* harmony export */   apiKey: () => (/* binding */ apiKey)
/* harmony export */ });
const apiDomain = 'api.weatherapi.com';
const apiEndpoint = 'v1/forecast.json';
const apiKey = '4c35c5219c504ec58a3120808242901';



/***/ }),

/***/ "./src/api/weather-api.js":
/*!********************************!*\
  !*** ./src/api/weather-api.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-config */ "./src/api/api-config.js");
/* harmony import */ var _date_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../date-util.js */ "./src/date-util.js");




function enhanceIconSize(iconURL) {
  let biggerIconURL = iconURL.replace('64x64', '128x128');
  return `https:${biggerIconURL}`;
}


function getWeatherStatus(day) {
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
}


function parseRelevantInfo(weatherInfo) {
  let currentWeather = getWeatherStatus(weatherInfo.current);
  let weatherForecasts = weatherInfo.forecast.forecastday.map((eachForecastDay) => {
    return {
      date: eachForecastDay.date,
      weekDay: (0,_date_util_js__WEBPACK_IMPORTED_MODULE_1__["default"])(eachForecastDay.date),
      ...getWeatherStatus(eachForecastDay.day),
    };
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
    `https://${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiDomain}/${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiEndpoint}?key=${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiKey}&q=${city}&days=3`
  );

  return callWeatherAPI(url).then((jsonOutput) => {
    return parseRelevantInfo(jsonOutput);
  });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeatherInfo);


/***/ }),

/***/ "./src/date-util.js":
/*!**************************!*\
  !*** ./src/date-util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const convertDate2Wday = function convertDate2Wday(dateStr) {
  const wdays = [
    'Sun', 'Mon', 'Tue', 
    'Wed', 'Thurs', 'Fri', 
    'Sat',
  ];

  const wdayIdx = new Date(dateStr).getDay();
  return wdays[wdayIdx];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convertDate2Wday);

/***/ }),

/***/ "./src/weather-util.js":
/*!*****************************!*\
  !*** ./src/weather-util.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setCurrentWeather: () => (/* binding */ setCurrentWeather),
/* harmony export */   setWeatherForecasts: () => (/* binding */ setWeatherForecasts)
/* harmony export */ });
function setWeatherDate(dateEl, dateInfo, isToday = false) {
  dateEl.children[0].textContent = dateInfo.date;
  dateEl.children[0].setAttribute('datetime', dateInfo.date);
  if (isToday) {
    dateInfo.weekDay = `Today/${dateInfo.weekDay}`;
  }
  dateEl.children[2].textContent = `(${dateInfo.weekDay})`;
}


function setWeatherInfo(weatherCategory, weatherInfo) {
  const weatherStatus = weatherCategory.querySelector('.weather-result-text');
  weatherStatus.textContent = weatherInfo.status;

  const weatherStatusImg = weatherCategory.querySelector('.weather-icon');
  weatherStatusImg.style.backgroundImage = `url("${weatherInfo.icon}")`;

  const weatherTemp = weatherCategory.querySelector('.weather-temperature');
  weatherTemp.textContent = weatherInfo.temp.celsius;
}


function setCurrentWeather(weatherInfo) {
  const category = document.getElementsByClassName('current-weather')[0];
  setWeatherInfo(category, weatherInfo);
}


function setWeatherForecasts(forecasts) {
  const weatherDates = [...document.getElementsByClassName('weather-date')];
  const category = document.getElementsByClassName('weather-prediction')[0];

  Array.from(
    category.getElementsByClassName('weather-card'),
    (eachResult, idx) => {
      setWeatherDate(weatherDates[idx], forecasts[idx], !idx);
      setWeatherInfo(eachResult, forecasts[idx]);
    },
  );
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_weather_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/weather-api */ "./src/api/weather-api.js");
/* harmony import */ var _weather_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weather-util.js */ "./src/weather-util.js");




function displayCityName(city) {
  const cityName = document.getElementsByClassName('city-name')[0];
  cityName.textContent = city;
}


function searchCityWeather(city) {
  (0,_api_weather_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city).then((info) => {
    displayCityName(city);
    (0,_weather_util_js__WEBPACK_IMPORTED_MODULE_1__.setCurrentWeather)(info.currentWeather);
    (0,_weather_util_js__WEBPACK_IMPORTED_MODULE_1__.setWeatherForecasts)(info.weatherForecasts);
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGNEQ7QUFDZDs7O0FBRzlDO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNO0FBQzFCLHVCQUF1QixNQUFNO0FBQzdCLE9BQU87QUFDUDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5REFBZ0I7QUFDL0I7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxRQUFRLFFBQVE7QUFDcEI7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGVBQWUsa0RBQVMsQ0FBQyxHQUFHLG9EQUFXLENBQUMsT0FBTywrQ0FBTSxDQUFDLEtBQUssS0FBSztBQUNoRTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7OztBQ1gvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQSx1Q0FBdUMsaUJBQWlCO0FBQ3hEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQsaUJBQWlCOztBQUVwRTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04rQztBQUM2Qjs7O0FBRzVFO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLEVBQUUsNERBQWM7QUFDaEI7QUFDQSxJQUFJLG1FQUFpQjtBQUNyQixJQUFJLHFFQUFtQjtBQUN2QixHQUFHO0FBQ0gsb0JBQW9CLE1BQU07QUFDMUIsR0FBRztBQUNIOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpL2FwaS1jb25maWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpL3dlYXRoZXItYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGUtdXRpbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyLXV0aWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcGlEb21haW4gPSAnYXBpLndlYXRoZXJhcGkuY29tJztcbmNvbnN0IGFwaUVuZHBvaW50ID0gJ3YxL2ZvcmVjYXN0Lmpzb24nO1xuY29uc3QgYXBpS2V5ID0gJzRjMzVjNTIxOWM1MDRlYzU4YTMxMjA4MDgyNDI5MDEnO1xuXG5leHBvcnQge1xuICBhcGlEb21haW4sXG4gIGFwaUVuZHBvaW50LFxuICBhcGlLZXlcbn07IiwiaW1wb3J0IHthcGlEb21haW4sIGFwaUVuZHBvaW50LCBhcGlLZXl9IGZyb20gJy4vYXBpLWNvbmZpZyc7XG5pbXBvcnQgY29udmVydERhdGUyV2RheSBmcm9tICcuLi9kYXRlLXV0aWwuanMnXG5cblxuZnVuY3Rpb24gZW5oYW5jZUljb25TaXplKGljb25VUkwpIHtcbiAgbGV0IGJpZ2dlckljb25VUkwgPSBpY29uVVJMLnJlcGxhY2UoJzY0eDY0JywgJzEyOHgxMjgnKTtcbiAgcmV0dXJuIGBodHRwczoke2JpZ2dlckljb25VUkx9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyU3RhdHVzKGRheSkge1xuICAgIGNvbnN0IHN0YXR1cyA9IGRheS5jb25kaXRpb24udGV4dDtcbiAgICBjb25zdCBpY29uID0gZW5oYW5jZUljb25TaXplKGRheS5jb25kaXRpb24uaWNvbik7XG4gICAgY29uc3QgdGVtcEMgPSAoZGF5LnRlbXBfYykgPyBkYXkudGVtcF9jIDogZGF5LmF2Z3RlbXBfYztcbiAgICBjb25zdCB0ZW1wRiA9IChkYXkudGVtcF9mKSA/IGRheS50ZW1wX2YgOiBkYXkuYXZndGVtcF9mO1xuXG4gICAgcmV0dXJuIHsgXG4gICAgICBzdGF0dXMsIFxuICAgICAgaWNvbiwgXG4gICAgICB0ZW1wOiB7XG4gICAgICAgIGNlbHNpdXM6IGAke3RlbXBDfcKwQ2AsXG4gICAgICAgIGZhaHJlbmhlaXQ6IGAke3RlbXBGfcKwRmAsXG4gICAgICB9LFxuICAgIH07XG59XG5cblxuZnVuY3Rpb24gcGFyc2VSZWxldmFudEluZm8od2VhdGhlckluZm8pIHtcbiAgbGV0IGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlclN0YXR1cyh3ZWF0aGVySW5mby5jdXJyZW50KTtcbiAgbGV0IHdlYXRoZXJGb3JlY2FzdHMgPSB3ZWF0aGVySW5mby5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAoKGVhY2hGb3JlY2FzdERheSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRlOiBlYWNoRm9yZWNhc3REYXkuZGF0ZSxcbiAgICAgIHdlZWtEYXk6IGNvbnZlcnREYXRlMldkYXkoZWFjaEZvcmVjYXN0RGF5LmRhdGUpLFxuICAgICAgLi4uZ2V0V2VhdGhlclN0YXR1cyhlYWNoRm9yZWNhc3REYXkuZGF5KSxcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4geyBjdXJyZW50V2VhdGhlciwgd2VhdGhlckZvcmVjYXN0cyB9O1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxXZWF0aGVyQVBJKGFwaVVSTCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGFwaVVSTCk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIEhUVFAgUmVzcG9uc2UnKTtcbiAgICB9XG4gICAgY29uc3QganNvbk91dHB1dCA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25PdXRwdXQ7XG4gIH0gY2F0Y2ggKHttZXNzYWdlfSkge1xuICAgIGlmIChtZXNzYWdlID09PSAnQmFkIEhUVFAgUmVzcG9uc2UnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bWVzc2FnZX1gKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yIG9yIHBlcm1pc3Npb24gaXNzdWUnKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFdlYXRoZXJJbmZvKGNpdHkpIHtcbiAgY29uc3QgdXJsID0gKFxuICAgIGBodHRwczovLyR7YXBpRG9tYWlufS8ke2FwaUVuZHBvaW50fT9rZXk9JHthcGlLZXl9JnE9JHtjaXR5fSZkYXlzPTNgXG4gICk7XG5cbiAgcmV0dXJuIGNhbGxXZWF0aGVyQVBJKHVybCkudGhlbigoanNvbk91dHB1dCkgPT4ge1xuICAgIHJldHVybiBwYXJzZVJlbGV2YW50SW5mbyhqc29uT3V0cHV0KTtcbiAgfSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZ2V0V2VhdGhlckluZm87XG4iLCJjb25zdCBjb252ZXJ0RGF0ZTJXZGF5ID0gZnVuY3Rpb24gY29udmVydERhdGUyV2RheShkYXRlU3RyKSB7XG4gIGNvbnN0IHdkYXlzID0gW1xuICAgICdTdW4nLCAnTW9uJywgJ1R1ZScsIFxuICAgICdXZWQnLCAnVGh1cnMnLCAnRnJpJywgXG4gICAgJ1NhdCcsXG4gIF07XG5cbiAgY29uc3Qgd2RheUlkeCA9IG5ldyBEYXRlKGRhdGVTdHIpLmdldERheSgpO1xuICByZXR1cm4gd2RheXNbd2RheUlkeF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnREYXRlMldkYXk7IiwiZnVuY3Rpb24gc2V0V2VhdGhlckRhdGUoZGF0ZUVsLCBkYXRlSW5mbywgaXNUb2RheSA9IGZhbHNlKSB7XG4gIGRhdGVFbC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IGRhdGVJbmZvLmRhdGU7XG4gIGRhdGVFbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgZGF0ZUluZm8uZGF0ZSk7XG4gIGlmIChpc1RvZGF5KSB7XG4gICAgZGF0ZUluZm8ud2Vla0RheSA9IGBUb2RheS8ke2RhdGVJbmZvLndlZWtEYXl9YDtcbiAgfVxuICBkYXRlRWwuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQgPSBgKCR7ZGF0ZUluZm8ud2Vla0RheX0pYDtcbn1cblxuXG5mdW5jdGlvbiBzZXRXZWF0aGVySW5mbyh3ZWF0aGVyQ2F0ZWdvcnksIHdlYXRoZXJJbmZvKSB7XG4gIGNvbnN0IHdlYXRoZXJTdGF0dXMgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItcmVzdWx0LXRleHQnKTtcbiAgd2VhdGhlclN0YXR1cy50ZXh0Q29udGVudCA9IHdlYXRoZXJJbmZvLnN0YXR1cztcblxuICBjb25zdCB3ZWF0aGVyU3RhdHVzSW1nID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24nKTtcbiAgd2VhdGhlclN0YXR1c0ltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHt3ZWF0aGVySW5mby5pY29ufVwiKWA7XG5cbiAgY29uc3Qgd2VhdGhlclRlbXAgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItdGVtcGVyYXR1cmUnKTtcbiAgd2VhdGhlclRlbXAudGV4dENvbnRlbnQgPSB3ZWF0aGVySW5mby50ZW1wLmNlbHNpdXM7XG59XG5cblxuZnVuY3Rpb24gc2V0Q3VycmVudFdlYXRoZXIod2VhdGhlckluZm8pIHtcbiAgY29uc3QgY2F0ZWdvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXJyZW50LXdlYXRoZXInKVswXTtcbiAgc2V0V2VhdGhlckluZm8oY2F0ZWdvcnksIHdlYXRoZXJJbmZvKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRXZWF0aGVyRm9yZWNhc3RzKGZvcmVjYXN0cykge1xuICBjb25zdCB3ZWF0aGVyRGF0ZXMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1kYXRlJyldO1xuICBjb25zdCBjYXRlZ29yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItcHJlZGljdGlvbicpWzBdO1xuXG4gIEFycmF5LmZyb20oXG4gICAgY2F0ZWdvcnkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1jYXJkJyksXG4gICAgKGVhY2hSZXN1bHQsIGlkeCkgPT4ge1xuICAgICAgc2V0V2VhdGhlckRhdGUod2VhdGhlckRhdGVzW2lkeF0sIGZvcmVjYXN0c1tpZHhdLCAhaWR4KTtcbiAgICAgIHNldFdlYXRoZXJJbmZvKGVhY2hSZXN1bHQsIGZvcmVjYXN0c1tpZHhdKTtcbiAgICB9LFxuICApO1xufVxuXG5leHBvcnQge1xuICBzZXRDdXJyZW50V2VhdGhlcixcbiAgc2V0V2VhdGhlckZvcmVjYXN0cyxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2V0V2VhdGhlckluZm8gZnJvbSAnLi9hcGkvd2VhdGhlci1hcGknO1xuaW1wb3J0ICB7IHNldEN1cnJlbnRXZWF0aGVyLCBzZXRXZWF0aGVyRm9yZWNhc3RzIH0gZnJvbSAnLi93ZWF0aGVyLXV0aWwuanMnO1xuXG5cbmZ1bmN0aW9uIGRpc3BsYXlDaXR5TmFtZShjaXR5KSB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2l0eS1uYW1lJylbMF07XG4gIGNpdHlOYW1lLnRleHRDb250ZW50ID0gY2l0eTtcbn1cblxuXG5mdW5jdGlvbiBzZWFyY2hDaXR5V2VhdGhlcihjaXR5KSB7XG4gIGdldFdlYXRoZXJJbmZvKGNpdHkpLnRoZW4oKGluZm8pID0+IHtcbiAgICBkaXNwbGF5Q2l0eU5hbWUoY2l0eSk7XG4gICAgc2V0Q3VycmVudFdlYXRoZXIoaW5mby5jdXJyZW50V2VhdGhlcik7XG4gICAgc2V0V2VhdGhlckZvcmVjYXN0cyhpbmZvLndlYXRoZXJGb3JlY2FzdHMpO1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgXCIke2Vycm9yfVwiYCk7XG4gIH0pO1xufVxuXG5cbnNlYXJjaENpdHlXZWF0aGVyKCdOZXcgWW9yaycpO1xuXG5cbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlYXJjaC1iYXInKVswXTtcbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBjb25zdCBjaXR5ID0gZS5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKS52YWx1ZTtcbiAgc2VhcmNoQ2l0eVdlYXRoZXIoY2l0eSk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWlucHV0JylbMF07XG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgJiYgZS5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==