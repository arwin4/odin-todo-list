/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const newTask = function newTask(
  name,
  description,
  priority,
  dueDate,
  project,
) {
  let taskName = name;
  let taskDescription = description;
  let taskPriority = priority;
  let taskDueDate = dueDate;
  let taskProject = project;

  let done = false;

  const toggleStatus = () => {
    done = !done;
  };

  // Get task properties
  const getName = () => taskName;
  const getDescription = () => taskDescription;
  const getPriority = () => taskPriority;
  const getDueDate = () => taskDueDate;
  const getProject = () => taskProject;

  // Set task properties
  const setName = (string) => {
    taskName = string;
  };
  const setDescription = (string) => {
    taskDescription = string;
  };
  const setPriority = (string) => {
    taskPriority = string;
  };
  const setDueDate = (string) => {
    taskDueDate = string;
  };
  const setProject = (string) => {
    taskProject = string;
  };

  return {
    getName,
    getDescription,
    getPriority,
    getDueDate,
    getProject,
    setName,
    setDescription,
    setPriority,
    setDueDate,
    setProject,
    toggleStatus,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newTask);


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
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");


const task1 = (0,_task__WEBPACK_IMPORTED_MODULE_0__["default"])('name of task 1');
task1.setName('newname');
console.log(task1.getName());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7O1VDMUR2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZCOztBQUU3QixjQUFjLGlEQUFPO0FBQ3JCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbmV3VGFzayA9IGZ1bmN0aW9uIG5ld1Rhc2soXG4gIG5hbWUsXG4gIGRlc2NyaXB0aW9uLFxuICBwcmlvcml0eSxcbiAgZHVlRGF0ZSxcbiAgcHJvamVjdCxcbikge1xuICBsZXQgdGFza05hbWUgPSBuYW1lO1xuICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIGxldCB0YXNrUHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgbGV0IHRhc2tEdWVEYXRlID0gZHVlRGF0ZTtcbiAgbGV0IHRhc2tQcm9qZWN0ID0gcHJvamVjdDtcblxuICBsZXQgZG9uZSA9IGZhbHNlO1xuXG4gIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHtcbiAgICBkb25lID0gIWRvbmU7XG4gIH07XG5cbiAgLy8gR2V0IHRhc2sgcHJvcGVydGllc1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gdGFza05hbWU7XG4gIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gdGFza0Rlc2NyaXB0aW9uO1xuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHRhc2tQcmlvcml0eTtcbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IHRhc2tEdWVEYXRlO1xuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gdGFza1Byb2plY3Q7XG5cbiAgLy8gU2V0IHRhc2sgcHJvcGVydGllc1xuICBjb25zdCBzZXROYW1lID0gKHN0cmluZykgPT4ge1xuICAgIHRhc2tOYW1lID0gc3RyaW5nO1xuICB9O1xuICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChzdHJpbmcpID0+IHtcbiAgICB0YXNrRGVzY3JpcHRpb24gPSBzdHJpbmc7XG4gIH07XG4gIGNvbnN0IHNldFByaW9yaXR5ID0gKHN0cmluZykgPT4ge1xuICAgIHRhc2tQcmlvcml0eSA9IHN0cmluZztcbiAgfTtcbiAgY29uc3Qgc2V0RHVlRGF0ZSA9IChzdHJpbmcpID0+IHtcbiAgICB0YXNrRHVlRGF0ZSA9IHN0cmluZztcbiAgfTtcbiAgY29uc3Qgc2V0UHJvamVjdCA9IChzdHJpbmcpID0+IHtcbiAgICB0YXNrUHJvamVjdCA9IHN0cmluZztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldE5hbWUsXG4gICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgZ2V0UHJpb3JpdHksXG4gICAgZ2V0RHVlRGF0ZSxcbiAgICBnZXRQcm9qZWN0LFxuICAgIHNldE5hbWUsXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0UHJpb3JpdHksXG4gICAgc2V0RHVlRGF0ZSxcbiAgICBzZXRQcm9qZWN0LFxuICAgIHRvZ2dsZVN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5ld1Rhc2s7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBuZXdUYXNrIGZyb20gJy4vdGFzayc7XG5cbmNvbnN0IHRhc2sxID0gbmV3VGFzaygnbmFtZSBvZiB0YXNrIDEnKTtcbnRhc2sxLnNldE5hbWUoJ25ld25hbWUnKTtcbmNvbnNvbGUubG9nKHRhc2sxLmdldE5hbWUoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=