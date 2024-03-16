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
/* harmony import */ var _date_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../date-util */ "./src/date-util.js");




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
    weekDay: (0,_date_util__WEBPACK_IMPORTED_MODULE_1__["default"])(eachForecastDay.date),
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
    `https://${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiDomain}/${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiEndpoint}?key=${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiKey}&q=${city}&days=3`
  );

  return callWeatherAPI(url).then((jsonOutput) => (
    parseRelevantInfo(jsonOutput)
  ));
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


const hideLoadingComponent = function hideLoadingComponent() {
  loadingEl.classList.add('display-none');
};


const hideErrorComponent = function hideErrorComponent() {
  errorText.classList.add('display-none');
};


const hideBodyComponent = function hideBodyComponent() {
  bodySection.classList.add('display-none');
};


const showLoadingComponent = function showLoadingComponent() {
  hideErrorComponent();
  hideBodyComponent();
  loadingEl.classList.remove('display-none');
};


const showErrorComponent = function showErrorComponent(msg) {
  hideLoadingComponent();
  hideBodyComponent();
  errorText.textContent = msg;
  errorText.classList.remove('display-none');
};


const showBodyComponent = function showBodyComponent() {
  hideLoadingComponent();
  hideErrorComponent();
  bodySection.classList.remove('display-none');
};





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
};

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
};





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
};

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






const searchInput = document.getElementsByClassName('search-input')[0];
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.currentTarget.value.length === 0) {
    e.preventDefault();
  }
});


const clearSearchForm = function clearSearchForm() {
  searchInput.value = '';
};


const displayCityName = function displayCityName(city) {
  const cityName = document.getElementsByClassName('city-name')[0];
  cityName.textContent = city;
};


const checkIfExactCity = function checkIfExactCity(givenCity, returnedCity) {
  return (
    givenCity.trim().toLowerCase() === returnedCity.trim().toLowerCase()
  );
};


const searchCityWeather = function searchCityWeather(city) {
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
};


searchCityWeather('New York');


