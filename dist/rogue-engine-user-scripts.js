(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rogue-engine"), require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["rogue-engine", "three"], factory);
	else if(typeof exports === 'object')
		exports["rogue-engine-user-scripts"] = factory(require("rogue-engine"), require("three"));
	else
		root["rogue-engine-user-scripts"] = factory(root["rogue-engine"], root["three"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_rogue_engine__, __WEBPACK_EXTERNAL_MODULE_three__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Assets/Components/Dungeon.js":
/*!**************************************!*\
  !*** ./Assets/Components/Dungeon.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dungeon)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Scripts_DungeonGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Scripts/DungeonGenerator */ "./Assets/Scripts/DungeonGenerator.js");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", {value, configurable: true});
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};



class Dungeon extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.wallTile = three__WEBPACK_IMPORTED_MODULE_1__.Object3D;
    this.floorTile = three__WEBPACK_IMPORTED_MODULE_1__.Object3D;
    this.player = three__WEBPACK_IMPORTED_MODULE_1__.Object3D;
  }
  start() {
    this.dungeonGenerator = (0,_Scripts_DungeonGenerator__WEBPACK_IMPORTED_MODULE_2__.DungeonGenerator)();
    this.map = this.dungeonGenerator.generate();
    console.log(this.map);
    this.spawnPoint = {x: 0, y: 0};
    this.addWall(0, 0);
    this.addFloor(0, 0);
    this.addDungeonToScene();
    this.player.position.set(this.spawnPoint.x, 0, this.spawnPoint.y);
  }
  addDungeonToScene() {
    for (var x = 0; x < this.map.length; x++) {
      for (var y = 0; y < this.map[0].length; y++) {
        if (this.map[x][y].cellType == "empty") {
          if (this.spawnPoint.x == 0 && this.spawnPoint.y == 0) {
            this.spawnPoint.x = x;
            this.spawnPoint.y = y;
          }
          this.addFloor(x, y);
          if (this.map[x][y + 1] && this.map[x][y + 1].cellType == "wall") {
            this.map[x][y + 1].cellType == "wall-placed";
            this.addWall(x, y + 1);
          }
          if (this.map[x][y - 1] && this.map[x][y - 1].cellType == "wall") {
            this.map[x][y + 1].cellType == "wall-placed";
            this.addWall(x, y - 1);
          }
          if (this.map[x + 1][y] && this.map[x + 1][y].cellType == "wall") {
            this.map[x][y + 1].cellType == "wall-placed";
            this.addWall(x + 1, y);
          }
          if (this.map[x - 1][y] && this.map[x - 1][y].cellType == "wall") {
            this.map[x][y + 1].cellType == "wall-placed";
            this.addWall(x - 1, y);
          }
        }
      }
    }
  }
  addWall(x, y) {
    const wall = this.wallTile.clone();
    wall.position.set(x, 0, y);
    this.object3d.add(wall);
  }
  addFloor(x, y) {
    const floor = this.floorTile.clone();
    floor.position.set(x, 0, y);
    this.object3d.add(floor);
  }
  update() {
  }
}
__decorateClass([
  rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Prop("Object3D")
], Dungeon.prototype, "wallTile", 2);
__decorateClass([
  rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Prop("Object3D")
], Dungeon.prototype, "floorTile", 2);
__decorateClass([
  rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Prop("Object3D")
], Dungeon.prototype, "player", 2);
__name(Dungeon, "Dungeon");
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(Dungeon);


/***/ }),

/***/ "./Assets/Scripts/DungeonGenerator.js":
/*!********************************************!*\
  !*** ./Assets/Scripts/DungeonGenerator.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DungeonGenerator": () => (/* binding */ DungeonGenerator)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {value, configurable: true});
