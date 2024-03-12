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

/***/ "./src/loading-component.js":
/*!**********************************!*\
  !*** ./src/loading-component.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startLoading: () => (/* binding */ startLoading),
/* harmony export */   stopLoading: () => (/* binding */ stopLoading)
/* harmony export */ });
const loadingEl = document.getElementsByClassName('loading-indicator')[0];
const bodySection = document.getElementsByClassName('body-section-layout')[0];


const startLoading = function startLoading() {
  loadingEl.classList.remove('display-none');
  bodySection.classList.add('display-none');
};


const stopLoading = function stopLoading() {
  loadingEl.classList.add('display-none');
  bodySection.classList.remove('display-none');
}




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
/* harmony import */ var _loading_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loading-component.js */ "./src/loading-component.js");





function displayCityName(city) {
  const cityName = document.getElementsByClassName('city-name')[0];
  cityName.textContent = city;
}


function searchCityWeather(city) {
  (0,_loading_component_js__WEBPACK_IMPORTED_MODULE_2__.startLoading)();
  (0,_api_weather_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city).then((info) => {
    (0,_loading_component_js__WEBPACK_IMPORTED_MODULE_2__.stopLoading)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGNEQ7QUFDZDs7O0FBRzlDO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNO0FBQzFCLHVCQUF1QixNQUFNO0FBQzdCLE9BQU87QUFDUDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5REFBZ0I7QUFDL0I7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVztBQUNYOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxRQUFRLFFBQVE7QUFDcEI7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGVBQWUsa0RBQVMsQ0FBQyxHQUFHLG9EQUFXLENBQUMsT0FBTywrQ0FBTSxDQUFDLEtBQUssS0FBSztBQUNoRTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7OztBQ1gvQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGlCQUFpQjtBQUNqRDtBQUNBLHVDQUF1QyxpQkFBaUI7QUFDeEQ7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxpQkFBaUI7O0FBRXBFO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7O1VDdkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04rQztBQUM2QjtBQUNUOzs7QUFHbkU7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsRUFBRSxtRUFBWTtBQUNkLEVBQUUsNERBQWM7QUFDaEIsSUFBSSxrRUFBVztBQUNmO0FBQ0EsSUFBSSxtRUFBaUI7QUFDckIsSUFBSSxxRUFBbUI7QUFDdkIsR0FBRztBQUNILG9CQUFvQixNQUFNO0FBQzFCLEdBQUc7QUFDSDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS9hcGktY29uZmlnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS93ZWF0aGVyLWFwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRlLXV0aWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9hZGluZy1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci11dGlsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBpRG9tYWluID0gJ2FwaS53ZWF0aGVyYXBpLmNvbSc7XG5jb25zdCBhcGlFbmRwb2ludCA9ICd2MS9mb3JlY2FzdC5qc29uJztcbmNvbnN0IGFwaUtleSA9ICc0YzM1YzUyMTljNTA0ZWM1OGEzMTIwODA4MjQyOTAxJztcblxuZXhwb3J0IHtcbiAgYXBpRG9tYWluLFxuICBhcGlFbmRwb2ludCxcbiAgYXBpS2V5XG59OyIsImltcG9ydCB7YXBpRG9tYWluLCBhcGlFbmRwb2ludCwgYXBpS2V5fSBmcm9tICcuL2FwaS1jb25maWcnO1xuaW1wb3J0IGNvbnZlcnREYXRlMldkYXkgZnJvbSAnLi4vZGF0ZS11dGlsLmpzJ1xuXG5cbmZ1bmN0aW9uIGVuaGFuY2VJY29uU2l6ZShpY29uVVJMKSB7XG4gIGxldCBiaWdnZXJJY29uVVJMID0gaWNvblVSTC5yZXBsYWNlKCc2NHg2NCcsICcxMjh4MTI4Jyk7XG4gIHJldHVybiBgaHR0cHM6JHtiaWdnZXJJY29uVVJMfWA7XG59XG5cblxuZnVuY3Rpb24gZ2V0V2VhdGhlclN0YXR1cyhkYXkpIHtcbiAgICBjb25zdCBzdGF0dXMgPSBkYXkuY29uZGl0aW9uLnRleHQ7XG4gICAgY29uc3QgaWNvbiA9IGVuaGFuY2VJY29uU2l6ZShkYXkuY29uZGl0aW9uLmljb24pO1xuICAgIGNvbnN0IHRlbXBDID0gKGRheS50ZW1wX2MpID8gZGF5LnRlbXBfYyA6IGRheS5hdmd0ZW1wX2M7XG4gICAgY29uc3QgdGVtcEYgPSAoZGF5LnRlbXBfZikgPyBkYXkudGVtcF9mIDogZGF5LmF2Z3RlbXBfZjtcblxuICAgIHJldHVybiB7IFxuICAgICAgc3RhdHVzLCBcbiAgICAgIGljb24sIFxuICAgICAgdGVtcDoge1xuICAgICAgICBjZWxzaXVzOiBgJHt0ZW1wQ33CsENgLFxuICAgICAgICBmYWhyZW5oZWl0OiBgJHt0ZW1wRn3CsEZgLFxuICAgICAgfSxcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIHBhcnNlUmVsZXZhbnRJbmZvKHdlYXRoZXJJbmZvKSB7XG4gIGxldCBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXJTdGF0dXMod2VhdGhlckluZm8uY3VycmVudCk7XG4gIGxldCB3ZWF0aGVyRm9yZWNhc3RzID0gd2VhdGhlckluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXkubWFwKChlYWNoRm9yZWNhc3REYXkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0ZTogZWFjaEZvcmVjYXN0RGF5LmRhdGUsXG4gICAgICB3ZWVrRGF5OiBjb252ZXJ0RGF0ZTJXZGF5KGVhY2hGb3JlY2FzdERheS5kYXRlKSxcbiAgICAgIC4uLmdldFdlYXRoZXJTdGF0dXMoZWFjaEZvcmVjYXN0RGF5LmRheSksXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgY3VycmVudFdlYXRoZXIsIHdlYXRoZXJGb3JlY2FzdHMgfTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBjYWxsV2VhdGhlckFQSShhcGlVUkwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGlVUkwpO1xuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBIVFRQIFJlc3BvbnNlJyk7XG4gICAgfVxuICAgIGNvbnN0IGpzb25PdXRwdXQgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uT3V0cHV0O1xuICB9IGNhdGNoICh7bWVzc2FnZX0pIHtcbiAgICBpZiAobWVzc2FnZSA9PT0gJ0JhZCBIVFRQIFJlc3BvbnNlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9YCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvciBvciBwZXJtaXNzaW9uIGlzc3VlJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVySW5mbyhjaXR5KSB7XG4gIGNvbnN0IHVybCA9IChcbiAgICBgaHR0cHM6Ly8ke2FwaURvbWFpbn0vJHthcGlFbmRwb2ludH0/a2V5PSR7YXBpS2V5fSZxPSR7Y2l0eX0mZGF5cz0zYFxuICApO1xuXG4gIHJldHVybiBjYWxsV2VhdGhlckFQSSh1cmwpLnRoZW4oKGpzb25PdXRwdXQpID0+IHtcbiAgICByZXR1cm4gcGFyc2VSZWxldmFudEluZm8oanNvbk91dHB1dCk7XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXJJbmZvO1xuIiwiY29uc3QgY29udmVydERhdGUyV2RheSA9IGZ1bmN0aW9uIGNvbnZlcnREYXRlMldkYXkoZGF0ZVN0cikge1xuICBjb25zdCB3ZGF5cyA9IFtcbiAgICAnU3VuJywgJ01vbicsICdUdWUnLCBcbiAgICAnV2VkJywgJ1RodXJzJywgJ0ZyaScsIFxuICAgICdTYXQnLFxuICBdO1xuXG4gIGNvbnN0IHdkYXlJZHggPSBuZXcgRGF0ZShkYXRlU3RyKS5nZXREYXkoKTtcbiAgcmV0dXJuIHdkYXlzW3dkYXlJZHhdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0RGF0ZTJXZGF5OyIsImNvbnN0IGxvYWRpbmdFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xvYWRpbmctaW5kaWNhdG9yJylbMF07XG5jb25zdCBib2R5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvZHktc2VjdGlvbi1sYXlvdXQnKVswXTtcblxuXG5jb25zdCBzdGFydExvYWRpbmcgPSBmdW5jdGlvbiBzdGFydExvYWRpbmcoKSB7XG4gIGxvYWRpbmdFbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbiAgYm9keVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG59O1xuXG5cbmNvbnN0IHN0b3BMb2FkaW5nID0gZnVuY3Rpb24gc3RvcExvYWRpbmcoKSB7XG4gIGxvYWRpbmdFbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LW5vbmUnKTtcbiAgYm9keVNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuZXhwb3J0IHtcbiAgc3RhcnRMb2FkaW5nLFxuICBzdG9wTG9hZGluZ1xufTsiLCJmdW5jdGlvbiBzZXRXZWF0aGVyRGF0ZShkYXRlRWwsIGRhdGVJbmZvLCBpc1RvZGF5ID0gZmFsc2UpIHtcbiAgZGF0ZUVsLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID0gZGF0ZUluZm8uZGF0ZTtcbiAgZGF0ZUVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0ZXRpbWUnLCBkYXRlSW5mby5kYXRlKTtcbiAgaWYgKGlzVG9kYXkpIHtcbiAgICBkYXRlSW5mby53ZWVrRGF5ID0gYFRvZGF5LyR7ZGF0ZUluZm8ud2Vla0RheX1gO1xuICB9XG4gIGRhdGVFbC5jaGlsZHJlblsyXS50ZXh0Q29udGVudCA9IGAoJHtkYXRlSW5mby53ZWVrRGF5fSlgO1xufVxuXG5cbmZ1bmN0aW9uIHNldFdlYXRoZXJJbmZvKHdlYXRoZXJDYXRlZ29yeSwgd2VhdGhlckluZm8pIHtcbiAgY29uc3Qgd2VhdGhlclN0YXR1cyA9IHdlYXRoZXJDYXRlZ29yeS5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1yZXN1bHQtdGV4dCcpO1xuICB3ZWF0aGVyU3RhdHVzLnRleHRDb250ZW50ID0gd2VhdGhlckluZm8uc3RhdHVzO1xuXG4gIGNvbnN0IHdlYXRoZXJTdGF0dXNJbWcgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItaWNvbicpO1xuICB3ZWF0aGVyU3RhdHVzSW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke3dlYXRoZXJJbmZvLmljb259XCIpYDtcblxuICBjb25zdCB3ZWF0aGVyVGVtcCA9IHdlYXRoZXJDYXRlZ29yeS5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci10ZW1wZXJhdHVyZScpO1xuICB3ZWF0aGVyVGVtcC50ZXh0Q29udGVudCA9IHdlYXRoZXJJbmZvLnRlbXAuY2Vsc2l1cztcbn1cblxuXG5mdW5jdGlvbiBzZXRDdXJyZW50V2VhdGhlcih3ZWF0aGVySW5mbykge1xuICBjb25zdCBjYXRlZ29yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2N1cnJlbnQtd2VhdGhlcicpWzBdO1xuICBzZXRXZWF0aGVySW5mbyhjYXRlZ29yeSwgd2VhdGhlckluZm8pO1xufVxuXG5cbmZ1bmN0aW9uIHNldFdlYXRoZXJGb3JlY2FzdHMoZm9yZWNhc3RzKSB7XG4gIGNvbnN0IHdlYXRoZXJEYXRlcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWRhdGUnKV07XG4gIGNvbnN0IGNhdGVnb3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1wcmVkaWN0aW9uJylbMF07XG5cbiAgQXJyYXkuZnJvbShcbiAgICBjYXRlZ29yeS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWNhcmQnKSxcbiAgICAoZWFjaFJlc3VsdCwgaWR4KSA9PiB7XG4gICAgICBzZXRXZWF0aGVyRGF0ZSh3ZWF0aGVyRGF0ZXNbaWR4XSwgZm9yZWNhc3RzW2lkeF0sICFpZHgpO1xuICAgICAgc2V0V2VhdGhlckluZm8oZWFjaFJlc3VsdCwgZm9yZWNhc3RzW2lkeF0pO1xuICAgIH0sXG4gICk7XG59XG5cbmV4cG9ydCB7XG4gIHNldEN1cnJlbnRXZWF0aGVyLFxuICBzZXRXZWF0aGVyRm9yZWNhc3RzLFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnZXRXZWF0aGVySW5mbyBmcm9tICcuL2FwaS93ZWF0aGVyLWFwaSc7XG5pbXBvcnQgIHsgc2V0Q3VycmVudFdlYXRoZXIsIHNldFdlYXRoZXJGb3JlY2FzdHMgfSBmcm9tICcuL3dlYXRoZXItdXRpbC5qcyc7XG5pbXBvcnQgeyBzdGFydExvYWRpbmcsIHN0b3BMb2FkaW5nIH0gZnJvbSAnLi9sb2FkaW5nLWNvbXBvbmVudC5qcyc7XG5cblxuZnVuY3Rpb24gZGlzcGxheUNpdHlOYW1lKGNpdHkpIHtcbiAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjaXR5LW5hbWUnKVswXTtcbiAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBjaXR5O1xufVxuXG5cbmZ1bmN0aW9uIHNlYXJjaENpdHlXZWF0aGVyKGNpdHkpIHtcbiAgc3RhcnRMb2FkaW5nKCk7XG4gIGdldFdlYXRoZXJJbmZvKGNpdHkpLnRoZW4oKGluZm8pID0+IHtcbiAgICBzdG9wTG9hZGluZygpO1xuICAgIGRpc3BsYXlDaXR5TmFtZShjaXR5KTtcbiAgICBzZXRDdXJyZW50V2VhdGhlcihpbmZvLmN1cnJlbnRXZWF0aGVyKTtcbiAgICBzZXRXZWF0aGVyRm9yZWNhc3RzKGluZm8ud2VhdGhlckZvcmVjYXN0cyk7XG4gIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBcIiR7ZXJyb3J9XCJgKTtcbiAgfSk7XG59XG5cblxuc2VhcmNoQ2l0eVdlYXRoZXIoJ05ldyBZb3JrJyk7XG5cblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWJhcicpWzBdO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBlLmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpLnZhbHVlO1xuICBzZWFyY2hDaXR5V2VhdGhlcihjaXR5KTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWFyY2gtaW5wdXQnKVswXTtcbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiBlLmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9