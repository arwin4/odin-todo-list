/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/screen.js":
/*!***********************!*\
  !*** ./src/screen.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");


const removeTaskObject = (project, task) => project.deleteTask(task.getID());

const projectContainer = document.querySelector('.projects-container');

function renderTasks(project, renderProjectsContainer) {
  const tasks = project.getTasks();
  Object.values(tasks).forEach((task) => {
    const taskName = document.createElement('p');
    taskName.textContent = task.getName();
    projectContainer.appendChild(taskName);

    // Render delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.addEventListener('click', () => {
      // Delete task in project object
      removeTaskObject(project, task);
      // Re-render projects container
      renderProjectsContainer();
    });
    projectContainer.appendChild(deleteBtn);
  });
}

function renderProjects() {
  // The projects (and tasks) are re-rendered completely every time a change is
  // made to the data. Not efficient.

  // Clear the container for render
  projectContainer.replaceChildren();

  const projects = _task__WEBPACK_IMPORTED_MODULE_0__.projectManager.getProjects();
  Object.values(projects).forEach((project) => {
    // Render the project names
    const projectName = document.createElement('h2');
    projectName.textContent = project.getName();
    projectContainer.appendChild(projectName);

    // Render the tasks inside the projects
    renderTasks(project, renderProjects);
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderProjects);


/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "projectManager": () => (/* binding */ projectManager),
/* harmony export */   "taskFactory": () => (/* binding */ taskFactory)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


const taskFactory = function taskFactory(
  project,
  name = 'Task',
  description = '',
  priority = 'normal',
  dueDate = 'PLACEHOLDER',
) {
  let projectID = project;
  let taskName = name;
  let taskDescription = description;
  let taskPriority = priority;
  let taskDueDate = dueDate;
  const id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();

  let done = false;

  const toggleStatus = () => {
    done = !done;
  };

  // Get task properties
  const getProject = () => projectID;
  const getName = () => taskName;
  const getDescription = () => taskDescription;
  const getPriority = () => taskPriority;
  const getDueDate = () => taskDueDate;
  const getID = () => id;

  // Set task properties
  const setProject = (string) => {
    projectID = string;
  };

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

  return {
    getProject,
    getName,
    getDescription,
    getPriority,
    getDueDate,
    getID,
    setProject,
    setName,
    setDescription,
    setPriority,
    setDueDate,
    toggleStatus,
  };
};

const projectFactory = function projectFactory(name) {
  let projectName = name;
  let tasks = [];
  const projectID = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();

  function addTask(taskName) {
    const newTask = taskFactory(projectID, taskName);
    tasks.push(newTask);
    return newTask;
  }

  // Delete task by ID
  // Mutates the array!
  function deleteTask(id) {
    tasks = tasks.filter((task) => task.getID() !== id);
  }

  // Get project properties
  const getName = () => projectName;
  const getTasks = () => tasks;
  const getID = () => projectID;

  // Set project properties
  const setName = (string) => {
    projectName = string;
  };

  return {
    setName,
    addTask,
    deleteTask,
    getName,
    getTasks,
    getID,
  };
};

const projectManager = (() => {
  let projects = [];

  function addProject(name) {
    const newProject = projectFactory(name);
    projects.push(newProject);
    return newProject;
  }

  function deleteProject(id) {
    projects = projects.filter((project) => project.getID() !== id);
  }

  const getProjects = () => projects;
  // delete project

  return { addProject, getProjects };
})();




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
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen */ "./src/screen.js");



const project1 = _task__WEBPACK_IMPORTED_MODULE_0__.projectManager.addProject('My first project');
const project2 = _task__WEBPACK_IMPORTED_MODULE_0__.projectManager.addProject('My second project');
project1.addTask('Water the plants');
project1.addTask('Exterminate all the silverfish');