const searchBar = document.getElementsByClassName('search-bar')[0];
searchBar.addEventListener('submit', (e) => {
  const city = e.currentTarget.querySelector('.search-input').value;
  searchCityWeather(city);
  clearSearchForm();
  e.preventDefault();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2Y7QUFDQSxJQUFJLGdFQUFpQjtBQUNyQixJQUFJLGtFQUFtQjtBQUN2QixHQUFHO0FBQ0gsSUFBSSxxRUFBZSxLQUFLLE1BQU07QUFDOUIsR0FBRztBQUNIOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS9hcGktY29uZmlnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaS93ZWF0aGVyLWFwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL2NvbXBvbmVudC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbXBvbmVudHMvZXJyb3ItaGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL2xvYWRpbmctaGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRlLXV0aWwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci11dGlsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBpRG9tYWluID0gJ2FwaS53ZWF0aGVyYXBpLmNvbSc7XG5jb25zdCBhcGlFbmRwb2ludCA9ICd2MS9mb3JlY2FzdC5qc29uJztcbmNvbnN0IGFwaUtleSA9ICc0YzM1YzUyMTljNTA0ZWM1OGEzMTIwODA4MjQyOTAxJztcblxuZXhwb3J0IHtcbiAgYXBpRG9tYWluLFxuICBhcGlFbmRwb2ludCxcbiAgYXBpS2V5LFxufTtcbiIsImltcG9ydCB7IGFwaURvbWFpbiwgYXBpRW5kcG9pbnQsIGFwaUtleSB9IGZyb20gJy4vYXBpLWNvbmZpZyc7XG5pbXBvcnQgY29udmVydERhdGUyV2RheSBmcm9tICcuLi9kYXRlLXV0aWwnO1xuXG5cbmNvbnN0IGVuaGFuY2VJY29uU2l6ZSA9IGZ1bmN0aW9uIGVuaGFuY2VJY29uU2l6ZShpY29uVVJMKSB7XG4gIGNvbnN0IGJpZ2dlckljb25VUkwgPSBpY29uVVJMLnJlcGxhY2UoJzY0eDY0JywgJzEyOHgxMjgnKTtcbiAgcmV0dXJuIGBodHRwczoke2JpZ2dlckljb25VUkx9YDtcbn07XG5cblxuY29uc3QgZ2V0V2VhdGhlclN0YXR1cyA9IGZ1bmN0aW9uIGdldFdlYXRoZXJTdGF0dXMoZGF5KSB7XG4gIGNvbnN0IHN0YXR1cyA9IGRheS5jb25kaXRpb24udGV4dDtcbiAgY29uc3QgaWNvbiA9IGVuaGFuY2VJY29uU2l6ZShkYXkuY29uZGl0aW9uLmljb24pO1xuICBjb25zdCB0ZW1wQyA9IChkYXkudGVtcF9jKSA/IGRheS50ZW1wX2MgOiBkYXkuYXZndGVtcF9jO1xuICBjb25zdCB0ZW1wRiA9IChkYXkudGVtcF9mKSA/IGRheS50ZW1wX2YgOiBkYXkuYXZndGVtcF9mO1xuXG4gIHJldHVybiB7XG4gICAgc3RhdHVzLFxuICAgIGljb24sXG4gICAgdGVtcDoge1xuICAgICAgY2Vsc2l1czogYCR7dGVtcEN9wrBDYCxcbiAgICAgIGZhaHJlbmhlaXQ6IGAke3RlbXBGfcKwRmAsXG4gICAgfSxcbiAgfTtcbn07XG5cblxuY29uc3QgcGFyc2VSZWxldmFudEluZm8gPSBmdW5jdGlvbiBwYXJzZVJlbGV2YW50SW5mbyh3ZWF0aGVySW5mbykge1xuICBjb25zdCBjdXJyZW50V2VhdGhlciA9IGdldFdlYXRoZXJTdGF0dXMod2VhdGhlckluZm8uY3VycmVudCk7XG4gIGNvbnN0IHdlYXRoZXJGb3JlY2FzdHMgPSB3ZWF0aGVySW5mby5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAoKGVhY2hGb3JlY2FzdERheSkgPT4gKHtcbiAgICBkYXRlOiBlYWNoRm9yZWNhc3REYXkuZGF0ZSxcbiAgICB3ZWVrRGF5OiBjb252ZXJ0RGF0ZTJXZGF5KGVhY2hGb3JlY2FzdERheS5kYXRlKSxcbiAgICAuLi5nZXRXZWF0aGVyU3RhdHVzKGVhY2hGb3JlY2FzdERheS5kYXkpLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50V2VhdGhlcixcbiAgICB3ZWF0aGVyRm9yZWNhc3RzLFxuICAgIGNpdHk6IHdlYXRoZXJJbmZvLmxvY2F0aW9uLm5hbWUsXG4gIH07XG59O1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxXZWF0aGVyQVBJKGFwaVVSTCkge1xuICBsZXQgcmVzO1xuICB0cnkge1xuICAgIHJlcyA9IGF3YWl0IGZldGNoKGFwaVVSTCwgeyBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQoNTAwMCkgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIEhUVFAgUmVzcG9uc2UnKTtcbiAgICB9XG4gICAgY29uc3QganNvbk91dHB1dCA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgcmV0dXJuIGpzb25PdXRwdXQ7XG4gIH0gY2F0Y2ggKHsgbmFtZSwgbWVzc2FnZSB9KSB7XG4gICAgaWYgKG5hbWUgPT09ICdBYm9ydEVycm9yJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25uZWN0aW9uIHRpbWVvdXQnKTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZSAhPT0gJ0JhZCBIVFRQIFJlc3BvbnNlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yIG9yIHBlcm1pc3Npb24gaXNzdWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlcy5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIGNvbnN0IGpzb25Cb2R5ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihqc29uQm9keS5lcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9YCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVySW5mbyhjaXR5KSB7XG4gIGNvbnN0IHVybCA9IChcbiAgICBgaHR0cHM6Ly8ke2FwaURvbWFpbn0vJHthcGlFbmRwb2ludH0/a2V5PSR7YXBpS2V5fSZxPSR7Y2l0eX0mZGF5cz0zYFxuICApO1xuXG4gIHJldHVybiBjYWxsV2VhdGhlckFQSSh1cmwpLnRoZW4oKGpzb25PdXRwdXQpID0+IChcbiAgICBwYXJzZVJlbGV2YW50SW5mbyhqc29uT3V0cHV0KVxuICApKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWF0aGVySW5mbztcbiIsImNvbnN0IGxvYWRpbmdFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xvYWRpbmctaW5kaWNhdG9yJylbMF07XG5jb25zdCBlcnJvclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlcnJvci10ZXh0JylbMF07XG5jb25zdCBib2R5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvZHktc2VjdGlvbi1sYXlvdXQnKVswXTtcblxuXG5jb25zdCBoaWRlTG9hZGluZ0NvbXBvbmVudCA9IGZ1bmN0aW9uIGhpZGVMb2FkaW5nQ29tcG9uZW50KCkge1xuICBsb2FkaW5nRWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG59O1xuXG5cbmNvbnN0IGhpZGVFcnJvckNvbXBvbmVudCA9IGZ1bmN0aW9uIGhpZGVFcnJvckNvbXBvbmVudCgpIHtcbiAgZXJyb3JUZXh0LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xufTtcblxuXG5jb25zdCBoaWRlQm9keUNvbXBvbmVudCA9IGZ1bmN0aW9uIGhpZGVCb2R5Q29tcG9uZW50KCkge1xuICBib2R5U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LW5vbmUnKTtcbn07XG5cblxuY29uc3Qgc2hvd0xvYWRpbmdDb21wb25lbnQgPSBmdW5jdGlvbiBzaG93TG9hZGluZ0NvbXBvbmVudCgpIHtcbiAgaGlkZUVycm9yQ29tcG9uZW50KCk7XG4gIGhpZGVCb2R5Q29tcG9uZW50KCk7XG4gIGxvYWRpbmdFbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbn07XG5cblxuY29uc3Qgc2hvd0Vycm9yQ29tcG9uZW50ID0gZnVuY3Rpb24gc2hvd0Vycm9yQ29tcG9uZW50KG1zZykge1xuICBoaWRlTG9hZGluZ0NvbXBvbmVudCgpO1xuICBoaWRlQm9keUNvbXBvbmVudCgpO1xuICBlcnJvclRleHQudGV4dENvbnRlbnQgPSBtc2c7XG4gIGVycm9yVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbn07XG5cblxuY29uc3Qgc2hvd0JvZHlDb21wb25lbnQgPSBmdW5jdGlvbiBzaG93Qm9keUNvbXBvbmVudCgpIHtcbiAgaGlkZUxvYWRpbmdDb21wb25lbnQoKTtcbiAgaGlkZUVycm9yQ29tcG9uZW50KCk7XG4gIGJvZHlTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xufTtcblxuXG5leHBvcnQge1xuICBzaG93TG9hZGluZ0NvbXBvbmVudCxcbiAgaGlkZUxvYWRpbmdDb21wb25lbnQsXG4gIHNob3dFcnJvckNvbXBvbmVudCxcbiAgc2hvd0JvZHlDb21wb25lbnQsXG59O1xuIiwiaW1wb3J0IHsgc2hvd0Vycm9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQtY29udHJvbGxlcic7XG5cbmNvbnN0IGRpc3BsYXlFcnJvck1zZyA9IGZ1bmN0aW9uIGRpc3BsYXlFcnJvck1zZyhtc2cpIHtcbiAgY29uc3QgZXJyb3JNc2cgPSBtc2cucmVwbGFjZUFsbCgnXCInLCAnJykuc3BsaXQoJ0Vycm9yOiAnKVsxXTtcbiAgc2hvd0Vycm9yQ29tcG9uZW50KGVycm9yTXNnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlFcnJvck1zZztcbiIsImltcG9ydCB7IHNob3dMb2FkaW5nQ29tcG9uZW50LCBoaWRlTG9hZGluZ0NvbXBvbmVudCwgc2hvd0JvZHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC1jb250cm9sbGVyJztcblxuXG5jb25zdCBzdGFydExvYWRpbmcgPSBmdW5jdGlvbiBzdGFydExvYWRpbmcoKSB7XG4gIHNob3dMb2FkaW5nQ29tcG9uZW50KCk7XG59O1xuXG5cbmNvbnN0IHN0b3BMb2FkaW5nID0gZnVuY3Rpb24gc3RvcExvYWRpbmcoKSB7XG4gIGhpZGVMb2FkaW5nQ29tcG9uZW50KCk7XG4gIHNob3dCb2R5Q29tcG9uZW50KCk7XG59O1xuXG5cbmV4cG9ydCB7XG4gIHN0YXJ0TG9hZGluZyxcbiAgc3RvcExvYWRpbmcsXG59O1xuIiwiY29uc3QgY29udmVydERhdGUyV2RheSA9IGZ1bmN0aW9uIGNvbnZlcnREYXRlMldkYXkoZGF0ZVN0cikge1xuICBjb25zdCB3ZGF5cyA9IFtcbiAgICAnU3VuJywgJ01vbicsICdUdWUnLFxuICAgICdXZWQnLCAnVGh1cnMnLCAnRnJpJyxcbiAgICAnU2F0JyxcbiAgXTtcblxuICBjb25zdCB3ZGF5SWR4ID0gbmV3IERhdGUoZGF0ZVN0cikuZ2V0RGF5KCk7XG4gIHJldHVybiB3ZGF5c1t3ZGF5SWR4XTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnREYXRlMldkYXk7XG4iLCJjb25zdCBzZXRXZWF0aGVyRGF0ZSA9IGZ1bmN0aW9uIHNldFdlYXRoZXJEYXRlKFxuICBkYXRlQ29tcG9uZW50LFxuICBpbmZvLFxuICBpc1RvZGF5ID0gZmFsc2UsXG4pIHtcbiAgY29uc3QgZGF0ZUluZm8gPSBpbmZvO1xuICBjb25zdCBkYXRlRWwgPSBkYXRlQ29tcG9uZW50LmNoaWxkcmVuWzBdO1xuICBkYXRlRWwudGV4dENvbnRlbnQgPSBpbmZvLmRhdGU7XG4gIGRhdGVFbC5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgaW5mby5kYXRlKTtcblxuICBpZiAoaXNUb2RheSkge1xuICAgIGRhdGVJbmZvLndlZWtEYXkgPSBgVG9kYXkvJHtkYXRlSW5mby53ZWVrRGF5fWA7XG4gIH1cblxuICBjb25zdCB3ZWVrRGF5RWwgPSBkYXRlQ29tcG9uZW50LmNoaWxkcmVuWzJdO1xuICB3ZWVrRGF5RWwudGV4dENvbnRlbnQgPSBgKCR7ZGF0ZUluZm8ud2Vla0RheX0pYDtcbn07XG5cblxuY29uc3Qgc2V0V2VhdGhlckluZm8gPSBmdW5jdGlvbiBzZXRXZWF0aGVySW5mbyh3ZWF0aGVyQ2F0ZWdvcnksIHdlYXRoZXJJbmZvKSB7XG4gIGNvbnN0IHdlYXRoZXJTdGF0dXMgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItcmVzdWx0LXRleHQnKTtcbiAgd2VhdGhlclN0YXR1cy50ZXh0Q29udGVudCA9IHdlYXRoZXJJbmZvLnN0YXR1cztcblxuICBjb25zdCB3ZWF0aGVyU3RhdHVzSW1nID0gd2VhdGhlckNhdGVnb3J5LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24nKTtcbiAgd2VhdGhlclN0YXR1c0ltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHt3ZWF0aGVySW5mby5pY29ufVwiKWA7XG5cbiAgY29uc3Qgd2VhdGhlclRlbXAgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItdGVtcGVyYXR1cmUnKTtcbiAgd2VhdGhlclRlbXAudGV4dENvbnRlbnQgPSB3ZWF0aGVySW5mby50ZW1wLmNlbHNpdXM7XG59O1xuXG5cbmNvbnN0IHNldEN1cnJlbnRXZWF0aGVyID0gZnVuY3Rpb24gc2V0Q3VycmVudFdlYXRoZXIod2VhdGhlckluZm8pIHtcbiAgY29uc3QgY2F0ZWdvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXJyZW50LXdlYXRoZXInKVswXTtcbiAgc2V0V2VhdGhlckluZm8oY2F0ZWdvcnksIHdlYXRoZXJJbmZvKTtcbn07XG5cblxuY29uc3Qgc2V0V2VhdGhlckZvcmVjYXN0cyA9IGZ1bmN0aW9uIHNldFdlYXRoZXJGb3JlY2FzdHMoZm9yZWNhc3RzKSB7XG4gIGNvbnN0IHdlYXRoZXJEYXRlcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWRhdGUnKV07XG4gIGNvbnN0IGNhdGVnb3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1wcmVkaWN0aW9uJylbMF07XG5cbiAgY29uc3QgY2F0ZWdvcmllcyA9IFsuLi5jYXRlZ29yeS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWNhcmQnKV07XG4gIGNhdGVnb3JpZXMuZm9yRWFjaCgoZWFjaFJlc3VsdCwgaWR4KSA9PiB7XG4gICAgc2V0V2VhdGhlckRhdGUod2VhdGhlckRhdGVzW2lkeF0sIGZvcmVjYXN0c1tpZHhdLCAhaWR4KTtcbiAgICBzZXRXZWF0aGVySW5mbyhlYWNoUmVzdWx0LCBmb3JlY2FzdHNbaWR4XSk7XG4gIH0pO1xufTtcblxuXG5leHBvcnQge1xuICBzZXRDdXJyZW50V2VhdGhlcixcbiAgc2V0V2VhdGhlckZvcmVjYXN0cyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnZXRXZWF0aGVySW5mbyBmcm9tICcuL2FwaS93ZWF0aGVyLWFwaSc7XG5pbXBvcnQgeyBzZXRDdXJyZW50V2VhdGhlciwgc2V0V2VhdGhlckZvcmVjYXN0cyB9IGZyb20gJy4vd2VhdGhlci11dGlsJztcbmltcG9ydCB7IHN0YXJ0TG9hZGluZywgc3RvcExvYWRpbmcgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGluZy1oYW5kbGVyJztcbmltcG9ydCBkaXNwbGF5RXJyb3JNc2cgZnJvbSAnLi9jb21wb25lbnRzL2Vycm9yLWhhbmRsZXInO1xuXG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWlucHV0JylbMF07XG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIGUuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn0pO1xuXG5cbmNvbnN0IGNsZWFyU2VhcmNoRm9ybSA9IGZ1bmN0aW9uIGNsZWFyU2VhcmNoRm9ybSgpIHtcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbn07XG5cblxuY29uc3QgZGlzcGxheUNpdHlOYW1lID0gZnVuY3Rpb24gZGlzcGxheUNpdHlOYW1lKGNpdHkpIHtcbiAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjaXR5LW5hbWUnKVswXTtcbiAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBjaXR5O1xufTtcblxuXG5jb25zdCBjaGVja0lmRXhhY3RDaXR5ID0gZnVuY3Rpb24gY2hlY2tJZkV4YWN0Q2l0eShnaXZlbkNpdHksIHJldHVybmVkQ2l0eSkge1xuICByZXR1cm4gKFxuICAgIGdpdmVuQ2l0eS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gcmV0dXJuZWRDaXR5LnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICk7XG59O1xuXG5cbmNvbnN0IHNlYXJjaENpdHlXZWF0aGVyID0gZnVuY3Rpb24gc2VhcmNoQ2l0eVdlYXRoZXIoY2l0eSkge1xuICBzdGFydExvYWRpbmcoKTtcbiAgZ2V0V2VhdGhlckluZm8oY2l0eSkudGhlbigoaW5mbykgPT4ge1xuICAgIGlmICghY2hlY2tJZkV4YWN0Q2l0eShjaXR5LCBpbmZvLmNpdHkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIGxvY2F0aW9uIGZvdW5kLicpO1xuICAgIH1cbiAgICBzdG9wTG9hZGluZygpO1xuICAgIGRpc3BsYXlDaXR5TmFtZShjaXR5KTtcbiAgICBzZXRDdXJyZW50V2VhdGhlcihpbmZvLmN1cnJlbnRXZWF0aGVyKTtcbiAgICBzZXRXZWF0aGVyRm9yZWNhc3RzKGluZm8ud2VhdGhlckZvcmVjYXN0cyk7XG4gIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIGRpc3BsYXlFcnJvck1zZyhgXCIke2Vycm9yfVwiYCk7XG4gIH0pO1xufTtcblxuXG5zZWFyY2hDaXR5V2VhdGhlcignTmV3IFlvcmsnKTtcblxuXG5jb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWFyY2gtYmFyJylbMF07XG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgY29uc3QgY2l0eSA9IGUuY3VycmVudFRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0JykudmFsdWU7XG4gIHNlYXJjaENpdHlXZWF0aGVyKGNpdHkpO1xuICBjbGVhclNlYXJjaEZvcm0oKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=