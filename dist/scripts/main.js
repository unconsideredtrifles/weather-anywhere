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
  let res;
  try {
    res = await fetch(apiURL);
    if (!res.ok) {
      throw new Error('Bad HTTP Response');
    }
    const jsonOutput = await res.json();
    return jsonOutput;
  } catch ({message}) {
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






function displayCityName(city) {
  const cityName = document.getElementsByClassName('city-name')[0];
  cityName.textContent = city;
}


function searchCityWeather(city) {
  (0,_components_loading_handler__WEBPACK_IMPORTED_MODULE_2__.startLoading)();
  (0,_api_weather_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city).then((info) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkvYXBpLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkvd2VhdGhlci1hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29tcG9uZW50cy9jb21wb25lbnQtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL2Vycm9yLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29tcG9uZW50cy9sb2FkaW5nLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZGF0ZS11dGlsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXItdXRpbC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwaURvbWFpbiA9ICdhcGkud2VhdGhlcmFwaS5jb20nO1xuY29uc3QgYXBpRW5kcG9pbnQgPSAndjEvZm9yZWNhc3QuanNvbic7XG5jb25zdCBhcGlLZXkgPSAnNGMzNWM1MjE5YzUwNGVjNThhMzEyMDgwODI0MjkwMSc7XG5cbmV4cG9ydCB7XG4gIGFwaURvbWFpbixcbiAgYXBpRW5kcG9pbnQsXG4gIGFwaUtleVxufTsiLCJpbXBvcnQge2FwaURvbWFpbiwgYXBpRW5kcG9pbnQsIGFwaUtleX0gZnJvbSAnLi9hcGktY29uZmlnJztcbmltcG9ydCBjb252ZXJ0RGF0ZTJXZGF5IGZyb20gJy4uL2RhdGUtdXRpbC5qcydcblxuXG5mdW5jdGlvbiBlbmhhbmNlSWNvblNpemUoaWNvblVSTCkge1xuICBsZXQgYmlnZ2VySWNvblVSTCA9IGljb25VUkwucmVwbGFjZSgnNjR4NjQnLCAnMTI4eDEyOCcpO1xuICByZXR1cm4gYGh0dHBzOiR7YmlnZ2VySWNvblVSTH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldFdlYXRoZXJTdGF0dXMoZGF5KSB7XG4gICAgY29uc3Qgc3RhdHVzID0gZGF5LmNvbmRpdGlvbi50ZXh0O1xuICAgIGNvbnN0IGljb24gPSBlbmhhbmNlSWNvblNpemUoZGF5LmNvbmRpdGlvbi5pY29uKTtcbiAgICBjb25zdCB0ZW1wQyA9IChkYXkudGVtcF9jKSA/IGRheS50ZW1wX2MgOiBkYXkuYXZndGVtcF9jO1xuICAgIGNvbnN0IHRlbXBGID0gKGRheS50ZW1wX2YpID8gZGF5LnRlbXBfZiA6IGRheS5hdmd0ZW1wX2Y7XG5cbiAgICByZXR1cm4geyBcbiAgICAgIHN0YXR1cywgXG4gICAgICBpY29uLCBcbiAgICAgIHRlbXA6IHtcbiAgICAgICAgY2Vsc2l1czogYCR7dGVtcEN9wrBDYCxcbiAgICAgICAgZmFocmVuaGVpdDogYCR7dGVtcEZ9wrBGYCxcbiAgICAgIH0sXG4gICAgfTtcbn1cblxuXG5mdW5jdGlvbiBwYXJzZVJlbGV2YW50SW5mbyh3ZWF0aGVySW5mbykge1xuICBsZXQgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyU3RhdHVzKHdlYXRoZXJJbmZvLmN1cnJlbnQpO1xuICBsZXQgd2VhdGhlckZvcmVjYXN0cyA9IHdlYXRoZXJJbmZvLmZvcmVjYXN0LmZvcmVjYXN0ZGF5Lm1hcCgoZWFjaEZvcmVjYXN0RGF5KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGU6IGVhY2hGb3JlY2FzdERheS5kYXRlLFxuICAgICAgd2Vla0RheTogY29udmVydERhdGUyV2RheShlYWNoRm9yZWNhc3REYXkuZGF0ZSksXG4gICAgICAuLi5nZXRXZWF0aGVyU3RhdHVzKGVhY2hGb3JlY2FzdERheS5kYXkpLFxuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiB7IGN1cnJlbnRXZWF0aGVyLCB3ZWF0aGVyRm9yZWNhc3RzIH07XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gY2FsbFdlYXRoZXJBUEkoYXBpVVJMKSB7XG4gIGxldCByZXM7XG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgZmV0Y2goYXBpVVJMKTtcbiAgICBpZiAoIXJlcy5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgSFRUUCBSZXNwb25zZScpO1xuICAgIH1cbiAgICBjb25zdCBqc29uT3V0cHV0ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbk91dHB1dDtcbiAgfSBjYXRjaCAoe21lc3NhZ2V9KSB7XG4gICAgaWYgKG1lc3NhZ2UgIT0gJ0JhZCBIVFRQIFJlc3BvbnNlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yIG9yIHBlcm1pc3Npb24gaXNzdWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlcy5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICBpZiAoY29udGVudFR5cGUgPT09IFwiYXBwbGljYXRpb24vanNvblwiKSB7XG4gICAgICBjb25zdCBqc29uQm9keSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbkJvZHkuZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfWApO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0V2VhdGhlckluZm8oY2l0eSkge1xuICBjb25zdCB1cmwgPSAoXG4gICAgYGh0dHBzOi8vJHthcGlEb21haW59LyR7YXBpRW5kcG9pbnR9P2tleT0ke2FwaUtleX0mcT0ke2NpdHl9JmRheXM9M2BcbiAgKTtcblxuICByZXR1cm4gY2FsbFdlYXRoZXJBUEkodXJsKS50aGVuKChqc29uT3V0cHV0KSA9PiB7XG4gICAgcmV0dXJuIHBhcnNlUmVsZXZhbnRJbmZvKGpzb25PdXRwdXQpO1xuICB9KTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWF0aGVySW5mbztcbiIsImNvbnN0IGxvYWRpbmdFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xvYWRpbmctaW5kaWNhdG9yJylbMF07XG5jb25zdCBlcnJvclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlcnJvci10ZXh0JylbMF07XG5jb25zdCBib2R5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvZHktc2VjdGlvbi1sYXlvdXQnKVswXTtcblxuXG5jb25zdCBzaG93TG9hZGluZ0NvbXBvbmVudCA9IGZ1bmN0aW9uIHNob3dMb2FkaW5nQ29tcG9uZW50KCkge1xuICBoaWRlRXJyb3JDb21wb25lbnQoKTtcbiAgaGlkZUJvZHlDb21wb25lbnQoKTtcbiAgbG9hZGluZ0VsLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5cbmNvbnN0IGhpZGVMb2FkaW5nQ29tcG9uZW50ID0gZnVuY3Rpb24gaGlkZUxvYWRpbmdDb21wb25lbnQoKSB7XG4gIGxvYWRpbmdFbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuXG5jb25zdCBzaG93RXJyb3JDb21wb25lbnQgPSBmdW5jdGlvbiBzaG93RXJyb3JDb21wb25lbnQobXNnKSB7XG4gIGhpZGVMb2FkaW5nQ29tcG9uZW50KCk7XG4gIGhpZGVCb2R5Q29tcG9uZW50KCk7XG4gIGVycm9yVGV4dC50ZXh0Q29udGVudCA9IG1zZztcbiAgZXJyb3JUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5cbmNvbnN0IGhpZGVFcnJvckNvbXBvbmVudCA9IGZ1bmN0aW9uIGhpZGVFcnJvckNvbXBvbmVudCgpIHtcbiAgZXJyb3JUZXh0LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5cbmNvbnN0IHNob3dCb2R5Q29tcG9uZW50ID0gZnVuY3Rpb24gc2hvd0JvZHlDb21wb25lbnQoKSB7XG4gIGhpZGVMb2FkaW5nQ29tcG9uZW50KCk7XG4gIGhpZGVFcnJvckNvbXBvbmVudCgpO1xuICBib2R5U2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuXG5jb25zdCBoaWRlQm9keUNvbXBvbmVudCA9IGZ1bmN0aW9uIGhpZGVCb2R5Q29tcG9uZW50KCkge1xuICBib2R5U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuXG5leHBvcnQge1xuICBzaG93TG9hZGluZ0NvbXBvbmVudCwgXG4gIGhpZGVMb2FkaW5nQ29tcG9uZW50LCBcbiAgc2hvd0Vycm9yQ29tcG9uZW50LFxuICBzaG93Qm9keUNvbXBvbmVudCxcbn07XG4iLCJpbXBvcnQgeyBzaG93RXJyb3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC1jb250cm9sbGVyJztcblxuY29uc3QgZGlzcGxheUVycm9yTXNnID0gZnVuY3Rpb24gZGlzcGxheUVycm9yTXNnKG1zZykge1xuICBjb25zdCBlcnJvck1zZyA9IG1zZy5yZXBsYWNlQWxsKCdcIicsICcnKS5zcGxpdCgnRXJyb3I6ICcpWzFdO1xuICBzaG93RXJyb3JDb21wb25lbnQoZXJyb3JNc2cpOyAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlFcnJvck1zZztcbiIsImltcG9ydCB7IHNob3dMb2FkaW5nQ29tcG9uZW50LCBoaWRlTG9hZGluZ0NvbXBvbmVudCwgc2hvd0JvZHlDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50LWNvbnRyb2xsZXInO1xuXG5cbmNvbnN0IHN0YXJ0TG9hZGluZyA9IGZ1bmN0aW9uIHN0YXJ0TG9hZGluZygpIHtcbiAgc2hvd0xvYWRpbmdDb21wb25lbnQoKTtcbn07XG5cblxuY29uc3Qgc3RvcExvYWRpbmcgPSBmdW5jdGlvbiBzdG9wTG9hZGluZygpIHtcbiAgaGlkZUxvYWRpbmdDb21wb25lbnQoKTtcbiAgc2hvd0JvZHlDb21wb25lbnQoKTtcbn1cblxuXG5leHBvcnQge1xuICBzdGFydExvYWRpbmcsXG4gIHN0b3BMb2FkaW5nXG59OyIsImNvbnN0IGNvbnZlcnREYXRlMldkYXkgPSBmdW5jdGlvbiBjb252ZXJ0RGF0ZTJXZGF5KGRhdGVTdHIpIHtcbiAgY29uc3Qgd2RheXMgPSBbXG4gICAgJ1N1bicsICdNb24nLCAnVHVlJywgXG4gICAgJ1dlZCcsICdUaHVycycsICdGcmknLCBcbiAgICAnU2F0JyxcbiAgXTtcblxuICBjb25zdCB3ZGF5SWR4ID0gbmV3IERhdGUoZGF0ZVN0cikuZ2V0RGF5KCk7XG4gIHJldHVybiB3ZGF5c1t3ZGF5SWR4XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udmVydERhdGUyV2RheTsiLCJmdW5jdGlvbiBzZXRXZWF0aGVyRGF0ZShkYXRlRWwsIGRhdGVJbmZvLCBpc1RvZGF5ID0gZmFsc2UpIHtcbiAgZGF0ZUVsLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID0gZGF0ZUluZm8uZGF0ZTtcbiAgZGF0ZUVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0ZXRpbWUnLCBkYXRlSW5mby5kYXRlKTtcbiAgaWYgKGlzVG9kYXkpIHtcbiAgICBkYXRlSW5mby53ZWVrRGF5ID0gYFRvZGF5LyR7ZGF0ZUluZm8ud2Vla0RheX1gO1xuICB9XG4gIGRhdGVFbC5jaGlsZHJlblsyXS50ZXh0Q29udGVudCA9IGAoJHtkYXRlSW5mby53ZWVrRGF5fSlgO1xufVxuXG5cbmZ1bmN0aW9uIHNldFdlYXRoZXJJbmZvKHdlYXRoZXJDYXRlZ29yeSwgd2VhdGhlckluZm8pIHtcbiAgY29uc3Qgd2VhdGhlclN0YXR1cyA9IHdlYXRoZXJDYXRlZ29yeS5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1yZXN1bHQtdGV4dCcpO1xuICB3ZWF0aGVyU3RhdHVzLnRleHRDb250ZW50ID0gd2VhdGhlckluZm8uc3RhdHVzO1xuXG4gIGNvbnN0IHdlYXRoZXJTdGF0dXNJbWcgPSB3ZWF0aGVyQ2F0ZWdvcnkucXVlcnlTZWxlY3RvcignLndlYXRoZXItaWNvbicpO1xuICB3ZWF0aGVyU3RhdHVzSW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke3dlYXRoZXJJbmZvLmljb259XCIpYDtcblxuICBjb25zdCB3ZWF0aGVyVGVtcCA9IHdlYXRoZXJDYXRlZ29yeS5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci10ZW1wZXJhdHVyZScpO1xuICB3ZWF0aGVyVGVtcC50ZXh0Q29udGVudCA9IHdlYXRoZXJJbmZvLnRlbXAuY2Vsc2l1cztcbn1cblxuXG5mdW5jdGlvbiBzZXRDdXJyZW50V2VhdGhlcih3ZWF0aGVySW5mbykge1xuICBjb25zdCBjYXRlZ29yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2N1cnJlbnQtd2VhdGhlcicpWzBdO1xuICBzZXRXZWF0aGVySW5mbyhjYXRlZ29yeSwgd2VhdGhlckluZm8pO1xufVxuXG5cbmZ1bmN0aW9uIHNldFdlYXRoZXJGb3JlY2FzdHMoZm9yZWNhc3RzKSB7XG4gIGNvbnN0IHdlYXRoZXJEYXRlcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWRhdGUnKV07XG4gIGNvbnN0IGNhdGVnb3J5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1wcmVkaWN0aW9uJylbMF07XG5cbiAgQXJyYXkuZnJvbShcbiAgICBjYXRlZ29yeS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWNhcmQnKSxcbiAgICAoZWFjaFJlc3VsdCwgaWR4KSA9PiB7XG4gICAgICBzZXRXZWF0aGVyRGF0ZSh3ZWF0aGVyRGF0ZXNbaWR4XSwgZm9yZWNhc3RzW2lkeF0sICFpZHgpO1xuICAgICAgc2V0V2VhdGhlckluZm8oZWFjaFJlc3VsdCwgZm9yZWNhc3RzW2lkeF0pO1xuICAgIH0sXG4gICk7XG59XG5cbmV4cG9ydCB7XG4gIHNldEN1cnJlbnRXZWF0aGVyLFxuICBzZXRXZWF0aGVyRm9yZWNhc3RzLFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnZXRXZWF0aGVySW5mbyBmcm9tICcuL2FwaS93ZWF0aGVyLWFwaSc7XG5pbXBvcnQgIHsgc2V0Q3VycmVudFdlYXRoZXIsIHNldFdlYXRoZXJGb3JlY2FzdHMgfSBmcm9tICcuL3dlYXRoZXItdXRpbCc7XG5pbXBvcnQgeyBzdGFydExvYWRpbmcsIHN0b3BMb2FkaW5nIH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRpbmctaGFuZGxlcic7XG5pbXBvcnQgZGlzcGxheUVycm9yTXNnIGZyb20gJy4vY29tcG9uZW50cy9lcnJvci1oYW5kbGVyJztcblxuXG5mdW5jdGlvbiBkaXNwbGF5Q2l0eU5hbWUoY2l0eSkge1xuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NpdHktbmFtZScpWzBdO1xuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGNpdHk7XG59XG5cblxuZnVuY3Rpb24gc2VhcmNoQ2l0eVdlYXRoZXIoY2l0eSkge1xuICBzdGFydExvYWRpbmcoKTtcbiAgZ2V0V2VhdGhlckluZm8oY2l0eSkudGhlbigoaW5mbykgPT4ge1xuICAgIHN0b3BMb2FkaW5nKCk7XG4gICAgZGlzcGxheUNpdHlOYW1lKGNpdHkpO1xuICAgIHNldEN1cnJlbnRXZWF0aGVyKGluZm8uY3VycmVudFdlYXRoZXIpO1xuICAgIHNldFdlYXRoZXJGb3JlY2FzdHMoaW5mby53ZWF0aGVyRm9yZWNhc3RzKTtcbiAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgZGlzcGxheUVycm9yTXNnKGBcIiR7ZXJyb3J9XCJgKTtcbiAgfSk7XG59XG5cblxuc2VhcmNoQ2l0eVdlYXRoZXIoJ05ldyBZb3JrJyk7XG5cblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VhcmNoLWJhcicpWzBdO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBlLmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpLnZhbHVlO1xuICBzZWFyY2hDaXR5V2VhdGhlcihjaXR5KTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWFyY2gtaW5wdXQnKVswXTtcbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiBlLmN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9