(0,_screen__WEBPACK_IMPORTED_MODULE_1__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDSEQsaUVBQWUsY0FBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBcEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sd0RBQVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ1M7QUFDTjtBQUNzQjs7QUFFakQ7QUFDQSxNQUFNLDZEQUFpQjtBQUN2QixXQUFXLDZEQUFpQjtBQUM1Qjs7QUFFQTtBQUNBLGlEQUFpRCwrQ0FBRyxLQUFLOztBQUV6RDtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUyw4REFBZTtBQUN4Qjs7QUFFQSxpRUFBZSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7QUM1QmM7O0FBRS9CO0FBQ0EscUNBQXFDLHNEQUFVO0FBQy9DOztBQUVBLGlFQUFlLFFBQVE7Ozs7Ozs7Ozs7Ozs7OztBQ05pQjs7QUFFeEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLDZEQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q0k7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0RBQUk7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnREFBSTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRXNEOzs7Ozs7O1VDeEh2RDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xRTtBQUMvQjs7QUFFdEMsaUJBQWlCLDREQUF5QjtBQUMxQyxpQkFBaUIsNERBQXlCO0FBQzFDO0FBQ0E7O0FBRUEsbURBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvc2NyZWVuLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJpbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vdGFzayc7XG5cbmNvbnN0IHJlbW92ZVRhc2tPYmplY3QgPSAocHJvamVjdCwgdGFzaykgPT4gcHJvamVjdC5kZWxldGVUYXNrKHRhc2suZ2V0SUQoKSk7XG5cbmNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKHByb2plY3QsIHJlbmRlclByb2plY3RzQ29udGFpbmVyKSB7XG4gIGNvbnN0IHRhc2tzID0gcHJvamVjdC5nZXRUYXNrcygpO1xuICBPYmplY3QudmFsdWVzKHRhc2tzKS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmdldE5hbWUoKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcblxuICAgIC8vIFJlbmRlciBkZWxldGUgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gJ0RlbGV0ZSB0YXNrJztcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBEZWxldGUgdGFzayBpbiBwcm9qZWN0IG9iamVjdFxuICAgICAgcmVtb3ZlVGFza09iamVjdChwcm9qZWN0LCB0YXNrKTtcbiAgICAgIC8vIFJlLXJlbmRlciBwcm9qZWN0cyBjb250YWluZXJcbiAgICAgIHJlbmRlclByb2plY3RzQ29udGFpbmVyKCk7XG4gICAgfSk7XG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG4gIC8vIFRoZSBwcm9qZWN0cyAoYW5kIHRhc2tzKSBhcmUgcmUtcmVuZGVyZWQgY29tcGxldGVseSBldmVyeSB0aW1lIGEgY2hhbmdlIGlzXG4gIC8vIG1hZGUgdG8gdGhlIGRhdGEuIE5vdCBlZmZpY2llbnQuXG5cbiAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lciBmb3IgcmVuZGVyXG4gIHByb2plY3RDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgY29uc3QgcHJvamVjdHMgPSBwcm9qZWN0TWFuYWdlci5nZXRQcm9qZWN0cygpO1xuICBPYmplY3QudmFsdWVzKHByb2plY3RzKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgLy8gUmVuZGVyIHRoZSBwcm9qZWN0IG5hbWVzXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG5cbiAgICAvLyBSZW5kZXIgdGhlIHRhc2tzIGluc2lkZSB0aGUgcHJvamVjdHNcbiAgICByZW5kZXJUYXNrcyhwcm9qZWN0LCByZW5kZXJQcm9qZWN0cyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJQcm9qZWN0cztcbiIsImltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuY29uc3QgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiB0YXNrRmFjdG9yeShcbiAgcHJvamVjdCxcbiAgbmFtZSA9ICdUYXNrJyxcbiAgZGVzY3JpcHRpb24gPSAnJyxcbiAgcHJpb3JpdHkgPSAnbm9ybWFsJyxcbiAgZHVlRGF0ZSA9ICdQTEFDRUhPTERFUicsXG4pIHtcbiAgbGV0IHByb2plY3RJRCA9IHByb2plY3Q7XG4gIGxldCB0YXNrTmFtZSA9IG5hbWU7XG4gIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgbGV0IHRhc2tQcmlvcml0eSA9IHByaW9yaXR5O1xuICBsZXQgdGFza0R1ZURhdGUgPSBkdWVEYXRlO1xuICBjb25zdCBpZCA9IHV1aWQoKTtcblxuICBsZXQgZG9uZSA9IGZhbHNlO1xuXG4gIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHtcbiAgICBkb25lID0gIWRvbmU7XG4gIH07XG5cbiAgLy8gR2V0IHRhc2sgcHJvcGVydGllc1xuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdElEO1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gdGFza05hbWU7XG4gIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gdGFza0Rlc2NyaXB0aW9uO1xuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHRhc2tQcmlvcml0eTtcbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IHRhc2tEdWVEYXRlO1xuICBjb25zdCBnZXRJRCA9ICgpID0+IGlkO1xuXG4gIC8vIFNldCB0YXNrIHByb3BlcnRpZXNcbiAgY29uc3Qgc2V0UHJvamVjdCA9IChzdHJpbmcpID0+IHtcbiAgICBwcm9qZWN0SUQgPSBzdHJpbmc7XG4gIH07XG5cbiAgY29uc3Qgc2V0TmFtZSA9IChzdHJpbmcpID0+IHtcbiAgICB0YXNrTmFtZSA9IHN0cmluZztcbiAgfTtcbiAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAoc3RyaW5nKSA9PiB7XG4gICAgdGFza0Rlc2NyaXB0aW9uID0gc3RyaW5nO1xuICB9O1xuICBjb25zdCBzZXRQcmlvcml0eSA9IChzdHJpbmcpID0+IHtcbiAgICB0YXNrUHJpb3JpdHkgPSBzdHJpbmc7XG4gIH07XG4gIGNvbnN0IHNldER1ZURhdGUgPSAoc3RyaW5nKSA9PiB7XG4gICAgdGFza0R1ZURhdGUgPSBzdHJpbmc7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRQcm9qZWN0LFxuICAgIGdldE5hbWUsXG4gICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgZ2V0UHJpb3JpdHksXG4gICAgZ2V0RHVlRGF0ZSxcbiAgICBnZXRJRCxcbiAgICBzZXRQcm9qZWN0LFxuICAgIHNldE5hbWUsXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0UHJpb3JpdHksXG4gICAgc2V0RHVlRGF0ZSxcbiAgICB0b2dnbGVTdGF0dXMsXG4gIH07XG59O1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIHByb2plY3RGYWN0b3J5KG5hbWUpIHtcbiAgbGV0IHByb2plY3ROYW1lID0gbmFtZTtcbiAgbGV0IHRhc2tzID0gW107XG4gIGNvbnN0IHByb2plY3RJRCA9IHV1aWQoKTtcblxuICBmdW5jdGlvbiBhZGRUYXNrKHRhc2tOYW1lKSB7XG4gICAgY29uc3QgbmV3VGFzayA9IHRhc2tGYWN0b3J5KHByb2plY3RJRCwgdGFza05hbWUpO1xuICAgIHRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgcmV0dXJuIG5ld1Rhc2s7XG4gIH1cblxuICAvLyBEZWxldGUgdGFzayBieSBJRFxuICAvLyBNdXRhdGVzIHRoZSBhcnJheSFcbiAgZnVuY3Rpb24gZGVsZXRlVGFzayhpZCkge1xuICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmdldElEKCkgIT09IGlkKTtcbiAgfVxuXG4gIC8vIEdldCBwcm9qZWN0IHByb3BlcnRpZXNcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHByb2plY3ROYW1lO1xuICBjb25zdCBnZXRUYXNrcyA9ICgpID0+IHRhc2tzO1xuICBjb25zdCBnZXRJRCA9ICgpID0+IHByb2plY3RJRDtcblxuICAvLyBTZXQgcHJvamVjdCBwcm9wZXJ0aWVzXG4gIGNvbnN0IHNldE5hbWUgPSAoc3RyaW5nKSA9PiB7XG4gICAgcHJvamVjdE5hbWUgPSBzdHJpbmc7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXROYW1lLFxuICAgIGFkZFRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgICBnZXROYW1lLFxuICAgIGdldFRhc2tzLFxuICAgIGdldElELFxuICB9O1xufTtcblxuY29uc3QgcHJvamVjdE1hbmFnZXIgPSAoKCkgPT4ge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkobmFtZSk7XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICByZXR1cm4gbmV3UHJvamVjdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaWQpIHtcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5nZXRJRCgpICE9PSBpZCk7XG4gIH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzO1xuICAvLyBkZWxldGUgcHJvamVjdFxuXG4gIHJldHVybiB7IGFkZFByb2plY3QsIGdldFByb2plY3RzIH07XG59KSgpO1xuXG5leHBvcnQgeyB0YXNrRmFjdG9yeSwgcHJvamVjdEZhY3RvcnksIHByb2plY3RNYW5hZ2VyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHRhc2tGYWN0b3J5LCBwcm9qZWN0RmFjdG9yeSwgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Rhc2snO1xuaW1wb3J0IHJlbmRlclByb2plY3RzIGZyb20gJy4vc2NyZWVuJztcblxuY29uc3QgcHJvamVjdDEgPSBwcm9qZWN0TWFuYWdlci5hZGRQcm9qZWN0KCdNeSBmaXJzdCBwcm9qZWN0Jyk7XG5jb25zdCBwcm9qZWN0MiA9IHByb2plY3RNYW5hZ2VyLmFkZFByb2plY3QoJ015IHNlY29uZCBwcm9qZWN0Jyk7XG5wcm9qZWN0MS5hZGRUYXNrKCdXYXRlciB0aGUgcGxhbnRzJyk7XG5wcm9qZWN0MS5hZGRUYXNrKCdFeHRlcm1pbmF0ZSBhbGwgdGhlIHNpbHZlcmZpc2gnKTtcblxucmVuZGVyUHJvamVjdHMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==