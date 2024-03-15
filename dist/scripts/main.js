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


function searchCityWeather(city) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzlCLEdBQUc7QUFDSDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpL2FwaS1jb25maWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpL3dlYXRoZXItYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbXBvbmVudHMvY29tcG9uZW50LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29tcG9uZW50cy9lcnJvci1oYW5kbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbXBvbmVudHMvbG9hZGluZy1oYW5kbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGUtdXRpbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyLXV0aWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcGlEb21haW4gPSAnYXBpLndlYXRoZXJhcGkuY29tJztcbmNvbnN0IGFwaUVuZHBvaW50ID0gJ3YxL2ZvcmVjYXN0Lmpzb24nO1xuY29uc3QgYXBpS2V5ID0gJzRjMzVjNTIxOWM1MDRlYzU4YTMxMjA4MDgyNDI5MDEnO1xuXG5leHBvcnQge1xuICBhcGlEb21haW4sXG4gIGFwaUVuZHBvaW50LFxuICBhcGlLZXlcbn07IiwiaW1wb3J0IHthcGlEb21haW4sIGFwaUVuZHBvaW50LCBhcGlLZXl9IGZyb20gJy4vYXBpLWNvbmZpZyc7XG5pbXBvcnQgY29udmVydERhdGUyV2RheSBmcm9tICcuLi9kYXRlLXV0aWwuanMnXG5cblxuZnVuY3Rpb24gZW5oYW5jZUljb25TaXplKGljb25VUkwpIHtcbiAgbGV0IGJpZ2dlckljb25VUkwgPSBpY29uVVJMLnJlcGxhY2UoJzY0eDY0JywgJzEyOHgxMjgnKTtcbiAgcmV0dXJuIGBodHRwczoke2JpZ2dlckljb25VUkx9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyU3RhdHVzKGRheSkge1xuICAgIGNvbnN0IHN0YXR1cyA9IGRheS5jb25kaXRpb24udGV4dDtcbiAgICBjb25zdCBpY29uID0gZW5oYW5jZUljb25TaXplKGRheS5jb25kaXRpb24uaWNvbik7XG4gICAgY29uc3QgdGVtcEMgPSAoZGF5LnRlbXBfYykgPyBkYXkudGVtcF9jIDogZGF5LmF2Z3RlbXBfYztcbiAgICBjb25zdCB0ZW1wRiA9IChkYXkudGVtcF9mKSA/IGRheS50ZW1wX2YgOiBkYXkuYXZndGVtcF9mO1xuXG4gICAgcmV0dXJuIHsgXG4gICAgICBzdGF0dXMsIFxuICAgICAgaWNvbiwgXG4gICAgICB0ZW1wOiB7XG4gICAgICAgIGNlbHNpdXM6IGAke3RlbXBDfcKwQ2AsXG4gICAgICAgIGZhaHJlbmhlaXQ6IGAke3RlbXBGfcKwRmAsXG4gICAgICB9LFxuICAgIH07XG59XG5cblxuZnVuY3Rpb24gcGFyc2VSZWxldmFudEluZm8od2VhdGhlckluZm8pIHtcbiAgbGV0IGN1cnJlbnRXZWF0aGVyID0gZ2V0V2VhdGhlclN0YXR1cyh3ZWF0aGVySW5mby5jdXJyZW50KTtcbiAgbGV0IHdlYXRoZXJGb3JlY2FzdHMgPSB3ZWF0aGVySW5mby5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAoKGVhY2hGb3JlY2FzdERheSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRlOiBlYWNoRm9yZWNhc3REYXkuZGF0ZSxcbiAgICAgIHdlZWtEYXk6IGNvbnZlcnREYXRlMldkYXkoZWFjaEZvcmVjYXN0RGF5LmRhdGUpLFxuICAgICAgLi4uZ2V0V2VhdGhlclN0YXR1cyhlYWNoRm9yZWNhc3REYXkuZGF5KSxcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4geyBcbiAgICAgICAgICAgIGN1cnJlbnRXZWF0aGVyLCBcbiAgICAgICAgICAgIHdlYXRoZXJGb3JlY2FzdHMsIFxuICAgICAgICAgICAgY2l0eTogd2VhdGhlckluZm8ubG9jYXRpb24ubmFtZSxcbiAgICAgICAgICB9O1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxXZWF0aGVyQVBJKGFwaVVSTCkge1xuICBsZXQgcmVzO1xuICB0cnkge1xuICAgIHJlcyA9IGF3YWl0IGZldGNoKGFwaVVSTCwgeyBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQoNTAwMCkgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIEhUVFAgUmVzcG9uc2UnKTtcbiAgICB9XG4gICAgY29uc3QganNvbk91dHB1dCA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25PdXRwdXQ7XG4gIH0gY2F0Y2ggKHtuYW1lLCBtZXNzYWdlfSkge1xuICAgIGlmIChuYW1lID09PSAnQWJvcnRFcnJvcicpICB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gdGltZW91dCcpO1xuICAgIH1cblxuICAgIGlmIChtZXNzYWdlICE9ICdCYWQgSFRUUCBSZXNwb25zZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvciBvciBwZXJtaXNzaW9uIGlzc3VlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudFR5cGUgPSByZXMuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL2pzb25cIikge1xuICAgICAgY29uc3QganNvbkJvZHkgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb25Cb2R5LmVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bWVzc2FnZX1gKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFdlYXRoZXJJbmZvKGNpdHkpIHtcbiAgY29uc3QgdXJsID0gKFxuICAgIGBodHRwczovLyR7YXBpRG9tYWlufS8ke2FwaUVuZHBvaW50fT9rZXk9JHthcGlLZXl9JnE9JHtjaXR5fSZkYXlzPTNgXG4gICk7XG5cbiAgcmV0dXJuIGNhbGxXZWF0aGVyQVBJKHVybCkudGhlbigoanNvbk91dHB1dCkgPT4ge1xuICAgIHJldHVybiBwYXJzZVJlbGV2YW50SW5mbyhqc29uT3V0cHV0KTtcbiAgfSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZ2V0V2VhdGhlckluZm87XG4iLCJjb25zdCBsb2FkaW5nRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsb2FkaW5nLWluZGljYXRvcicpWzBdO1xuY29uc3QgZXJyb3JUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZXJyb3ItdGV4dCcpWzBdO1xuY29uc3QgYm9keVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdib2R5LXNlY3Rpb24tbGF5b3V0JylbMF07XG5cblxuY29uc3Qgc2hvd0xvYWRpbmdDb21wb25lbnQgPSBmdW5jdGlvbiBzaG93TG9hZGluZ0NvbXBvbmVudCgpIHtcbiAgaGlkZUVycm9yQ29tcG9uZW50KCk7XG4gIGhpZGVCb2R5Q29tcG9uZW50KCk7XG4gIGxvYWRpbmdFbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuXG5jb25zdCBoaWRlTG9hZGluZ0NvbXBvbmVudCA9IGZ1bmN0aW9uIGhpZGVMb2FkaW5nQ29tcG9uZW50KCkge1xuICBsb2FkaW5nRWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuY29uc3Qgc2hvd0Vycm9yQ29tcG9uZW50ID0gZnVuY3Rpb24gc2hvd0Vycm9yQ29tcG9uZW50KG1zZykge1xuICBoaWRlTG9hZGluZ0NvbXBvbmVudCgpO1xuICBoaWRlQm9keUNvbXBvbmVudCgpO1xuICBlcnJvclRleHQudGV4dENvbnRlbnQgPSBtc2c7XG4gIGVycm9yVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuXG5jb25zdCBoaWRlRXJyb3JDb21wb25lbnQgPSBmdW5jdGlvbiBoaWRlRXJyb3JDb21wb25lbnQoKSB7XG4gIGVycm9yVGV4dC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuXG5jb25zdCBzaG93Qm9keUNvbXBvbmVudCA9IGZ1bmN0aW9uIHNob3dCb2R5Q29tcG9uZW50KCkge1xuICBoaWRlTG9hZGluZ0NvbXBvbmVudCgpO1xuICBoaWRlRXJyb3JDb21wb25lbnQoKTtcbiAgYm9keVNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuY29uc3QgaGlkZUJvZHlDb21wb25lbnQgPSBmdW5jdGlvbiBoaWRlQm9keUNvbXBvbmVudCgpIHtcbiAgYm9keVNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG59XG5cblxuZXhwb3J0IHtcbiAgc2hvd0xvYWRpbmdDb21wb25lbnQsIFxuICBoaWRlTG9hZGluZ0NvbXBvbmVudCwgXG4gIHNob3dFcnJvckNvbXBvbmVudCxcbiAgc2hvd0JvZHlDb21wb25lbnQsXG59O1xuIiwiaW1wb3J0IHsgc2hvd0Vycm9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQtY29udHJvbGxlcic7XG5cbmNvbnN0IGRpc3BsYXlFcnJvck1zZyA9IGZ1bmN0aW9uIGRpc3BsYXlFcnJvck1zZyhtc2cpIHtcbiAgY29uc3QgZXJyb3JNc2cgPSBtc2cucmVwbGFjZUFsbCgnXCInLCAnJykuc3BsaXQoJ0Vycm9yOiAnKVsxXTtcbiAgc2hvd0Vycm9yQ29tcG9uZW50KGVycm9yTXNnKTsgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5RXJyb3JNc2c7XG4iLCJpbXBvcnQgeyBzaG93TG9hZGluZ0NvbXBvbmVudCwgaGlkZUxvYWRpbmdDb21wb25lbnQsIHNob3dCb2R5Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC1jb250cm9sbGVyJztcblxuXG5jb25zdCBzdGFydExvYWRpbmcgPSBmdW5jdGlvbiBzdGFydExvYWRpbmcoKSB7XG4gIHNob3dMb2FkaW5nQ29tcG9uZW50KCk7XG59O1xuXG5cbmNvbnN0IHN0b3BMb2FkaW5nID0gZnVuY3Rpb24gc3RvcExvYWRpbmcoKSB7XG4gIGhpZGVMb2FkaW5nQ29tcG9uZW50KCk7XG4gIHNob3dCb2R5Q29tcG9uZW50KCk7XG59XG5cblxuZXhwb3J0IHtcbiAgc3RhcnRMb2FkaW5nLFxuICBzdG9wTG9hZGluZ1xufTsiLCJjb25zdCBjb252ZXJ0RGF0ZTJXZGF5ID0gZnVuY3Rpb24gY29udmVydERhdGUyV2RheShkYXRlU3RyKSB7XG4gIGNvbnN0IHdkYXlzID0gW1xuICAgICdTdW4nLCAnTW9uJywgJ1R1ZScsIFxuICAgICdXZWQnLCAnVGh1cnMnLCAnRnJpJywgXG4gICAgJ1NhdCcsXG4gIF07XG5cbiAgY29uc3Qgd2RheUlkeCA9IG5ldyBEYXRlKGRhdGVTdHIpLmdldERheSgpO1xuICByZXR1cm4gd2RheXNbd2RheUlkeF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnREYXRlMldkYXk7IiwiZnVuY3Rpb24gc2V0V2VhdGhlckRhdGUoZGF0ZUVsLCBkYXRlSW5mbywgaXNUb2RheSA9IGZhbHNlKSB7XG4gIGRhdGVFbC5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IGRhdGVJbmZvLmRhdGU7XG4gIGRhdGVFbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgZGF0ZUluZm8uZGF0ZSk7XG4gIGlmIChpc1RvZGF5KSB7XG4gICAgZGF0ZUluZm8ud2Vla0RheSA9IGBUb2RheS8ke2RhdGVJbmZvLndlZWtEYXl9YDtcbiAgfVxuICBkYXRlRWwuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQgPSBgKCR7ZGF0ZUluZm8ud2Vla0RheX0pYDtcbn1cblxuXG5mdW5jdGlvbiBzZXRXZWF0aGVySW5mbyh3ZWF0aGVyQ2F0ZWdvcnksIHdlYXRoZXJJbmZvKSB7XG4gIGNvbnN0IHdlYXRoZXJTdGF0dXMgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItcmVzdWx0LXRleHQnKTtcbiAgd2VhdGhlclN0YXR1cy50ZXh0Q29udGVudCA9IHdlYXRoZXJJbmZvLnN0YXR1cztcblxuICBjb25zdCB3ZWF0aGVyU3RhdHVzSW1nID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24nKTtcbiAgd2VhdGhlclN0YXR1c0ltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHt3ZWF0aGVySW5mby5pY29ufVwiKWA7XG5cbiAgY29uc3Qgd2VhdGhlclRlbXAgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItdGVtcGVyYXR1cmUnKTtcbiAgd2VhdGhlclRlbXAudGV4dENvbnRlbnQgPSB3ZWF0aGVySW5mby50ZW1wLmNlbHNpdXM7XG59XG5cblxuZnVuY3Rpb24gc2V0Q3VycmVudFdlYXRoZXIod2VhdGhlckluZm8pIHtcbiAgY29uc3QgY2F0ZWdvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXJyZW50LXdlYXRoZXInKVswXTtcbiAgc2V0V2VhdGhlckluZm8oY2F0ZWdvcnksIHdlYXRoZXJJbmZvKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRXZWF0aGVyRm9yZWNhc3RzKGZvcmVjYXN0cykge1xuICBjb25zdCB3ZWF0aGVyRGF0ZXMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1kYXRlJyldO1xuICBjb25zdCBjYXRlZ29yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItcHJlZGljdGlvbicpWzBdO1xuXG4gIEFycmF5LmZyb20oXG4gICAgY2F0ZWdvcnkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1jYXJkJyksXG4gICAgKGVhY2hSZXN1bHQsIGlkeCkgPT4ge1xuICAgICAgc2V0V2VhdGhlckRhdGUod2VhdGhlckRhdGVzW2lkeF0sIGZvcmVjYXN0c1tpZHhdLCAhaWR4KTtcbiAgICAgIHNldFdlYXRoZXJJbmZvKGVhY2hSZXN1bHQsIGZvcmVjYXN0c1tpZHhdKTtcbiAgICB9LFxuICApO1xufVxuXG5leHBvcnQge1xuICBzZXRDdXJyZW50V2VhdGhlcixcbiAgc2V0V2VhdGhlckZvcmVjYXN0cyxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2V0V2VhdGhlckluZm8gZnJvbSAnLi9hcGkvd2VhdGhlci1hcGknO1xuaW1wb3J0ICB7IHNldEN1cnJlbnRXZWF0aGVyLCBzZXRXZWF0aGVyRm9yZWNhc3RzIH0gZnJvbSAnLi93ZWF0aGVyLXV0aWwnO1xuaW1wb3J0IHsgc3RhcnRMb2FkaW5nLCBzdG9wTG9hZGluZyB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkaW5nLWhhbmRsZXInO1xuaW1wb3J0IGRpc3BsYXlFcnJvck1zZyBmcm9tICcuL2NvbXBvbmVudHMvZXJyb3ItaGFuZGxlcic7XG5cblxuY29uc3QgY2xlYXJTZWFyY2hGb3JtID0gZnVuY3Rpb24gY2xlYXJTZWFyY2hGb3JtKCkge1xuICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xufVxuXG5cbmZ1bmN0aW9uIGRpc3BsYXlDaXR5TmFtZShjaXR5KSB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2l0eS1uYW1lJylbMF07XG4gIGNpdHlOYW1lLnRleHRDb250ZW50ID0gY2l0eTtcbn1cblxuY29uc3QgY2hlY2tJZkV4YWN0Q2l0eSA9IGZ1bmN0aW9uIGNoZWNrSWZFeGFjdENpdHkoZ2l2ZW5DaXR5LCByZXR1cm5lZENpdHkpIHtcbiAgcmV0dXJuIChcbiAgICBnaXZlbkNpdHkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IHJldHVybmVkQ2l0eS50cmltKCkudG9Mb3dlckNhc2UoKVxuICApO1xufTtcblxuXG5mdW5jdGlvbiBzZWFyY2hDaXR5V2VhdGhlcihjaXR5KSB7XG4gIHN0YXJ0TG9hZGluZygpO1xuICBnZXRXZWF0aGVySW5mbyhjaXR5KS50aGVuKChpbmZvKSA9PiB7XG4gICAgaWYgKCFjaGVja0lmRXhhY3RDaXR5KGNpdHksIGluZm8uY2l0eSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgbG9jYXRpb24gZm91bmQuJyk7XG4gICAgfVxuICAgIHN0b3BMb2FkaW5nKCk7XG4gICAgZGlzcGxheUNpdHlOYW1lKGNpdHkpO1xuICAgIHNldEN1cnJlbnRXZWF0aGVyKGluZm8uY3VycmVudFdlYXRoZXIpO1xuICAgIHNldFdlYXRoZXJGb3JlY2FzdHMoaW5mby53ZWF0aGVyRm9yZWNhc3RzKTtcbiAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgZGlzcGxheUVycm9yTXNnKGBcIiR7ZXJyb3J9XCJgKTtcbiAgfSk7XG59XG5cblxuc2VhcmNoQ2l0eVdlYXRoZXIoJ05ldyBZb3JrJyk7XG5cblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWJhcicpWzBdO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBlLmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpLnZhbHVlO1xuICBzZWFyY2hDaXR5V2VhdGhlcihjaXR5KTtcbiAgY2xlYXJTZWFyY2hGb3JtKCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWlucHV0JylbMF07XG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgJiYgZS5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==