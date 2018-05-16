/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.ts");
var Tunnel_1 = __webpack_require__(/*! ./Tunnel */ "./src/Tunnel.ts");
var Wall_1 = __webpack_require__(/*! ./Wall */ "./src/Wall.ts");
var Level_1 = __webpack_require__(/*! ./Level */ "./src/Level.ts");
var Game = (function () {
    function Game() {
        var _this = this;
        this.STATE_INIT = "init";
        this.STATE_NOT_INIT = "something";
        this._renderer = new THREE.WebGLRenderer();
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._gameObjects = new Array();
        console.count("game construct!");
        this._state = this.STATE_INIT;
        this._level = null;
        var pointLight = new THREE.PointLight(0xff0000, 1, 100);
        pointLight.position.set(0, 0, 50);
        this._scene.add(pointLight);
        this._camera.position.z = 50;
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
        requestAnimationFrame(function () { return _this._gameloop(); });
    }
    Game.getGame = function () {
        if (!Game._object) {
            Game._object = new Game();
        }
        return Game._object;
    };
    Game.prototype.getCamera = function () {
        return this._camera;
    };
    Game.prototype.getScene = function () {
        return this._scene;
    };
    Game.prototype._init = function () {
        this._gameObjects.push(new Player_1.default(), new Tunnel_1.default());
        this._level = new Level_1.default(1);
        this._state = this.STATE_NOT_INIT;
    };
    Game.prototype._gameloop = function () {
        var _this = this;
        if (this._state === this.STATE_INIT) {
            this._init();
        }
        if (this._level) {
            this._level.update();
        }
        for (var _i = 0, _a = this._gameObjects; _i < _a.length; _i++) {
            var object = _a[_i];
            object.update();
            if (object instanceof Player_1.default) {
                for (var _b = 0, _c = this._gameObjects; _b < _c.length; _b++) {
                    var otherObject = _c[_b];
                    if (otherObject instanceof Wall_1.default) {
                        var boxObj = object.getBoundingBox();
                        var boxOthObj = otherObject.getBoundingBox();
                        if (boxObj.intersectsBox(boxOthObj)) {
                            object.die();
                        }
                    }
                }
            }
        }
        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(function () { return _this._gameloop(); });
    };
    Game.prototype.addGameObject = function (object) {
        this._gameObjects.push(object);
    };
    Game.prototype.removeGameObject = function (target) {
        for (var _i = 0, _a = this._gameObjects; _i < _a.length; _i++) {
            var object = _a[_i];
            if (target === object) {
                var index = this._gameObjects.indexOf(target);
                this._gameObjects.splice(index, 1);
                target.remove();
            }
        }
    };
    return Game;
}());
exports.default = Game;


/***/ }),

/***/ "./src/GameObject.ts":
/*!***************************!*\
  !*** ./src/GameObject.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var GameObject = (function () {
    function GameObject(geometry, material) {
        this._game = Game_1.default.getGame();
        this._geometry = geometry;
        this._mesh = new THREE.Mesh(geometry, material);
        this._boundingBox = new THREE.Box3().setFromObject(this._mesh);
        this._game.getScene().add(this._mesh);
    }
    GameObject.prototype.getGeometry = function () {
        return this._geometry;
    };
    GameObject.prototype.getBoundingBox = function () {
        return this._boundingBox;
    };
    GameObject.prototype.remove = function () {
        this._game.getScene().remove(this._mesh);
    };
    GameObject.prototype.getPosition = function () {
        return this._mesh.position;
    };
    GameObject.prototype.update = function () {
        this._boundingBox.setFromObject(this._mesh);
    };
    return GameObject;
}());
exports.default = GameObject;


/***/ }),

/***/ "./src/Level.ts":
/*!**********************!*\
  !*** ./src/Level.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var Wall_1 = __webpack_require__(/*! ./Wall */ "./src/Wall.ts");
var WallAnimationLeft_1 = __webpack_require__(/*! ./WallAnimationLeft */ "./src/WallAnimationLeft.ts");
var WallAnimationRight_1 = __webpack_require__(/*! ./WallAnimationRight */ "./src/WallAnimationRight.ts");
var Level = (function () {
    function Level(difficulty) {
        this._timer = new THREE.Clock(false);
        this._timeHistory = 0;
        this._game = Game_1.default.getGame();
        this._difficulty = difficulty;
        this._timer.start();
    }
    Level.prototype.nextLevel = function () {
        this._difficulty++;
    };
    Level.prototype._addWall = function () {
        var animation;
        Math.random() > 0.5 ? animation = new WallAnimationRight_1.default() : animation = new WallAnimationLeft_1.default();
        this._game.addGameObject(new Wall_1.default(animation));
    };
    Level.prototype.update = function () {
        var roundedTime = Math.floor(this._timer.getElapsedTime());
        if (roundedTime % 3 == 0 && roundedTime != this._timeHistory) {
            this._timeHistory = roundedTime;
            this._addWall();
        }
    };
    return Level;
}());
exports.default = Level;


