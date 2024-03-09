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
  const weatherDates = [...document.getElementsByClassName('weather-date')];
  const category = document.getElementsByClassName('weather-prediction')[0];

  Array.from(
    category.getElementsByClassName('weather-result'),
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
  cityName.textContent = `${city} City's`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGNEQ7QUFDZDs7O0FBRzlDO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNO0FBQzFCLHVCQUF1QixNQUFNO0FBQzdCLE9BQU87QUFDUDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5REFBZ0I7QUFDL0I7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxRQUFRLFFBQVE7QUFDcEI7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGVBQWUsa0RBQVMsQ0FBQyxHQUFHLG9EQUFXLENBQUMsT0FBTywrQ0FBTSxDQUFDLEtBQUssS0FBSztBQUNoRTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7OztBQ1gvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQSx1Q0FBdUMsaUJBQWlCO0FBQ3hEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQsaUJBQWlCOztBQUVwRTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04rQztBQUM2Qjs7O0FBRzVFO0FBQ0E7QUFDQSw0QkFBNEIsTUFBTTtBQUNsQzs7O0FBR0E7QUFDQSxFQUFFLDREQUFjO0FBQ2hCO0FBQ0EsSUFBSSxtRUFBaUI7QUFDckIsSUFBSSxxRUFBbUI7QUFDdkIsR0FBRztBQUNILG9CQUFvQixNQUFNO0FBQzFCLEdBQUc7QUFDSDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS9hcGktY29uZmlnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS93ZWF0aGVyLWFwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRlLXV0aWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci11dGlsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBpRG9tYWluID0gJ2FwaS53ZWF0aGVyYXBpLmNvbSc7XG5jb25zdCBhcGlFbmRwb2ludCA9ICd2MS9mb3JlY2FzdC5qc29uJztcbmNvbnN0IGFwaUtleSA9ICc0YzM1YzUyMTljNTA0ZWM1OGEzMTIwODA4MjQyOTAxJztcblxuZXhwb3J0IHtcbiAgYXBpRG9tYWluLFxuICBhcGlFbmRwb2ludCxcbiAgYXBpS2V5XG59OyIsImltcG9ydCB7YXBpRG9tYWluLCBhcGlFbmRwb2ludCwgYXBpS2V5fSBmcm9tICcuL2FwaS1jb25maWcnO1xuaW1wb3J0IGNvbnZlcnREYXRlMldkYXkgZnJvbSAnLi4vZGF0ZS11dGlsLmpzJ1xuXG5cbmZ1bmN0aW9uIGVuaGFuY2VJY29uU2l6ZShpY29uVVJMKSB7XG4gIGxldCBiaWdnZXJJY29uVVJMID0gaWNvblVSTC5yZXBsYWNlKCc2NHg2NCcsICcxMjh4MTI4Jyk7XG4gIHJldHVybiBgaHR0cHM6JHtiaWdnZXJJY29uVVJMfWA7XG59XG5cblxuZnVuY3Rpb24gZ2V0V2VhdGhlclN0YXR1cyhkYXkpIHtcbiAgICBjb25zdCBzdGF0dXMgPSBkYXkuY29uZGl0aW9uLnRleHQ7XG4gICAgY29uc3QgaWNvbiA9IGVuaGFuY2VJY29uU2l6ZShkYXkuY29uZGl0aW9uLmljb24pO1xuICAgIGNvbnN0IHRlbXBDID0gKGRheS50ZW1wX2MpID8gZGF5LnRlbXBfYyA6IGRheS5hdmd0ZW1wX2M7XG4gICAgY29uc3QgdGVtcEYgPSAoZGF5LnRlbXBfZikgPyBkYXkudGVtcF9mIDogZGF5LmF2Z3RlbXBfZjtcblxuICAgIHJldHVybiB7IFxuICAgICAgc3RhdHVzLCBcbiAgICAgIGljb24sIFxuICAgICAgdGVtcDoge1xuICAgICAgICBjZWxzaXVzOiBgJHt0ZW1wQ33CsENgLFxuICAgICAgICBmYWhyZW5oZWl0OiBgJHt0ZW1wRn3CsEZgLFxuICAgICAgfSxcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIHBhcnNlUmVsZXZhbnRJbmZvKHdlYXRoZXJJbmZvKSB7XG4gIGxldCBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXJTdGF0dXMod2VhdGhlckluZm8uY3VycmVudCk7XG4gIGxldCB3ZWF0aGVyRm9yZWNhc3RzID0gd2VhdGhlckluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXkubWFwKChlYWNoRm9yZWNhc3REYXkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0ZTogZWFjaEZvcmVjYXN0RGF5LmRhdGUsXG4gICAgICB3ZWVrRGF5OiBjb252ZXJ0RGF0ZTJXZGF5KGVhY2hGb3JlY2FzdERheS5kYXRlKSxcbiAgICAgIC4uLmdldFdlYXRoZXJTdGF0dXMoZWFjaEZvcmVjYXN0RGF5LmRheSksXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgY3VycmVudFdlYXRoZXIsIHdlYXRoZXJGb3JlY2FzdHMgfTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBjYWxsV2VhdGhlckFQSShhcGlVUkwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGlVUkwpO1xuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBIVFRQIFJlc3BvbnNlJyk7XG4gICAgfVxuICAgIGNvbnN0IGpzb25PdXRwdXQgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uT3V0cHV0O1xuICB9IGNhdGNoICh7bWVzc2FnZX0pIHtcbiAgICBpZiAobWVzc2FnZSA9PT0gJ0JhZCBIVFRQIFJlc3BvbnNlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9YCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvciBvciBwZXJtaXNzaW9uIGlzc3VlJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVySW5mbyhjaXR5KSB7XG4gIGNvbnN0IHVybCA9IChcbiAgICBgaHR0cHM6Ly8ke2FwaURvbWFpbn0vJHthcGlFbmRwb2ludH0/a2V5PSR7YXBpS2V5fSZxPSR7Y2l0eX0mZGF5cz0zYFxuICApO1xuXG4gIHJldHVybiBjYWxsV2VhdGhlckFQSSh1cmwpLnRoZW4oKGpzb25PdXRwdXQpID0+IHtcbiAgICByZXR1cm4gcGFyc2VSZWxldmFudEluZm8oanNvbk91dHB1dCk7XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXJJbmZvO1xuIiwiY29uc3QgY29udmVydERhdGUyV2RheSA9IGZ1bmN0aW9uIGNvbnZlcnREYXRlMldkYXkoZGF0ZVN0cikge1xuICBjb25zdCB3ZGF5cyA9IFtcbiAgICAnU3VuJywgJ01vbicsICdUdWUnLCBcbiAgICAnV2VkJywgJ1RodXJzJywgJ0ZyaScsIFxuICAgICdTYXQnLFxuICBdO1xuXG4gIGNvbnN0IHdkYXlJZHggPSBuZXcgRGF0ZShkYXRlU3RyKS5nZXREYXkoKTtcbiAgcmV0dXJuIHdkYXlzW3dkYXlJZHhdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0RGF0ZTJXZGF5OyIsImZ1bmN0aW9uIHNldFdlYXRoZXJEYXRlKGRhdGVFbCwgZGF0ZUluZm8sIGlzVG9kYXkgPSBmYWxzZSkge1xuICBkYXRlRWwuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBkYXRlSW5mby5kYXRlO1xuICBkYXRlRWwuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGRhdGVJbmZvLmRhdGUpO1xuICBpZiAoaXNUb2RheSkge1xuICAgIGRhdGVJbmZvLndlZWtEYXkgPSBgVG9kYXkvJHtkYXRlSW5mby53ZWVrRGF5fWA7XG4gIH1cbiAgZGF0ZUVsLmNoaWxkcmVuWzJdLnRleHRDb250ZW50ID0gYCgke2RhdGVJbmZvLndlZWtEYXl9KWA7XG59XG5cblxuZnVuY3Rpb24gc2V0V2VhdGhlckluZm8od2VhdGhlckNhdGVnb3J5LCB3ZWF0aGVySW5mbykge1xuICBjb25zdCB3ZWF0aGVyU3RhdHVzID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXJlc3VsdC10ZXh0Jyk7XG4gIHdlYXRoZXJTdGF0dXMudGV4dENvbnRlbnQgPSB3ZWF0aGVySW5mby5zdGF0dXM7XG5cbiAgY29uc3Qgd2VhdGhlclN0YXR1c0ltZyA9IHdlYXRoZXJDYXRlZ29yeS5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1yZXN1bHQtaW1nJyk7XG4gIHdlYXRoZXJTdGF0dXNJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7d2VhdGhlckluZm8uaWNvbn1cIilgO1xuXG4gIGNvbnN0IHdlYXRoZXJUZW1wID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXRlbXBlcmF0dXJlJyk7XG4gIHdlYXRoZXJUZW1wLnRleHRDb250ZW50ID0gd2VhdGhlckluZm8udGVtcC5jZWxzaXVzO1xufVxuXG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRXZWF0aGVyKHdlYXRoZXJJbmZvKSB7XG4gIGNvbnN0IGNhdGVnb3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3VycmVudC13ZWF0aGVyJylbMF07XG4gIHNldFdlYXRoZXJJbmZvKGNhdGVnb3J5LCB3ZWF0aGVySW5mbyk7XG59XG5cblxuZnVuY3Rpb24gc2V0V2VhdGhlckZvcmVjYXN0cyhmb3JlY2FzdHMpIHtcbiAgY29uc3Qgd2VhdGhlckRhdGVzID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItZGF0ZScpXTtcbiAgY29uc3QgY2F0ZWdvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLXByZWRpY3Rpb24nKVswXTtcblxuICBBcnJheS5mcm9tKFxuICAgIGNhdGVnb3J5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItcmVzdWx0JyksXG4gICAgKGVhY2hSZXN1bHQsIGlkeCkgPT4ge1xuICAgICAgc2V0V2VhdGhlckRhdGUod2VhdGhlckRhdGVzW2lkeF0sIGZvcmVjYXN0c1tpZHhdLCAhaWR4KTtcbiAgICAgIHNldFdlYXRoZXJJbmZvKGVhY2hSZXN1bHQsIGZvcmVjYXN0c1tpZHhdKTtcbiAgICB9LFxuICApO1xufVxuXG5leHBvcnQge1xuICBzZXRDdXJyZW50V2VhdGhlcixcbiAgc2V0V2VhdGhlckZvcmVjYXN0cyxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2V0V2VhdGhlckluZm8gZnJvbSAnLi9hcGkvd2VhdGhlci1hcGknO1xuaW1wb3J0ICB7IHNldEN1cnJlbnRXZWF0aGVyLCBzZXRXZWF0aGVyRm9yZWNhc3RzIH0gZnJvbSAnLi93ZWF0aGVyLXV0aWwuanMnO1xuXG5cbmZ1bmN0aW9uIGRpc3BsYXlDaXR5TmFtZShjaXR5KSB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2l0eS1uYW1lJylbMF07XG4gIGNpdHlOYW1lLnRleHRDb250ZW50ID0gYCR7Y2l0eX0gQ2l0eSdzYDtcbn1cblxuXG5mdW5jdGlvbiBzZWFyY2hDaXR5V2VhdGhlcihjaXR5KSB7XG4gIGdldFdlYXRoZXJJbmZvKGNpdHkpLnRoZW4oKGluZm8pID0+IHtcbiAgICBkaXNwbGF5Q2l0eU5hbWUoY2l0eSk7XG4gICAgc2V0Q3VycmVudFdlYXRoZXIoaW5mby5jdXJyZW50V2VhdGhlcik7XG4gICAgc2V0V2VhdGhlckZvcmVjYXN0cyhpbmZvLndlYXRoZXJGb3JlY2FzdHMpO1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgXCIke2Vycm9yfVwiYCk7XG4gIH0pO1xufVxuXG5cbnNlYXJjaENpdHlXZWF0aGVyKCdOZXcgWW9yaycpO1xuXG5cbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlYXJjaC1iYXInKVswXTtcbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBjb25zdCBjaXR5ID0gZS5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKS52YWx1ZTtcbiAgc2VhcmNoQ2l0eVdlYXRoZXIoY2l0eSk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWlucHV0JylbMF07XG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgJiYgZS5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==