function DungeonGenerator() {
  var MAXSIZE, MINSIZE, ROWS, COLS, BORDER, ATTEMPTS, WALL = "W", EMPTY = "E", ROOMS;
  function isNotOverlapping(floorMap, room) {
    var status = true;
    for (var i = room.row - 1; i < room.row + room.h + 1; i++) {
      for (var j = room.col - 1; j < room.col + room.w + 1; j++) {
        if (floorMap[i][j] !== WALL) {
          status = false;
          break;
        }
      }
    }
    return status;
  }
  __name(isNotOverlapping, "isNotOverlapping");
  function linkStraightH(floorMap, r1, r2) {
    var inc = r1.col < r2.col ? 1 : -1;
    for (var i = r1.col; i !== r2.col; i += inc) {
      floorMap[r1.row][i] = EMPTY;
    }
  }
  __name(linkStraightH, "linkStraightH");
  ;
  function linkStraightV(floorMap, r1, r2) {
    var inc = r1.row < r2.row ? 1 : -1;
    for (var i = r1.row; i !== r2.row; i += inc) {
      floorMap[i][r1.col] = EMPTY;
    }
  }
  __name(linkStraightV, "linkStraightV");
  ;
  function link2Steps(floorMap, r1, r2) {
    var flipCoin = Math.floor(Math.random() * 2);
    if (r1.row > r2.row && r1.col > r2.col) {
      if (flipCoin) {
        for (var i = r1.row - 1; i >= r2.row + r2.h - 1; i--)
          floorMap[i][r1.col] = EMPTY;
        for (var i = r1.col - 1; i >= r2.col + r2.w; i--)
          floorMap[r2.row + r2.h - 1][i] = EMPTY;
      } else {
        for (var i = r1.col - 1; i >= r2.col + r2.w - 1; i--)
          floorMap[r1.row][i] = EMPTY;
        for (var i = r1.row - 1; i >= r2.row + r2.h; i--)
          floorMap[i][r2.col + r2.w - 1] = EMPTY;
      }
    } else if (r1.row > r2.row && r1.col < r2.col) {
      if (flipCoin) {
        for (var i = r1.row - 1; i >= r2.row + r2.h - 1; i--)
          floorMap[i][r1.col + r1.w - 1] = EMPTY;
        for (var i = r1.col + r1.w; i < r2.col; i++)
          floorMap[r2.row + r2.h - 1][i] = EMPTY;
      } else {
        for (var i = r1.col + r1.w; i <= r2.col; i++)
          floorMap[r1.row][i] = EMPTY;
        for (var i = r1.row - 1; i >= r2.row + r2.h; i--)
          floorMap[i][r2.col] = EMPTY;
      }
    } else {
      return false;
    }
    return true;
  }
  __name(link2Steps, "link2Steps");
  ;
  function linkRooms(floorMap, r1, r2) {
    if (r1.row >= r2.row && r1.row < r2.row + r2.h) {
      linkStraightH(floorMap, r1, r2);
    } else if (r2.row >= r1.row && r2.row < r1.row + r1.h) {
      linkStraightH(floorMap, r2, r1);
    } else if (r1.col >= r2.col && r1.col < r2.col + r2.w) {
      linkStraightV(floorMap, r1, r2);
    } else if (r2.col >= r1.col && r2.col < r1.col + r1.w) {
      linkStraightV(floorMap, r2, r1);
    } else {
      if (!link2Steps(floorMap, r1, r2))
        link2Steps(floorMap, r2, r1);
    }
  }
  __name(linkRooms, "linkRooms");
  function randomEvenOdd(min, max) {
    if (max === min)
      return max;
    return min + Math.floor(Math.random() * Math.floor((max - min) / 2 + 1)) * 2;
  }
  __name(randomEvenOdd, "randomEvenOdd");
  ;
  function addRoom(floorMap) {
    var out = void 0;
    var h = randomEvenOdd(MINSIZE, MAXSIZE);
    var w = randomEvenOdd(MINSIZE, MAXSIZE);
    var room = {
      h,
      w,
      row: randomEvenOdd(0, ROWS - h - 2 * BORDER) + BORDER,
      col: randomEvenOdd(0, COLS - w - 2 * BORDER) + BORDER
    };
    if (isNotOverlapping(floorMap, room)) {
      for (var i = room.row; i < room.row + room.h; i++) {
        for (var j = room.col; j < room.col + room.w; j++) {
          floorMap[i][j] = EMPTY;
        }
      }
      out = room;
    }
    return out;
  }
  __name(addRoom, "addRoom");
  ;
  var DungeonGenerator2 = {
    generate: function(config) {
      var cfg = config ? config : {};
      ROWS = cfg.rows || 31;
      COLS = cfg.cols || 51;
      MAXSIZE = cfg.maxRoomSize || 7;
      MINSIZE = cfg.minRoomSize || 3;
      BORDER = cfg.padding || 2;
      ATTEMPTS = cfg.maxAttempts || 500;
      ROOMS = cfg.rooms || 15;
      var floorMap = [];
      for (var i = 0; i < ROWS; i++) {
        var r = [];
        for (var j = 0; j < COLS; j++) {
          r.push(WALL);
        }
        floorMap.push(r);
      }
      var roomsToLink = [];
      var roomsLinked = [];
      var i = 0;
      var r = 0;
      while (i < ATTEMPTS && r < ROOMS) {
        var newRooom = addRoom(floorMap);
        if (newRooom) {
          roomsToLink.push(newRooom);
          r++;
        }
        i++;
      }
      function distance(a, b) {
        var d2 = b.row - a.row ^ 2 + (b.col - a.col) ^ 2;
        return Math.sqrt(d2);
      }
      __name(distance, "distance");
      ;
      roomsLinked.push(roomsToLink.pop());
      while (roomsToLink.length) {
        var r1 = roomsLinked[roomsLinked.length - 1];
        var r2 = roomsToLink.sort(function(a, b) {
          if (distance(r1, a) < distance(r1, b))
            return 1;
          if (distance(r1, a) > distance(r1, b))
            return -1;
          return 0;
        }).pop();
        linkRooms(floorMap, r1, r2);
        roomsLinked.push(r2);
        r1 = r2;
      }
      return floorMap.map(function(row, i2) {
        return row.map(function(cell, j2) {
          return {cellType: cell === WALL ? "wall" : "empty"};
        });
      });
    }
  };
  return DungeonGenerator2;
}
__name(DungeonGenerator, "DungeonGenerator");



/***/ }),

/***/ "rogue-engine":
/*!******************************************************************************************************************!*\
  !*** external {"commonjs":"rogue-engine","commonjs2":"rogue-engine","amd":"rogue-engine","root":"rogue-engine"} ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_rogue_engine__;

/***/ }),

/***/ "three":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"three","commonjs2":"three","amd":"three","root":"three"} ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"rogue-engine-user-scripts": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_name_"] = self["webpackChunk_name_"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./Assets/Components/Dungeon.js");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./Assets/Scripts/DungeonGenerator.js");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=rogue-engine-user-scripts.js.map