/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./src/GameObject.ts");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial()) || this;
        _this._mouse = new THREE.Vector2();
        _this._mesh.position.z = _this._game.getCamera().position.z - 10;
        window.addEventListener('mousemove', function (e) { _this._traceMouse(e); });
        return _this;
    }
    Player.prototype._traceMouse = function (e) {
        this._mouse.x = (e.x / window.innerWidth) * 2 - 1;
        this._mouse.y = -(e.y / window.innerHeight) * 2 + 1;
        var worldXEdge = 6;
        var worldYEdge = 6;
        if (window.innerWidth <= 900 && window.innerWidth > 600) {
            worldXEdge = 5;
        }
        else if (window.innerWidth <= 600 && window.innerWidth > 500) {
            worldXEdge = 3;
        }
        else if (window.innerWidth <= 500 && window.innerWidth > 400) {
            worldXEdge = 2;
        }
        else if (window.innerWidth <= 400 && window.innerWidth > 299) {
            worldXEdge = 1.5;
        }
        else if (window.innerWidth < 300) {
        }
        this._mesh.position.x = this._mouse.x * worldXEdge;
        this._mesh.position.y = this._mouse.y * worldYEdge;
    };
    Player.prototype.die = function () {
        this.remove();
    };
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Player;
}(GameObject_1.default));
exports.default = Player;


/***/ }),

/***/ "./src/Tunnel.ts":
/*!***********************!*\
  !*** ./src/Tunnel.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./src/GameObject.ts");
var Tunnel = (function (_super) {
    __extends(Tunnel, _super);
    function Tunnel() {
        var _this = _super.call(this, new THREE.CylinderGeometry(10, 10, 90, 32, 1, true), new THREE.MeshLambertMaterial()) || this;
        _this._mesh.material.side = THREE.BackSide;
        _this._mesh.rotation.x = 1.57;
        return _this;
    }
    Tunnel.prototype.update = function () {
    };
    return Tunnel;
}(GameObject_1.default));
exports.default = Tunnel;


/***/ }),

/***/ "./src/Wall.ts":
/*!*********************!*\
  !*** ./src/Wall.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./src/GameObject.ts");
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(animation) {
        var _this = _super.call(this, new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial()) || this;
        _this._animation = animation;
        _this._maxDistanceFromCamera = _this._game.getCamera().position.z - 8;
        return _this;
    }
    Wall.prototype.getPosition = function () {
        return this._mesh.position;
    };
    Wall.prototype.getMaxDistance = function () {
        return this._maxDistanceFromCamera;
    };
    Wall.prototype.update = function () {
        _super.prototype.update.call(this);
        this._animation.update(this);
    };
    return Wall;
}(GameObject_1.default));
exports.default = Wall;


/***/ }),

/***/ "./src/WallAnimationLeft.ts":
/*!**********************************!*\
  !*** ./src/WallAnimationLeft.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var WallAnimationLeft = (function () {
    function WallAnimationLeft() {
        this._widthdrawing = false;
        this._init = true;
        this._game = Game_1.default.getGame();
        this._startPositionX = -15;
        this._endPositionX = -6;
    }
    WallAnimationLeft.prototype.depthAnimation = function (wall) {
        var position = wall.getPosition();
        if (position.z < wall.getMaxDistance()) {
            position.z += 0.1;
        }
        else {
            this._widthdrawing = true;
            this.widthdrawAnimation(wall);
        }
    };
    WallAnimationLeft.prototype.insertAnimation = function (wall) {
        var position = wall.getPosition();
        if (this._init) {
            position.x = this._startPositionX;
            this._init = false;
        }
        if (position.x <= this._endPositionX && this._widthdrawing == false) {
            position.x += 0.05;
        }
    };
    WallAnimationLeft.prototype.widthdrawAnimation = function (wall) {
        var position = wall.getPosition();
        position.x -= 0.2;
        if (position.x < this._startPositionX) {
            this._game.removeGameObject(wall);
        }
    };
    WallAnimationLeft.prototype.update = function (wall) {
        this.insertAnimation(wall);
        this.depthAnimation(wall);
    };
    return WallAnimationLeft;
}());
exports.default = WallAnimationLeft;


/***/ }),

