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

  return { 
            currentWeather, 
            weatherForecasts, 
            city: weatherInfo.location.name,
          };
}


async function callWeatherAPI(apiURL) {
  let res;
  try {
    res = await fetch(apiURL, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      throw new Error('Bad HTTP Response');
    }
    const jsonOutput = await res.json();
    return jsonOutput;
  } catch ({name, message}) {
    if (name === 'AbortError')  {
      throw new Error('Connection timeout');
    }

    if (message != 'Bad HTTP Response') {
      throw new Error('Network error or permission issue');
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType === "application/json") {
      const jsonBody = await res.json();
      throw new Error(jsonBody.error.message);
    }
    throw new Error(`${message}`);
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

/***/ "./src/components/component-controller.js":
/*!************************************************!*\
  !*** ./src/components/component-controller.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideLoadingComponent: () => (/* binding */ hideLoadingComponent),
/* harmony export */   showBodyComponent: () => (/* binding */ showBodyComponent),
/* harmony export */   showErrorComponent: () => (/* binding */ showErrorComponent),
/* harmony export */   showLoadingComponent: () => (/* binding */ showLoadingComponent)
/* harmony export */ });
const loadingEl = document.getElementsByClassName('loading-indicator')[0];
const errorText = document.getElementsByClassName('error-text')[0];
const bodySection = document.getElementsByClassName('body-section-layout')[0];


const showLoadingComponent = function showLoadingComponent() {
  hideErrorComponent();
  hideBodyComponent();
  loadingEl.classList.remove('display-none');
}


const hideLoadingComponent = function hideLoadingComponent() {
  loadingEl.classList.add('display-none');
}


const showErrorComponent = function showErrorComponent(msg) {
  hideLoadingComponent();
  hideBodyComponent();
  errorText.textContent = msg;
  errorText.classList.remove('display-none');
}


const hideErrorComponent = function hideErrorComponent() {
  errorText.classList.add('display-none');
}


const showBodyComponent = function showBodyComponent() {
  hideLoadingComponent();
  hideErrorComponent();
  bodySection.classList.remove('display-none');
}


const hideBodyComponent = function hideBodyComponent() {
  bodySection.classList.add('display-none');
}





/***/ }),

/***/ "./src/components/error-handler.js":
/*!*****************************************!*\
  !*** ./src/components/error-handler.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _component_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component-controller */ "./src/components/component-controller.js");


const displayErrorMsg = function displayErrorMsg(msg) {
  const errorMsg = msg.replaceAll('"', '').split('Error: ')[1];
  (0,_component_controller__WEBPACK_IMPORTED_MODULE_0__.showErrorComponent)(errorMsg);  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayErrorMsg);


/***/ }),

/***/ "./src/components/loading-handler.js":
/*!*******************************************!*\
  !*** ./src/components/loading-handler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startLoading: () => (/* binding */ startLoading),
/* harmony export */   stopLoading: () => (/* binding */ stopLoading)
/* harmony export */ });
/* harmony import */ var _component_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component-controller */ "./src/components/component-controller.js");



const startLoading = function startLoading() {
  (0,_component_controller__WEBPACK_IMPORTED_MODULE_0__.showLoadingComponent)();
};


const stopLoading = function stopLoading() {
  (0,_component_controller__WEBPACK_IMPORTED_MODULE_0__.hideLoadingComponent)();
  (0,_component_controller__WEBPACK_IMPORTED_MODULE_0__.showBodyComponent)();
}




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
/* harmony import */ var _weather_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weather-util */ "./src/weather-util.js");
/* harmony import */ var _components_loading_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/loading-handler */ "./src/components/loading-handler.js");
/* harmony import */ var _components_error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/error-handler */ "./src/components/error-handler.js");






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


