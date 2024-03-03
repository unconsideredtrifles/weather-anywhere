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
    `https://${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiDomain}/${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiEndpoint}?key=${_api_config__WEBPACK_IMPORTED_MODULE_0__.apiKey}&q=${city}&days=3`
  );

  return callWeatherAPI(url).then((jsonOutput) => {
    return parseRelevantInfo(jsonOutput);
  });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeatherInfo);


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


(0,_api_weather_api__WEBPACK_IMPORTED_MODULE_0__["default"])('yangon').then((info) => {
  console.log(info);
}).catch((error) => {
  console.log(`"${error}"`);
});


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0Y0RDs7O0FBRzVEO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQzs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFdBQVc7QUFDWDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxRQUFRO0FBQ3BCO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxlQUFlLGtEQUFTLENBQUMsR0FBRyxvREFBVyxDQUFDLE9BQU8sK0NBQU0sQ0FBQyxLQUFLLEtBQUs7QUFDaEU7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0EsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7O1VDdkQ5QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTitDOztBQUUvQyw0REFBYztBQUNkO0FBQ0EsQ0FBQztBQUNELGtCQUFrQixNQUFNO0FBQ3hCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkvYXBpLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkvd2VhdGhlci1hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcGlEb21haW4gPSAnYXBpLndlYXRoZXJhcGkuY29tJztcbmNvbnN0IGFwaUVuZHBvaW50ID0gJ3YxL2ZvcmVjYXN0Lmpzb24nO1xuY29uc3QgYXBpS2V5ID0gJzRjMzVjNTIxOWM1MDRlYzU4YTMxMjA4MDgyNDI5MDEnO1xuXG5leHBvcnQge1xuICBhcGlEb21haW4sXG4gIGFwaUVuZHBvaW50LFxuICBhcGlLZXlcbn07IiwiaW1wb3J0IHthcGlEb21haW4sIGFwaUVuZHBvaW50LCBhcGlLZXl9IGZyb20gJy4vYXBpLWNvbmZpZyc7XG5cblxuZnVuY3Rpb24gZW5oYW5jZUljb25TaXplKGljb25VUkwpIHtcbiAgbGV0IGJpZ2dlckljb25VUkwgPSBpY29uVVJMLnJlcGxhY2UoJzY0eDY0JywgJzEyOHgxMjgnKTtcbiAgcmV0dXJuIGBodHRwczoke2JpZ2dlckljb25VUkx9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyU3RhdHVzKGRheSkge1xuICAgIGNvbnN0IHN0YXR1cyA9IGRheS5jb25kaXRpb24udGV4dDtcbiAgICBjb25zdCBpY29uID0gZW5oYW5jZUljb25TaXplKGRheS5jb25kaXRpb24uaWNvbik7XG5cbiAgICByZXR1cm4geyBzdGF0dXMsIGljb24gfTtcbn1cblxuXG5mdW5jdGlvbiBwYXJzZVJlbGV2YW50SW5mbyh3ZWF0aGVySW5mbykge1xuICBsZXQgY3VycmVudFdlYXRoZXIgPSBnZXRXZWF0aGVyU3RhdHVzKHdlYXRoZXJJbmZvLmN1cnJlbnQpO1xuICBsZXQgd2VhdGhlckZvcmVjYXN0cyA9IHdlYXRoZXJJbmZvLmZvcmVjYXN0LmZvcmVjYXN0ZGF5Lm1hcCgoZWFjaEZvcmVjYXN0RGF5KSA9PiB7XG4gICAgcmV0dXJuIGdldFdlYXRoZXJTdGF0dXMoZWFjaEZvcmVjYXN0RGF5LmRheSk7XG4gIH0pO1xuXG4gIHJldHVybiB7IGN1cnJlbnRXZWF0aGVyLCB3ZWF0aGVyRm9yZWNhc3RzIH07XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gY2FsbFdlYXRoZXJBUEkoYXBpVVJMKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYXBpVVJMKTtcbiAgICBpZiAoIXJlcy5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgSFRUUCBSZXNwb25zZScpO1xuICAgIH1cbiAgICBjb25zdCBqc29uT3V0cHV0ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICByZXR1cm4ganNvbk91dHB1dDtcbiAgfSBjYXRjaCAoe21lc3NhZ2V9KSB7XG4gICAgaWYgKG1lc3NhZ2UgPT09ICdCYWQgSFRUUCBSZXNwb25zZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfWApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3Igb3IgcGVybWlzc2lvbiBpc3N1ZScpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0V2VhdGhlckluZm8oY2l0eSkge1xuICBjb25zdCB1cmwgPSAoXG4gICAgYGh0dHBzOi8vJHthcGlEb21haW59LyR7YXBpRW5kcG9pbnR9P2tleT0ke2FwaUtleX0mcT0ke2NpdHl9JmRheXM9M2BcbiAgKTtcblxuICByZXR1cm4gY2FsbFdlYXRoZXJBUEkodXJsKS50aGVuKChqc29uT3V0cHV0KSA9PiB7XG4gICAgcmV0dXJuIHBhcnNlUmVsZXZhbnRJbmZvKGpzb25PdXRwdXQpO1xuICB9KTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWF0aGVySW5mbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdldFdlYXRoZXJJbmZvIGZyb20gJy4vYXBpL3dlYXRoZXItYXBpJztcblxuZ2V0V2VhdGhlckluZm8oJ3lhbmdvbicpLnRoZW4oKGluZm8pID0+IHtcbiAgY29uc29sZS5sb2coaW5mbyk7XG59KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgY29uc29sZS5sb2coYFwiJHtlcnJvcn1cImApO1xufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==