/***/ "./src/WallAnimationRight.ts":
/*!***********************************!*\
  !*** ./src/WallAnimationRight.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var WallAnimationRight = (function () {
    function WallAnimationRight() {
        this._widthdrawing = false;
        this._init = true;
        this._game = Game_1.default.getGame();
        this._startPositionX = 15;
        this._endPositionX = 6;
    }
    WallAnimationRight.prototype.depthAnimation = function (wall) {
        var position = wall.getPosition();
        if (position.z < wall.getMaxDistance()) {
            position.z += 0.1;
        }
        else {
            this._widthdrawing = true;
            this.widthdrawAnimation(wall);
        }
    };
    WallAnimationRight.prototype.insertAnimation = function (wall) {
        var position = wall.getPosition();
        if (this._init) {
            position.x = this._startPositionX;
            this._init = false;
        }
        if (position.x >= this._endPositionX && this._widthdrawing == false) {
            position.x -= 0.05;
        }
    };
    WallAnimationRight.prototype.widthdrawAnimation = function (wall) {
        var position = wall.getPosition();
        position.x += 0.2;
        if (position.x > this._startPositionX) {
            this._game.removeGameObject(wall);
        }
    };
    WallAnimationRight.prototype.update = function (wall) {
        this.insertAnimation(wall);
        this.depthAnimation(wall);
    };
    return WallAnimationRight;
}());
exports.default = WallAnimationRight;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
window.addEventListener('load', function () {
    Game_1.default.getGame();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R1bm5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbEFuaW1hdGlvbkxlZnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dhbGxBbmltYXRpb25SaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQSxzRUFBNkI7QUFDN0Isc0VBQTZCO0FBQzdCLGdFQUEwQjtBQUMxQixtRUFBNEI7QUFFNUI7SUEyQkk7UUFBQSxpQkFjQztRQXZDTyxlQUFVLEdBQVksTUFBTTtRQUM1QixtQkFBYyxHQUFZLFdBQVc7UUFFckMsY0FBUyxHQUEwQixJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7UUFDNUQsV0FBTSxHQUFpQixJ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QUFJLEtBQUssRUFBQztZQUMvRCxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUk7U0FDckI7SUFDTCxDQUFDO0lBRU0sK0NBQWtCLEdBQXpCLFVBQTBCLElBQVc7UUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUVqQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUc7UUFFakIsSUFBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRU0sbUNBQU0sR0FBYixVQUFjLElBQVc7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RERCxnRUFBeUI7QUFHekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUM1QixjQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2xCLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL0dhbWVPYmplY3QnXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJ1xuaW1wb3J0IFR1bm5lbCBmcm9tICcuL1R1bm5lbCdcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCc7XG5pbXBvcnQgTGV2ZWwgZnJvbSAnLi9MZXZlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgc3RhdGljIF9vYmplY3QgOiBHYW1lO1xuICAgIHByaXZhdGUgU1RBVEVfSU5JVCA6IHN0cmluZyA9IFwiaW5pdFwiIC8vbm90IHN0YXRpYyBiZWNhdXNlIHRoZSBhc3NpZ25tZW50IG9mIHN0YXRpYyB2YWx1ZXMgdG8gbm9uLXN0YXRpYyB2YWx1ZXNcbiAgICBwcml2YXRlIFNUQVRFX05PVF9JTklUIDogc3RyaW5nID0gXCJzb21ldGhpbmdcIiAvL2RvZXNuJ3QgZ28gcmlnaHQgZm9yIHNvbWUgcmVhc29uIDovIFxuICAgIHByaXZhdGUgX3N0YXRlIDogc3RyaW5nIHwgbnVsbFxuICAgIHByaXZhdGUgX3JlbmRlcmVyIDogVEhSRUUuV2ViR0xSZW5kZXJlciAgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpXG4gICAgcHJpdmF0ZSBfc2NlbmUgOiBUSFJFRS5TY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpIFxuICAgIHByaXZhdGUgX2NhbWVyYSA6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKSBcbiAgICBwcml2YXRlIF9nYW1lT2JqZWN0cyA6IEFycmF5PEdhbWVPYmplY3Q+ID0gbmV3IEFycmF5PEdhbWVPYmplY3Q+KClcbiAgICBwcml2YXRlIF9sZXZlbCA6IExldmVsIHwgbnVsbFxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRHYW1lKCkgOiBHYW1lIHtcbiAgICAgICAgaWYoISBHYW1lLl9vYmplY3Qpe1xuICAgICAgICAgICAgR2FtZS5fb2JqZWN0ID0gbmV3IEdhbWUoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEdhbWUuX29iamVjdDsgICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2FtZXJhKCkgOiBUSFJFRS5DYW1lcmEge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FtZXJhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTY2VuZSgpIDogVEhSRUUuU2NlbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmU7IFxuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IFxuICAgICAgICBjb25zb2xlLmNvdW50KFwiZ2FtZSBjb25zdHJ1Y3QhXCIpXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5TVEFURV9JTklUXG4gICAgICAgIHRoaXMuX2xldmVsID0gbnVsbFxuXG4gICAgICAgIGxldCBwb2ludExpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoIDB4ZmYwMDAwLCAxLCAxMDAgKVxuICAgICAgICBwb2ludExpZ2h0LnBvc2l0aW9uLnNldCggMCwgMCwgNTAgKVxuICAgICAgICB0aGlzLl9zY2VuZS5hZGQoIHBvaW50TGlnaHQgKSBcblxuICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueiA9IDUwXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9yZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9nYW1lbG9vcCgpKVxuICAgIH0gXG5cbiAgICBwcml2YXRlIF9pbml0KCkge1xuICAgICAgICB0aGlzLl9nYW1lT2JqZWN0cy5wdXNoKG5ldyBQbGF5ZXIoKSwgbmV3IFR1bm5lbCgpKVxuICAgICAgICB0aGlzLl9sZXZlbCA9IG5ldyBMZXZlbCgxKVxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuU1RBVEVfTk9UX0lOSVRcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nYW1lbG9vcCgpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGUgPT09IHRoaXMuU1RBVEVfSU5JVCkge1xuICAgICAgICAgICAgdGhpcy5faW5pdCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9sZXZlbCl7XG4gICAgICAgICAgICB0aGlzLl9sZXZlbC51cGRhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBvYmplY3Qgb2YgdGhpcy5fZ2FtZU9iamVjdHMpe1xuICAgICAgICAgICAgb2JqZWN0LnVwZGF0ZSgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vTG9naWMgYmVoaW5kIGNvbGxpc2lvbiBzaG91bGQgYmUgcmVmYWN0b3JlZCB0byBhIHNlcGVyYXRlIGZ1bmN0aW9uXG4gICAgICAgICAgICBpZihvYmplY3QgaW5zdGFuY2VvZiBQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvdGhlck9iamVjdCBvZiB0aGlzLl9nYW1lT2JqZWN0cykge1xuICAgICAgICAgICAgICAgICAgICBpZihvdGhlck9iamVjdCBpbnN0YW5jZW9mIFdhbGwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJveE9iaiA9IG9iamVjdC5nZXRCb3VuZGluZ0JveCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94T3RoT2JqID0gb3RoZXJPYmplY3QuZ2V0Qm91bmRpbmdCb3goKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJveE9iai5pbnRlcnNlY3RzQm94KGJveE90aE9iaikpIHsgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5kaWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSwgdGhpcy5fY2FtZXJhKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fZ2FtZWxvb3AoKSlcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkR2FtZU9iamVjdChvYmplY3QgOiBHYW1lT2JqZWN0KSA6IHZvaWQge1xuICAgICAgICB0aGlzLl9nYW1lT2JqZWN0cy5wdXNoKG9iamVjdClcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHJlbW92ZUdhbWVPYmplY3QodGFyZ2V0IDogR2FtZU9iamVjdCkgOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMuX2dhbWVPYmplY3RzKSB7XG4gICAgICAgICAgICBpZih0YXJnZXQgPT09IG9iamVjdCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fZ2FtZU9iamVjdHMuaW5kZXhPZih0YXJnZXQpXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZU9iamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBHYW1lT2JqZWN0IHtcbiAgICBwcm90ZWN0ZWQgX21lc2ggOiBUSFJFRS5NZXNoXG4gICAgcHJvdGVjdGVkIF9nZW9tZXRyeSA6IFRIUkVFLkdlb21ldHJ5XG4gICAgcHJvdGVjdGVkIF9nYW1lIDogR2FtZSA9IEdhbWUuZ2V0R2FtZSgpXG4gICAgcHJvdGVjdGVkIF9ib3VuZGluZ0JveCA6IFRIUkVFLkJveDNcblxuICAgIHB1YmxpYyBnZXRHZW9tZXRyeSgpIDogVEhSRUUuR2VvbWV0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2VvbWV0cnlcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Qm91bmRpbmdCb3goKSA6IFRIUkVFLkJveDMge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRpbmdCb3hcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciggZ2VvbWV0cnkgOiBUSFJFRS5HZW9tZXRyeSwgbWF0ZXJpYWwgOiBUSFJFRS5NYXRlcmlhbCkge1xuICAgICAgICB0aGlzLl9nZW9tZXRyeSA9IGdlb21ldHJ5XG4gICAgICAgIHRoaXMuX21lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gICAgICAgIC8vVXNpbmcgLnNldEZyb21PYmplY3Qgb3ZlciBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3ggYmVjYXVzZSB5b3UgaGF2ZSB0byBcbiAgICAgICAgLy9yZWNvbXB1dGUgdGhlIGJvdW5kaW5nQm94IG1hbnVhbGx5IHdoaWxlIHlvdSBjYW4gcmVjb21wdXRlIC5zZXRGcm9tT2JqZWN0IGJ5IGNhbGxpbmcgaXQgYWdhaW5cbiAgICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8xMTcwIFxuICAgICAgICB0aGlzLl9ib3VuZGluZ0JveCA9IG5ldyBUSFJFRS5Cb3gzKCkuc2V0RnJvbU9iamVjdCh0aGlzLl9tZXNoKVxuICAgICAgICBcbiAgICAgICAgLy9ITU1NOiB0aGlzIGNhdXNlcyB0aGUgcGFyYWRveCB0aGF0IG1ha2VzIGl0IHJhdGhlciBoYXJkIGZvciBtZSB0byBjcmVhdGUgbmV3IGdhbWVPYmplY3RzIGluc2lkZSBvZiB0aGUgZ2FtZVxuICAgICAgICB0aGlzLl9nYW1lLmdldFNjZW5lKCkuYWRkKHRoaXMuX21lc2gpXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhbWUuZ2V0U2NlbmUoKS5yZW1vdmUodGhpcy5fbWVzaClcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSA6IFRIUkVFLlZlY3RvcjMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaC5wb3NpdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLl9ib3VuZGluZ0JveC5zZXRGcm9tT2JqZWN0KHRoaXMuX21lc2gpXG4gICAgfVxuXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5pbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5pbXBvcnQgV2FsbEFuaW1hdGlvbkxlZnQgZnJvbSAnLi9XYWxsQW5pbWF0aW9uTGVmdCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uUmlnaHQgZnJvbSAnLi9XYWxsQW5pbWF0aW9uUmlnaHQnXG5cbi8vYSBsZXZlbCBvbmx5IHRha2VzIGNhcmUgb2YgaG93IGFuZCB3aGljaCBvYmplY3RzIGFyZSBzcGF3bmVkIGludG8gdGhlIGdhbWUgXG4vL3lvdSBzaG91bGQgYmUgYWJsZSB0byBnaXZlIGEgZGlmZmljdWx0eSB0byBhIGxldmVsIGFuZCB0aGUgbGV2ZWwgd2lsbCBhY3QgYmFzZWQgb24gZGlmZmljdWx0eVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWwge1xuICAgIHByaXZhdGUgX2RpZmZpY3VsdHkgOiBudW1iZXJcbiAgICBwcml2YXRlIF90aW1lciA6IFRIUkVFLkNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKGZhbHNlKVxuICAgIHByaXZhdGUgX3RpbWVIaXN0b3J5IDogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgX2dhbWUgOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcblxuICAgIHB1YmxpYyBuZXh0TGV2ZWwoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLl9kaWZmaWN1bHR5KytcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihkaWZmaWN1bHR5IDogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5fZGlmZmljdWx0eSA9IGRpZmZpY3VsdHlcbiAgICAgICAgdGhpcy5fdGltZXIuc3RhcnQoKVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZFdhbGwoKSA6IHZvaWQge1xuICAgICAgICBsZXQgYW5pbWF0aW9uIDogV2FsbEFuaW1hdGlvbiBcbiAgICAgICAgTWF0aC5yYW5kb20oKSA+IDAuNSA/IGFuaW1hdGlvbiA9IG5ldyBXYWxsQW5pbWF0aW9uUmlnaHQoKSA6IGFuaW1hdGlvbiA9IG5ldyBXYWxsQW5pbWF0aW9uTGVmdCgpXG4gICAgICAgIHRoaXMuX2dhbWUuYWRkR2FtZU9iamVjdChuZXcgV2FsbChhbmltYXRpb24pKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xuICAgICAgICAvL3doZW4gaXQgY29tZXMgdG8gc3BlZWQgZmxvb3JpbmcgdGhlIHRpbWUgd2lsbCBjYXVzZSBhIGxvdCBvZiB0cm91YmxlIC4uLiBcbiAgICAgICAgLy9zdGlsbCB0aGlua2luZyB3aGF0IHdvdWxkIGJlIGJldHRlclxuICAgICAgICAvL3NpbmNlIGRlbHRhIGlzIHVwZGF0ZWQgZXZlcnkgdGltZSBJIGNhbGwgZ2V0RWxhcHNlZFRpbWUgbWF5YmUgSSBzaG91bGQganVzdCBjcmVhdGUgbXkgb3duIGRlbHRhPyBcbiAgICAgICAgbGV0IHJvdW5kZWRUaW1lID0gTWF0aC5mbG9vcih0aGlzLl90aW1lci5nZXRFbGFwc2VkVGltZSgpKVxuXG4gICAgICAgIGlmKHJvdW5kZWRUaW1lICUgMyA9PSAwICYmIHJvdW5kZWRUaW1lICE9IHRoaXMuX3RpbWVIaXN0b3J5KXtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVIaXN0b3J5ID0gcm91bmRlZFRpbWVcbiAgICAgICAgICAgIHRoaXMuX2FkZFdhbGwoKVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL0dhbWVPYmplY3QnXG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIEdhbWVPYmplY3Qge1xuICAgIHByaXZhdGUgX21vdXNlIDogVEhSRUUuVmVjdG9yMiA9IG5ldyBUSFJFRS5WZWN0b3IyKClcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLjUsIDEuNSwgMS41KSwgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCkpXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueiA9IHRoaXMuX2dhbWUuZ2V0Q2FtZXJhKCkucG9zaXRpb24ueiAtIDEwO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHt0aGlzLl90cmFjZU1vdXNlKGUpIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJhY2VNb3VzZShlIDogTW91c2VFdmVudCkgOiB2b2lkIHtcbiAgICAgICAgLy9ub3JtYWxpemVkIG1vdXNlIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vcmV0dXJucyBudW1iZXIgYmV0d2VlbiAtMSAmIDEgcmVwcmVzZW50aW5nIHBvc2l0aW9uIG9uIHNjcmVlbiBcbiAgICAgICAgLy93aGVyZSAwLDAgaXMgdGhlIG1pZGRsZVxuICAgICAgICAvL2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2NvcmUvUmF5Y2FzdGVyXG4gICAgICAgIHRoaXMuX21vdXNlLnggPSAoZS54IC8gd2luZG93LmlubmVyV2lkdGgpICogMiAtIDFcbiAgICAgICAgdGhpcy5fbW91c2UueSA9IC0gKGUueSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiAyICsgMVxuXG4gICAgICAgIC8vdGhlIHdob2xlIHBvc2l0aW9uaW5nIG9mIHRoZSBnYW1lIGlzIGJhc2VkIG9uIHRoZSB0dW5uZWwgd2hpY2ggaGFzIGEgcmFkaXVzIG9mIDEwXG4gICAgICAgIC8vdGhlIGVkZ2VzICh5KSBvZiB0aGUgdHVubmVsIG9uIHRoZSBjdXJyZW50IHogaW5kZXggb2YgdGhlIHBsYXllciBhcmUgbm90IDEwMCUgb24gc2NyZWVuIFxuICAgICAgICAvL3RoZSB2aXNpYmlsaXR5IG9mIGVkZ2VzICh4KSBvZiB0aGUgdHVubmVsIGRlcGVuZHMgb24gdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW5cbiAgICAgICAgLy90aGUgY29ybmVycyBvZiB0aGUgc2NyZWVuIGFyZSBub3QgMTAwJSBhdmFpbGFibGUgYmVjYXVzZSB0aGUgZWRnZSBvZiB0aGUgdHVubmVsIGN1dHMgdGhlbSBvZiBvbiB0aGUgY3VycmVudCB6IGluZGV4IG9mIHRoZSBwbGF5ZXJcbiAgICAgICAgbGV0IHdvcmxkWEVkZ2UgPSA2XG4gICAgICAgIGxldCB3b3JsZFlFZGdlID0gNlxuXG4gICAgICAgIC8vSSBhbSBzdGlsbCBub3Qgc3VyZSB3aHkgYnV0IGEgdHJhbnNmb3JtYXRpb24gb2Ygc3BlY2lmaWNhbGx5IHRoZSBzY3JlZW4gd2lkdGggaGFzIGEgaHVnZSBpbXBhY3Qgb24gcGxheWVyIG1vdmVtZW50XG4gICAgICAgIC8vaXQgY291bGQgYmUgYmVjYXVzZSBvZiB0aGUgY2FsY3VsYXRpb25zIG9mIHRoZSBwZXJzcGVjdGl2ZSBjYW1lcmEgc2luY2UgYSBoaWdoZXIgd2lkdGggbWVhbnMgdGhhdCBtb3JlIG9mIHRoZSB3b3JsZCBpcyBzaG93biB0byB0aGUgcGxheWVyXG4gICAgICAgIC8vZm9yIGEgdmlld3BvcnQgd2hlcmUgeCA8IDkwMHB4IHRoZXJlIG5lZWQgdG8gYmUgc21hbGxlciB3b3JsZCBlZGdlc1xuICAgICAgICAvL05PVEU6IGlmIEkgZXZlciBoYXZlIHNvbWUgdGltZSBsZWZ0IEkgY291bGQgcGxvdCB0aGUgZGVzaXJlZCBlZGdlcyBvZiBhdCBjZXJ0YWluIHZpZXdwb3J0IGRyYXcgYSBncmFwaCBhbmQgY3JlYXRlIGEgZm9ydW1sYSBmb3IgdGhpc1xuICAgICAgICAvL3ZpZXdwb3J0cyBhcmUgd2F5IGVhc2llciBmb3Igbm93IDozIFxuXG4gICAgICAgIC8vVE9ETzogZmluZCBhIHdheSB0byByZWZhY3RvciB0aGlzIGlmIHBvc3NpYmxlXG4gICAgICAgIC8vbm90IHN1cmUgaG93IHlldCwgYSBzd2l0Y2ggb25seSBhbGxvd3MgMSB2YWx1ZSBidXQgdGhlcmUgc2hvdWxkIGJlIGEgcHJldHRpZXIgd2F5IG91dCB0aGVyZSB0byBkbyB0aGlzXG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDkwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDYwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDVcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDYwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDUwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDNcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDUwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDQwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDJcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDI5OSkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDEuNVxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMzAwKSB7XG4gICAgICAgICAgICAvL1RPRE86IFxuICAgICAgICAgICAgLy9kZXZpY2Ugbm90IHN1cHBvcnRlZCwgc2NyZWVuIHRvbyBzbWFsbFxuICAgICAgICAgICAgLy9leGl0IGdhbWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueCA9IHRoaXMuX21vdXNlLnggKiB3b3JsZFhFZGdlXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueSA9IHRoaXMuX21vdXNlLnkgKiB3b3JsZFlFZGdlICBcbiAgICB9XG5cbiAgICBwdWJsaWMgZGllKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgICAvL1RPRE86IGNhbGwgZ2FtZW92ZXIgb3Igc29tZXRoaW5nIGxpa2UgdGhhdCAuLi5cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCkgOiB2b2lkIHsgIFxuICAgICAgICBzdXBlci51cGRhdGUoKVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVubmVsIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDEwLCAxMCwgOTAsIDMyLCAxLCB0cnVlKSwgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKSlcbiAgICAgICAgdGhpcy5fbWVzaC5tYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGVcbiAgICAgICAgdGhpcy5fbWVzaC5yb3RhdGlvbi54ID0gMS41N1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xuICAgICAgICAvL3Byb2JhYmx5IHNvbWUgYXdlc29tZSBjb2xvciBjaGFuZ2luZyBzdHVmZiBpbiB0aGUgZnV0dXJlPyBcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL0dhbWVPYmplY3QnXG5pbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGwgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgICBwcml2YXRlIF9tYXhEaXN0YW5jZUZyb21DYW1lcmEgOiBudW1iZXJcbiAgICBwcml2YXRlIF9hbmltYXRpb24gOiBXYWxsQW5pbWF0aW9uXG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSA6IFRIUkVFLlZlY3RvcjMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaC5wb3NpdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXhEaXN0YW5jZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERpc3RhbmNlRnJvbUNhbWVyYVxuICAgIH1cblxuICAgIC8vdGhpcyBpcyB3aGVyZSB0aGUgc3RyYXRlZ3kgaXMgcGFzc2VkXG4gICAgY29uc3RydWN0b3IoYW5pbWF0aW9uIDogV2FsbEFuaW1hdGlvbil7XG4gICAgICAgIHN1cGVyKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxMCwgMjAsIDEpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCgpKVxuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSBhbmltYXRpb25cbiAgICAgICAgLy9UT0RPOiBkZWNpZGVcbiAgICAgICAgLy9zaG91bGQgSSBnaXZlIGFjY2VzcyB0byB0aGUgcGxheWVyIHBvc2l0aW9uICh6KSBzbyB0aGVyZSBhcmUgbm8gbWlzdGFrZXMgdGhhdCBjYW4gYmUgbWFkZT9cbiAgICAgICAgLy8oaWYgeW91IGNvbXBhcmUgdGhpcyB3aXRoIGEgZGlzdGFuY2UgZ3JlYXRlciB0aGF0IDEwIGEgd2FsbCB3aWxsIG5ldmVyIGhpdCB0aGUgcGxheWVyKVxuICAgICAgICB0aGlzLl9tYXhEaXN0YW5jZUZyb21DYW1lcmEgPSB0aGlzLl9nYW1lLmdldENhbWVyYSgpLnBvc2l0aW9uLnogLSA4XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgdXBkYXRlKCkgOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKClcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnVwZGF0ZSh0aGlzKVxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXG5pbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxBbmltYXRpb25MZWZ0IGltcGxlbWVudHMgV2FsbEFuaW1hdGlvbiB7XG4gICAgcHJpdmF0ZSBfd2lkdGhkcmF3aW5nIDogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHJpdmF0ZSBfaW5pdCA6IGJvb2xlYW4gPSB0cnVlXG4gICAgcHJpdmF0ZSBfZ2FtZSA6IEdhbWUgPSBHYW1lLmdldEdhbWUoKVxuICAgIHByaXZhdGUgX3N0YXJ0UG9zaXRpb25YIDogbnVtYmVyID0gLTE1XG4gICAgcHJpdmF0ZSBfZW5kUG9zaXRpb25YIDogbnVtYmVyID0gLTZcblxuICAgIHB1YmxpYyBkZXB0aEFuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG4gICAgICAgIFxuICAgICAgICBpZihwb3NpdGlvbi56IDwgd2FsbC5nZXRNYXhEaXN0YW5jZSgpKXtcbiAgICAgICAgICAgIHBvc2l0aW9uLnogKz0gMC4xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aGRyYXdpbmcgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLndpZHRoZHJhd0FuaW1hdGlvbih3YWxsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluc2VydEFuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYodGhpcy5faW5pdCl7XG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gdGhpcy5fc3RhcnRQb3NpdGlvblhcbiAgICAgICAgICAgIHRoaXMuX2luaXQgPSBmYWxzZVxuICAgICAgICB9XG4gXG4gICAgICAgIGlmKHBvc2l0aW9uLnggPD0gdGhpcy5fZW5kUG9zaXRpb25YICYmIHRoaXMuX3dpZHRoZHJhd2luZyA9PSBmYWxzZSl7XG4gICAgICAgICAgICBwb3NpdGlvbi54ICs9IDAuMDUgXG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcHVibGljIHdpZHRoZHJhd0FuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG4gICAgICAgIFxuICAgICAgICBwb3NpdGlvbi54IC09IDAuMlxuXG4gICAgICAgIGlmKHBvc2l0aW9uLnggPCB0aGlzLl9zdGFydFBvc2l0aW9uWCl7XG4gICAgICAgICAgICB0aGlzLl9nYW1lLnJlbW92ZUdhbWVPYmplY3Qod2FsbClcbiAgICAgICAgfSAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICB0aGlzLmluc2VydEFuaW1hdGlvbih3YWxsKVxuICAgICAgICB0aGlzLmRlcHRoQW5pbWF0aW9uKHdhbGwpXG4gICAgfVxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcbmltcG9ydCBXYWxsQW5pbWF0aW9uIGZyb20gJy4vV2FsbEFuaW1hdGlvbidcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCdcblxuLy9SaWdodCBub3cgV2FsbEFuaW1hdGlvbkxlZnQgJiBXYWxsQW5pbWF0aW9uUmlnaHQgY29udGFpbiBwcmV0dHkgbXVjaCBkdXBsaWNhdGUgY29kZSBcbi8vYmFzaWNhbGx5IG1vc3QgaXMgdGhlIHNhbWUgYnV0IHBvc2l0aXZlcywgbmVnYXRpdmVzLCBncmVhdGVyIHRoYW4gYW5kIHNtYWxsZXIgdGhhbiBhbGwgc3dpdGNoZWQgXG4vL3RoaXMgY2FuIHByb2JhYmx5IGJlIHNvbHZlZCBidXQgSSBkb24ndCB3YW50IHRvIGFic3RyYWN0IHNvIG11Y2ggdGhhdCBJIGNhbid0IGVhc2lseSB3YWxrIHRocm91Z2ggdGhlIGdzbWVcbi8vYW5kIGV4cGxhaW4gc29tZW9uZSBlbHNlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxBbmltYXRpb25SaWdodCBpbXBsZW1lbnRzIFdhbGxBbmltYXRpb24ge1xuICAgIHByaXZhdGUgX3dpZHRoZHJhd2luZyA6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgX2luaXQgOiBib29sZWFuID0gdHJ1ZVxuICAgIHByaXZhdGUgX2dhbWUgOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcml2YXRlIF9zdGFydFBvc2l0aW9uWCA6IG51bWJlciA9IDE1XG4gICAgcHJpdmF0ZSBfZW5kUG9zaXRpb25YIDogbnVtYmVyID0gNlxuXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcbiAgICAgICAgXG4gICAgICAgIGlmKHBvc2l0aW9uLnogPCB3YWxsLmdldE1heERpc3RhbmNlKCkpe1xuICAgICAgICAgICAgcG9zaXRpb24ueiArPSAwLjFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoZHJhd2luZyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMud2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5zZXJ0QW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcblxuICAgICAgICBpZih0aGlzLl9pbml0KXtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLl9zdGFydFBvc2l0aW9uWFxuICAgICAgICAgICAgdGhpcy5faW5pdCA9IGZhbHNlXG4gICAgICAgIH1cbiBcbiAgICAgICAgaWYocG9zaXRpb24ueCA+PSB0aGlzLl9lbmRQb3NpdGlvblggJiYgdGhpcy5fd2lkdGhkcmF3aW5nID09IGZhbHNlKXtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggLT0gMC4wNSBcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBwdWJsaWMgd2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcbiAgICAgICAgXG4gICAgICAgIHBvc2l0aW9uLnggKz0gMC4yXG5cbiAgICAgICAgaWYocG9zaXRpb24ueCA+IHRoaXMuX3N0YXJ0UG9zaXRpb25YKXtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUucmVtb3ZlR2FtZU9iamVjdCh3YWxsKVxuICAgICAgICB9ICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUod2FsbCA6IFdhbGwpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5zZXJ0QW5pbWF0aW9uKHdhbGwpXG4gICAgICAgIHRoaXMuZGVwdGhBbmltYXRpb24od2FsbClcbiAgICB9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9HYW1lT2JqZWN0J1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICBHYW1lLmdldEdhbWUoKVxufSkiXSwic291cmNlUm9vdCI6IiJ9