function searchCityWeather(city, initalLoading = false) {
  (0,_components_loading_handler__WEBPACK_IMPORTED_MODULE_2__.startLoading)();
  (0,_api_weather_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city).then((info) => {
    if (!checkIfExactCity(city, info.city)) {
      throw new Error('No matching location found.');
    }
    (0,_components_loading_handler__WEBPACK_IMPORTED_MODULE_2__.stopLoading)();
    displayCityName(city);
    (0,_weather_util__WEBPACK_IMPORTED_MODULE_1__.setCurrentWeather)(info.currentWeather);
    (0,_weather_util__WEBPACK_IMPORTED_MODULE_1__.setWeatherForecasts)(info.weatherForecasts);
  }).catch((error) => {
    (0,_components_error_handler__WEBPACK_IMPORTED_MODULE_3__["default"])(`"${error}"`);
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TTtBQUM5QixHQUFHO0FBQ0g7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS9hcGktY29uZmlnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS93ZWF0aGVyLWFwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL2NvbXBvbmVudC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbXBvbmVudHMvZXJyb3ItaGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL2xvYWRpbmctaGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRlLXV0aWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci11dGlsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBpRG9tYWluID0gJ2FwaS53ZWF0aGVyYXBpLmNvbSc7XG5jb25zdCBhcGlFbmRwb2ludCA9ICd2MS9mb3JlY2FzdC5qc29uJztcbmNvbnN0IGFwaUtleSA9ICc0YzM1YzUyMTljNTA0ZWM1OGEzMTIwODA4MjQyOTAxJztcblxuZXhwb3J0IHtcbiAgYXBpRG9tYWluLFxuICBhcGlFbmRwb2ludCxcbiAgYXBpS2V5XG59OyIsImltcG9ydCB7YXBpRG9tYWluLCBhcGlFbmRwb2ludCwgYXBpS2V5fSBmcm9tICcuL2FwaS1jb25maWcnO1xuaW1wb3J0IGNvbnZlcnREYXRlMldkYXkgZnJvbSAnLi4vZGF0ZS11dGlsLmpzJ1xuXG5cbmZ1bmN0aW9uIGVuaGFuY2VJY29uU2l6ZShpY29uVVJMKSB7XG4gIGxldCBiaWdnZXJJY29uVVJMID0gaWNvblVSTC5yZXBsYWNlKCc2NHg2NCcsICcxMjh4MTI4Jyk7XG4gIHJldHVybiBgaHR0cHM6JHtiaWdnZXJJY29uVVJMfWA7XG59XG5cblxuZnVuY3Rpb24gZ2V0V2VhdGhlclN0YXR1cyhkYXkpIHtcbiAgICBjb25zdCBzdGF0dXMgPSBkYXkuY29uZGl0aW9uLnRleHQ7XG4gICAgY29uc3QgaWNvbiA9IGVuaGFuY2VJY29uU2l6ZShkYXkuY29uZGl0aW9uLmljb24pO1xuICAgIGNvbnN0IHRlbXBDID0gKGRheS50ZW1wX2MpID8gZGF5LnRlbXBfYyA6IGRheS5hdmd0ZW1wX2M7XG4gICAgY29uc3QgdGVtcEYgPSAoZGF5LnRlbXBfZikgPyBkYXkudGVtcF9mIDogZGF5LmF2Z3RlbXBfZjtcblxuICAgIHJldHVybiB7IFxuICAgICAgc3RhdHVzLCBcbiAgICAgIGljb24sIFxuICAgICAgdGVtcDoge1xuICAgICAgICBjZWxzaXVzOiBgJHt0ZW1wQ33CsENgLFxuICAgICAgICBmYWhyZW5oZWl0OiBgJHt0ZW1wRn3CsEZgLFxuICAgICAgfSxcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIHBhcnNlUmVsZXZhbnRJbmZvKHdlYXRoZXJJbmZvKSB7XG4gIGxldCBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXJTdGF0dXMod2VhdGhlckluZm8uY3VycmVudCk7XG4gIGxldCB3ZWF0aGVyRm9yZWNhc3RzID0gd2VhdGhlckluZm8uZm9yZWNhc3QuZm9yZWNhc3RkYXkubWFwKChlYWNoRm9yZWNhc3REYXkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0ZTogZWFjaEZvcmVjYXN0RGF5LmRhdGUsXG4gICAgICB3ZWVrRGF5OiBjb252ZXJ0RGF0ZTJXZGF5KGVhY2hGb3JlY2FzdERheS5kYXRlKSxcbiAgICAgIC4uLmdldFdlYXRoZXJTdGF0dXMoZWFjaEZvcmVjYXN0RGF5LmRheSksXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlciwgXG4gICAgICAgICAgICB3ZWF0aGVyRm9yZWNhc3RzLCBcbiAgICAgICAgICAgIGNpdHk6IHdlYXRoZXJJbmZvLmxvY2F0aW9uLm5hbWUsXG4gICAgICAgICAgfTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBjYWxsV2VhdGhlckFQSShhcGlVUkwpIHtcbiAgbGV0IHJlcztcbiAgdHJ5IHtcbiAgICByZXMgPSBhd2FpdCBmZXRjaChhcGlVUkwsIHsgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KDUwMDApIH0pO1xuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBIVFRQIFJlc3BvbnNlJyk7XG4gICAgfVxuICAgIGNvbnN0IGpzb25PdXRwdXQgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIHJldHVybiBqc29uT3V0cHV0O1xuICB9IGNhdGNoICh7bmFtZSwgbWVzc2FnZX0pIHtcbiAgICBpZiAobmFtZSA9PT0gJ0Fib3J0RXJyb3InKSAge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25uZWN0aW9uIHRpbWVvdXQnKTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZSAhPSAnQmFkIEhUVFAgUmVzcG9uc2UnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3Igb3IgcGVybWlzc2lvbiBpc3N1ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpO1xuICAgIGlmIChjb250ZW50VHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIHtcbiAgICAgIGNvbnN0IGpzb25Cb2R5ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihqc29uQm9keS5lcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9YCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVySW5mbyhjaXR5KSB7XG4gIGNvbnN0IHVybCA9IChcbiAgICBgaHR0cHM6Ly8ke2FwaURvbWFpbn0vJHthcGlFbmRwb2ludH0/a2V5PSR7YXBpS2V5fSZxPSR7Y2l0eX0mZGF5cz0zYFxuICApO1xuXG4gIHJldHVybiBjYWxsV2VhdGhlckFQSSh1cmwpLnRoZW4oKGpzb25PdXRwdXQpID0+IHtcbiAgICByZXR1cm4gcGFyc2VSZWxldmFudEluZm8oanNvbk91dHB1dCk7XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXJJbmZvO1xuIiwiY29uc3QgbG9hZGluZ0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbG9hZGluZy1pbmRpY2F0b3InKVswXTtcbmNvbnN0IGVycm9yVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Vycm9yLXRleHQnKVswXTtcbmNvbnN0IGJvZHlTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9keS1zZWN0aW9uLWxheW91dCcpWzBdO1xuXG5cbmNvbnN0IHNob3dMb2FkaW5nQ29tcG9uZW50ID0gZnVuY3Rpb24gc2hvd0xvYWRpbmdDb21wb25lbnQoKSB7XG4gIGhpZGVFcnJvckNvbXBvbmVudCgpO1xuICBoaWRlQm9keUNvbXBvbmVudCgpO1xuICBsb2FkaW5nRWwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuY29uc3QgaGlkZUxvYWRpbmdDb21wb25lbnQgPSBmdW5jdGlvbiBoaWRlTG9hZGluZ0NvbXBvbmVudCgpIHtcbiAgbG9hZGluZ0VsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5cbmNvbnN0IHNob3dFcnJvckNvbXBvbmVudCA9IGZ1bmN0aW9uIHNob3dFcnJvckNvbXBvbmVudChtc2cpIHtcbiAgaGlkZUxvYWRpbmdDb21wb25lbnQoKTtcbiAgaGlkZUJvZHlDb21wb25lbnQoKTtcbiAgZXJyb3JUZXh0LnRleHRDb250ZW50ID0gbXNnO1xuICBlcnJvclRleHQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuY29uc3QgaGlkZUVycm9yQ29tcG9uZW50ID0gZnVuY3Rpb24gaGlkZUVycm9yQ29tcG9uZW50KCkge1xuICBlcnJvclRleHQuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuY29uc3Qgc2hvd0JvZHlDb21wb25lbnQgPSBmdW5jdGlvbiBzaG93Qm9keUNvbXBvbmVudCgpIHtcbiAgaGlkZUxvYWRpbmdDb21wb25lbnQoKTtcbiAgaGlkZUVycm9yQ29tcG9uZW50KCk7XG4gIGJvZHlTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5cbmNvbnN0IGhpZGVCb2R5Q29tcG9uZW50ID0gZnVuY3Rpb24gaGlkZUJvZHlDb21wb25lbnQoKSB7XG4gIGJvZHlTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5cbmV4cG9ydCB7XG4gIHNob3dMb2FkaW5nQ29tcG9uZW50LCBcbiAgaGlkZUxvYWRpbmdDb21wb25lbnQsIFxuICBzaG93RXJyb3JDb21wb25lbnQsXG4gIHNob3dCb2R5Q29tcG9uZW50LFxufTtcbiIsImltcG9ydCB7IHNob3dFcnJvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50LWNvbnRyb2xsZXInO1xuXG5jb25zdCBkaXNwbGF5RXJyb3JNc2cgPSBmdW5jdGlvbiBkaXNwbGF5RXJyb3JNc2cobXNnKSB7XG4gIGNvbnN0IGVycm9yTXNnID0gbXNnLnJlcGxhY2VBbGwoJ1wiJywgJycpLnNwbGl0KCdFcnJvcjogJylbMV07XG4gIHNob3dFcnJvckNvbXBvbmVudChlcnJvck1zZyk7ICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUVycm9yTXNnO1xuIiwiaW1wb3J0IHsgc2hvd0xvYWRpbmdDb21wb25lbnQsIGhpZGVMb2FkaW5nQ29tcG9uZW50LCBzaG93Qm9keUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQtY29udHJvbGxlcic7XG5cblxuY29uc3Qgc3RhcnRMb2FkaW5nID0gZnVuY3Rpb24gc3RhcnRMb2FkaW5nKCkge1xuICBzaG93TG9hZGluZ0NvbXBvbmVudCgpO1xufTtcblxuXG5jb25zdCBzdG9wTG9hZGluZyA9IGZ1bmN0aW9uIHN0b3BMb2FkaW5nKCkge1xuICBoaWRlTG9hZGluZ0NvbXBvbmVudCgpO1xuICBzaG93Qm9keUNvbXBvbmVudCgpO1xufVxuXG5cbmV4cG9ydCB7XG4gIHN0YXJ0TG9hZGluZyxcbiAgc3RvcExvYWRpbmdcbn07IiwiY29uc3QgY29udmVydERhdGUyV2RheSA9IGZ1bmN0aW9uIGNvbnZlcnREYXRlMldkYXkoZGF0ZVN0cikge1xuICBjb25zdCB3ZGF5cyA9IFtcbiAgICAnU3VuJywgJ01vbicsICdUdWUnLCBcbiAgICAnV2VkJywgJ1RodXJzJywgJ0ZyaScsIFxuICAgICdTYXQnLFxuICBdO1xuXG4gIGNvbnN0IHdkYXlJZHggPSBuZXcgRGF0ZShkYXRlU3RyKS5nZXREYXkoKTtcbiAgcmV0dXJuIHdkYXlzW3dkYXlJZHhdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0RGF0ZTJXZGF5OyIsImZ1bmN0aW9uIHNldFdlYXRoZXJEYXRlKGRhdGVFbCwgZGF0ZUluZm8sIGlzVG9kYXkgPSBmYWxzZSkge1xuICBkYXRlRWwuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBkYXRlSW5mby5kYXRlO1xuICBkYXRlRWwuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGRhdGVJbmZvLmRhdGUpO1xuICBpZiAoaXNUb2RheSkge1xuICAgIGRhdGVJbmZvLndlZWtEYXkgPSBgVG9kYXkvJHtkYXRlSW5mby53ZWVrRGF5fWA7XG4gIH1cbiAgZGF0ZUVsLmNoaWxkcmVuWzJdLnRleHRDb250ZW50ID0gYCgke2RhdGVJbmZvLndlZWtEYXl9KWA7XG59XG5cblxuZnVuY3Rpb24gc2V0V2VhdGhlckluZm8od2VhdGhlckNhdGVnb3J5LCB3ZWF0aGVySW5mbykge1xuICBjb25zdCB3ZWF0aGVyU3RhdHVzID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXJlc3VsdC10ZXh0Jyk7XG4gIHdlYXRoZXJTdGF0dXMudGV4dENvbnRlbnQgPSB3ZWF0aGVySW5mby5zdGF0dXM7XG5cbiAgY29uc3Qgd2VhdGhlclN0YXR1c0ltZyA9IHdlYXRoZXJDYXRlZ29yeS5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1pY29uJyk7XG4gIHdlYXRoZXJTdGF0dXNJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7d2VhdGhlckluZm8uaWNvbn1cIilgO1xuXG4gIGNvbnN0IHdlYXRoZXJUZW1wID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXRlbXBlcmF0dXJlJyk7XG4gIHdlYXRoZXJUZW1wLnRleHRDb250ZW50ID0gd2VhdGhlckluZm8udGVtcC5jZWxzaXVzO1xufVxuXG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRXZWF0aGVyKHdlYXRoZXJJbmZvKSB7XG4gIGNvbnN0IGNhdGVnb3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3VycmVudC13ZWF0aGVyJylbMF07XG4gIHNldFdlYXRoZXJJbmZvKGNhdGVnb3J5LCB3ZWF0aGVySW5mbyk7XG59XG5cblxuZnVuY3Rpb24gc2V0V2VhdGhlckZvcmVjYXN0cyhmb3JlY2FzdHMpIHtcbiAgY29uc3Qgd2VhdGhlckRhdGVzID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItZGF0ZScpXTtcbiAgY29uc3QgY2F0ZWdvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLXByZWRpY3Rpb24nKVswXTtcblxuICBBcnJheS5mcm9tKFxuICAgIGNhdGVnb3J5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItY2FyZCcpLFxuICAgIChlYWNoUmVzdWx0LCBpZHgpID0+IHtcbiAgICAgIHNldFdlYXRoZXJEYXRlKHdlYXRoZXJEYXRlc1tpZHhdLCBmb3JlY2FzdHNbaWR4XSwgIWlkeCk7XG4gICAgICBzZXRXZWF0aGVySW5mbyhlYWNoUmVzdWx0LCBmb3JlY2FzdHNbaWR4XSk7XG4gICAgfSxcbiAgKTtcbn1cblxuZXhwb3J0IHtcbiAgc2V0Q3VycmVudFdlYXRoZXIsXG4gIHNldFdlYXRoZXJGb3JlY2FzdHMsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdldFdlYXRoZXJJbmZvIGZyb20gJy4vYXBpL3dlYXRoZXItYXBpJztcbmltcG9ydCAgeyBzZXRDdXJyZW50V2VhdGhlciwgc2V0V2VhdGhlckZvcmVjYXN0cyB9IGZyb20gJy4vd2VhdGhlci11dGlsJztcbmltcG9ydCB7IHN0YXJ0TG9hZGluZywgc3RvcExvYWRpbmcgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGluZy1oYW5kbGVyJztcbmltcG9ydCBkaXNwbGF5RXJyb3JNc2cgZnJvbSAnLi9jb21wb25lbnRzL2Vycm9yLWhhbmRsZXInO1xuXG5cbmNvbnN0IGNsZWFyU2VhcmNoRm9ybSA9IGZ1bmN0aW9uIGNsZWFyU2VhcmNoRm9ybSgpIHtcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbn1cblxuXG5mdW5jdGlvbiBkaXNwbGF5Q2l0eU5hbWUoY2l0eSkge1xuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NpdHktbmFtZScpWzBdO1xuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGNpdHk7XG59XG5cblxuY29uc3QgY2hlY2tJZkV4YWN0Q2l0eSA9IGZ1bmN0aW9uIGNoZWNrSWZFeGFjdENpdHkoZ2l2ZW5DaXR5LCByZXR1cm5lZENpdHkpIHtcbiAgcmV0dXJuIChcbiAgICBnaXZlbkNpdHkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IHJldHVybmVkQ2l0eS50cmltKCkudG9Mb3dlckNhc2UoKVxuICApO1xufTtcblxuXG5mdW5jdGlvbiBzZWFyY2hDaXR5V2VhdGhlcihjaXR5LCBpbml0YWxMb2FkaW5nID0gZmFsc2UpIHtcbiAgc3RhcnRMb2FkaW5nKCk7XG4gIGdldFdlYXRoZXJJbmZvKGNpdHkpLnRoZW4oKGluZm8pID0+IHtcbiAgICBpZiAoIWNoZWNrSWZFeGFjdENpdHkoY2l0eSwgaW5mby5jaXR5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyBsb2NhdGlvbiBmb3VuZC4nKTtcbiAgICB9XG4gICAgc3RvcExvYWRpbmcoKTtcbiAgICBkaXNwbGF5Q2l0eU5hbWUoY2l0eSk7XG4gICAgc2V0Q3VycmVudFdlYXRoZXIoaW5mby5jdXJyZW50V2VhdGhlcik7XG4gICAgc2V0V2VhdGhlckZvcmVjYXN0cyhpbmZvLndlYXRoZXJGb3JlY2FzdHMpO1xuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBkaXNwbGF5RXJyb3JNc2coYFwiJHtlcnJvcn1cImApO1xuICB9KTtcbn1cblxuXG5zZWFyY2hDaXR5V2VhdGhlcignTmV3IFlvcmsnKTtcblxuXG5jb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWFyY2gtYmFyJylbMF07XG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgY29uc3QgY2l0eSA9IGUuY3VycmVudFRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0JykudmFsdWU7XG4gIHNlYXJjaENpdHlXZWF0aGVyKGNpdHkpO1xuICBjbGVhclNlYXJjaEZvcm0oKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWFyY2gtaW5wdXQnKVswXTtcbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiBlLmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9