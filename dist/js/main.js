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
        var _this = _super.call(this, new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial({ color: 0xff0000 })) || this;
        _this._mouse = new THREE.Vector2();
        _this._mesh.position.z = _this._game.getCamera().position.z - 10;
        _this._mesh;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R1bm5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbEFuaW1hdGlvbkxlZnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dhbGxBbmltYXRpb25SaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQSxzRUFBNkI7QUFDN0Isc0VBQTZCO0FBQzdCLGdFQUEwQjtBQUMxQixtRUFBNEI7QUFFNUI7SUEyQkk7UUFBQSxpQkFjQztRQXZDTyxlQUFVLEdBQVksTUFBTTtRQUM1QixtQkFBYyxHQUFZLFdBQVc7UUFFckMsY0FBUyxHQUEwQixJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7UUFDNUQsV0FBTSxHQUFpQixJ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QUFDLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxFQUFDO1lBQy9ELFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSTtTQUNyQjtJQUNMLENBQUM7SUFFTSwrQ0FBa0IsR0FBekIsVUFBMEIsSUFBVztRQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBRWpDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRztRQUVqQixJQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFTSxtQ0FBTSxHQUFiLFVBQWMsSUFBVztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztJQUM3QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdERELGdFQUF5QjtBQUd6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lBQzVCLGNBQUksQ0FBQyxPQUFPLEVBQUU7QUFDbEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanNcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXG5pbXBvcnQgVHVubmVsIGZyb20gJy4vVHVubmVsJ1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJztcbmltcG9ydCBMZXZlbCBmcm9tICcuL0xldmVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX29iamVjdCA6IEdhbWU7XG4gICAgcHJpdmF0ZSBTVEFURV9JTklUIDogc3RyaW5nID0gXCJpbml0XCIgLy9ub3Qgc3RhdGljIGJlY2F1c2UgdGhlIGFzc2lnbm1lbnQgb2Ygc3RhdGljIHZhbHVlcyB0byBub24tc3RhdGljIHZhbHVlc1xuICAgIHByaXZhdGUgU1RBVEVfTk9UX0lOSVQgOiBzdHJpbmcgPSBcInNvbWV0aGluZ1wiIC8vZG9lc24ndCBnbyByaWdodCBmb3Igc29tZSByZWFzb24gOi8gXG4gICAgcHJpdmF0ZSBfc3RhdGUgOiBzdHJpbmcgfCBudWxsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXIgOiBUSFJFRS5XZWJHTFJlbmRlcmVyICA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKClcbiAgICBwcml2YXRlIF9zY2VuZSA6IFRIUkVFLlNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCkgXG4gICAgcHJpdmF0ZSBfY2FtZXJhIDogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApIFxuICAgIHByaXZhdGUgX2dhbWVPYmplY3RzIDogQXJyYXk8R2FtZU9iamVjdD4gPSBuZXcgQXJyYXk8R2FtZU9iamVjdD4oKVxuICAgIHByaXZhdGUgX2xldmVsIDogTGV2ZWwgfCBudWxsXG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEdhbWUoKSA6IEdhbWUge1xuICAgICAgICBpZighIEdhbWUuX29iamVjdCl7XG4gICAgICAgICAgICBHYW1lLl9vYmplY3QgPSBuZXcgR2FtZSgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gR2FtZS5fb2JqZWN0OyAgICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDYW1lcmEoKSA6IFRIUkVFLkNhbWVyYSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW1lcmE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNjZW5lKCkgOiBUSFJFRS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZTsgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgIGNvbnNvbGUuY291bnQoXCJnYW1lIGNvbnN0cnVjdCFcIilcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLlNUQVRFX0lOSVRcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBudWxsXG5cbiAgICAgICAgbGV0IHBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCggMHhmZjAwMDAsIDEsIDEwMCApXG4gICAgICAgIHBvaW50TGlnaHQucG9zaXRpb24uc2V0KCAwLCAwLCA1MCApXG4gICAgICAgIHRoaXMuX3NjZW5lLmFkZCggcG9pbnRMaWdodCApIFxuXG4gICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi56ID0gNTBcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3JlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX2dhbWVsb29wKCkpXG4gICAgfSBcblxuICAgIHByaXZhdGUgX2luaXQoKSB7XG4gICAgICAgIHRoaXMuX2dhbWVPYmplY3RzLnB1c2gobmV3IFBsYXllcigpLCBuZXcgVHVubmVsKCkpXG4gICAgICAgIHRoaXMuX2xldmVsID0gbmV3IExldmVsKDEpXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5TVEFURV9OT1RfSU5JVFxuICAgIH1cblxuICAgIHByaXZhdGUgX2dhbWVsb29wKCkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZSA9PT0gdGhpcy5TVEFURV9JTklUKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuX2xldmVsKXtcbiAgICAgICAgICAgIHRoaXMuX2xldmVsLnVwZGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IG9iamVjdCBvZiB0aGlzLl9nYW1lT2JqZWN0cyl7XG4gICAgICAgICAgICBvYmplY3QudXBkYXRlKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9Mb2dpYyBiZWhpbmQgY29sbGlzaW9uIHNob3VsZCBiZSByZWZhY3RvcmVkIHRvIGEgc2VwZXJhdGUgZnVuY3Rpb25cbiAgICAgICAgICAgIGlmKG9iamVjdCBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG90aGVyT2JqZWN0IG9mIHRoaXMuX2dhbWVPYmplY3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG90aGVyT2JqZWN0IGluc3RhbmNlb2YgV2FsbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94T2JqID0gb2JqZWN0LmdldEJvdW5kaW5nQm94KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3hPdGhPYmogPSBvdGhlck9iamVjdC5nZXRCb3VuZGluZ0JveCgpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYm94T2JqLmludGVyc2VjdHNCb3goYm94T3RoT2JqKSkgeyAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmRpZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKHRoaXMuX3NjZW5lLCB0aGlzLl9jYW1lcmEpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9nYW1lbG9vcCgpKVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRHYW1lT2JqZWN0KG9iamVjdCA6IEdhbWVPYmplY3QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhbWVPYmplY3RzLnB1c2gob2JqZWN0KVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgcmVtb3ZlR2FtZU9iamVjdCh0YXJnZXQgOiBHYW1lT2JqZWN0KSA6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBvYmplY3Qgb2YgdGhpcy5fZ2FtZU9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmKHRhcmdldCA9PT0gb2JqZWN0KXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9nYW1lT2JqZWN0cy5pbmRleE9mKHRhcmdldClcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lT2JqZWN0cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdhbWVPYmplY3Qge1xuICAgIHByb3RlY3RlZCBfbWVzaCA6IFRIUkVFLk1lc2hcbiAgICBwcm90ZWN0ZWQgX2dlb21ldHJ5IDogVEhSRUUuR2VvbWV0cnlcbiAgICBwcm90ZWN0ZWQgX2dhbWUgOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcm90ZWN0ZWQgX2JvdW5kaW5nQm94IDogVEhSRUUuQm94M1xuXG4gICAgcHVibGljIGdldEdlb21ldHJ5KCkgOiBUSFJFRS5HZW9tZXRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZW9tZXRyeVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCb3VuZGluZ0JveCgpIDogVEhSRUUuQm94MyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZGluZ0JveFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBnZW9tZXRyeSA6IFRIUkVFLkdlb21ldHJ5LCBtYXRlcmlhbCA6IFRIUkVFLk1hdGVyaWFsKSB7XG4gICAgICAgIHRoaXMuX2dlb21ldHJ5ID0gZ2VvbWV0cnlcbiAgICAgICAgdGhpcy5fbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICAgICAgLy9Vc2luZyAuc2V0RnJvbU9iamVjdCBvdmVyIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCBiZWNhdXNlIHlvdSBoYXZlIHRvIFxuICAgICAgICAvL3JlY29tcHV0ZSB0aGUgYm91bmRpbmdCb3ggbWFudWFsbHkgd2hpbGUgeW91IGNhbiByZWNvbXB1dGUgLnNldEZyb21PYmplY3QgYnkgY2FsbGluZyBpdCBhZ2FpblxuICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvaXNzdWVzLzExNzAgXG4gICAgICAgIHRoaXMuX2JvdW5kaW5nQm94ID0gbmV3IFRIUkVFLkJveDMoKS5zZXRGcm9tT2JqZWN0KHRoaXMuX21lc2gpXG4gICAgICAgIFxuICAgICAgICAvL0hNTU06IHRoaXMgY2F1c2VzIHRoZSBwYXJhZG94IHRoYXQgbWFrZXMgaXQgcmF0aGVyIGhhcmQgZm9yIG1lIHRvIGNyZWF0ZSBuZXcgZ2FtZU9iamVjdHMgaW5zaWRlIG9mIHRoZSBnYW1lXG4gICAgICAgIHRoaXMuX2dhbWUuZ2V0U2NlbmUoKS5hZGQodGhpcy5fbWVzaClcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZ2FtZS5nZXRTY2VuZSgpLnJlbW92ZSh0aGlzLl9tZXNoKVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpIDogVEhSRUUuVmVjdG9yMyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNoLnBvc2l0aW9uXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2JvdW5kaW5nQm94LnNldEZyb21PYmplY3QodGhpcy5fbWVzaClcbiAgICB9XG5cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uIGZyb20gJy4vV2FsbEFuaW1hdGlvbidcbmltcG9ydCBXYWxsQW5pbWF0aW9uTGVmdCBmcm9tICcuL1dhbGxBbmltYXRpb25MZWZ0J1xuaW1wb3J0IFdhbGxBbmltYXRpb25SaWdodCBmcm9tICcuL1dhbGxBbmltYXRpb25SaWdodCdcblxuLy9hIGxldmVsIG9ubHkgdGFrZXMgY2FyZSBvZiBob3cgYW5kIHdoaWNoIG9iamVjdHMgYXJlIHNwYXduZWQgaW50byB0aGUgZ2FtZSBcbi8veW91IHNob3VsZCBiZSBhYmxlIHRvIGdpdmUgYSBkaWZmaWN1bHR5IHRvIGEgbGV2ZWwgYW5kIHRoZSBsZXZlbCB3aWxsIGFjdCBiYXNlZCBvbiBkaWZmaWN1bHR5XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbCB7XG4gICAgcHJpdmF0ZSBfZGlmZmljdWx0eSA6IG51bWJlclxuICAgIHByaXZhdGUgX3RpbWVyIDogVEhSRUUuQ2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soZmFsc2UpXG4gICAgcHJpdmF0ZSBfdGltZUhpc3RvcnkgOiBudW1iZXIgPSAwXG4gICAgcHJpdmF0ZSBfZ2FtZSA6IEdhbWUgPSBHYW1lLmdldEdhbWUoKVxuXG4gICAgcHVibGljIG5leHRMZXZlbCgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RpZmZpY3VsdHkrK1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGRpZmZpY3VsdHkgOiBudW1iZXIpe1xuICAgICAgICB0aGlzLl9kaWZmaWN1bHR5ID0gZGlmZmljdWx0eVxuICAgICAgICB0aGlzLl90aW1lci5zdGFydCgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkV2FsbCgpIDogdm9pZCB7XG4gICAgICAgIGxldCBhbmltYXRpb24gOiBXYWxsQW5pbWF0aW9uIFxuICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41ID8gYW5pbWF0aW9uID0gbmV3IFdhbGxBbmltYXRpb25SaWdodCgpIDogYW5pbWF0aW9uID0gbmV3IFdhbGxBbmltYXRpb25MZWZ0KClcbiAgICAgICAgdGhpcy5fZ2FtZS5hZGRHYW1lT2JqZWN0KG5ldyBXYWxsKGFuaW1hdGlvbikpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIDogdm9pZCB7XG4gICAgICAgIC8vd2hlbiBpdCBjb21lcyB0byBzcGVlZCBmbG9vcmluZyB0aGUgdGltZSB3aWxsIGNhdXNlIGEgbG90IG9mIHRyb3VibGUgLi4uIFxuICAgICAgICAvL3N0aWxsIHRoaW5raW5nIHdoYXQgd291bGQgYmUgYmV0dGVyXG4gICAgICAgIC8vc2luY2UgZGVsdGEgaXMgdXBkYXRlZCBldmVyeSB0aW1lIEkgY2FsbCBnZXRFbGFwc2VkVGltZSBtYXliZSBJIHNob3VsZCBqdXN0IGNyZWF0ZSBteSBvd24gZGVsdGE/IFxuICAgICAgICBsZXQgcm91bmRlZFRpbWUgPSBNYXRoLmZsb29yKHRoaXMuX3RpbWVyLmdldEVsYXBzZWRUaW1lKCkpXG5cbiAgICAgICAgaWYocm91bmRlZFRpbWUgJSAzID09IDAgJiYgcm91bmRlZFRpbWUgIT0gdGhpcy5fdGltZUhpc3Rvcnkpe1xuICAgICAgICAgICAgdGhpcy5fdGltZUhpc3RvcnkgPSByb3VuZGVkVGltZVxuICAgICAgICAgICAgdGhpcy5fYWRkV2FsbCgpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gICAgcHJpdmF0ZSBfbW91c2UgOiBUSFJFRS5WZWN0b3IyID0gbmV3IFRIUkVFLlZlY3RvcjIoKVxuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIobmV3IFRIUkVFLkJveEdlb21ldHJ5KDEuNSwgMS41LCAxLjUpLCBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe2NvbG9yOiAweGZmMDAwMH0pKVxuICAgICAgICB0aGlzLl9tZXNoLnBvc2l0aW9uLnogPSB0aGlzLl9nYW1lLmdldENhbWVyYSgpLnBvc2l0aW9uLnogLSAxMDtcbiAgICAgICAgdGhpcy5fbWVzaFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHt0aGlzLl90cmFjZU1vdXNlKGUpIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJhY2VNb3VzZShlIDogTW91c2VFdmVudCkgOiB2b2lkIHtcbiAgICAgICAgLy9ub3JtYWxpemVkIG1vdXNlIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vcmV0dXJucyBudW1iZXIgYmV0d2VlbiAtMSAmIDEgcmVwcmVzZW50aW5nIHBvc2l0aW9uIG9uIHNjcmVlbiBcbiAgICAgICAgLy93aGVyZSAwLDAgaXMgdGhlIG1pZGRsZVxuICAgICAgICAvL2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2NvcmUvUmF5Y2FzdGVyXG4gICAgICAgIHRoaXMuX21vdXNlLnggPSAoZS54IC8gd2luZG93LmlubmVyV2lkdGgpICogMiAtIDFcbiAgICAgICAgdGhpcy5fbW91c2UueSA9IC0gKGUueSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiAyICsgMVxuXG4gICAgICAgIC8vdGhlIHdob2xlIHBvc2l0aW9uaW5nIG9mIHRoZSBnYW1lIGlzIGJhc2VkIG9uIHRoZSB0dW5uZWwgd2hpY2ggaGFzIGEgcmFkaXVzIG9mIDEwXG4gICAgICAgIC8vdGhlIGVkZ2VzICh5KSBvZiB0aGUgdHVubmVsIG9uIHRoZSBjdXJyZW50IHogaW5kZXggb2YgdGhlIHBsYXllciBhcmUgbm90IDEwMCUgb24gc2NyZWVuIFxuICAgICAgICAvL3RoZSB2aXNpYmlsaXR5IG9mIGVkZ2VzICh4KSBvZiB0aGUgdHVubmVsIGRlcGVuZHMgb24gdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW5cbiAgICAgICAgLy90aGUgY29ybmVycyBvZiB0aGUgc2NyZWVuIGFyZSBub3QgMTAwJSBhdmFpbGFibGUgYmVjYXVzZSB0aGUgZWRnZSBvZiB0aGUgdHVubmVsIGN1dHMgdGhlbSBvZiBvbiB0aGUgY3VycmVudCB6IGluZGV4IG9mIHRoZSBwbGF5ZXJcbiAgICAgICAgbGV0IHdvcmxkWEVkZ2UgPSA2XG4gICAgICAgIGxldCB3b3JsZFlFZGdlID0gNlxuXG4gICAgICAgIC8vSSBhbSBzdGlsbCBub3Qgc3VyZSB3aHkgYnV0IGEgdHJhbnNmb3JtYXRpb24gb2Ygc3BlY2lmaWNhbGx5IHRoZSBzY3JlZW4gd2lkdGggaGFzIGEgaHVnZSBpbXBhY3Qgb24gcGxheWVyIG1vdmVtZW50XG4gICAgICAgIC8vaXQgY291bGQgYmUgYmVjYXVzZSBvZiB0aGUgY2FsY3VsYXRpb25zIG9mIHRoZSBwZXJzcGVjdGl2ZSBjYW1lcmEgc2luY2UgYSBoaWdoZXIgd2lkdGggbWVhbnMgdGhhdCBtb3JlIG9mIHRoZSB3b3JsZCBpcyBzaG93biB0byB0aGUgcGxheWVyXG4gICAgICAgIC8vZm9yIGEgdmlld3BvcnQgd2hlcmUgeCA8IDkwMHB4IHRoZXJlIG5lZWQgdG8gYmUgc21hbGxlciB3b3JsZCBlZGdlc1xuICAgICAgICAvL05PVEU6IGlmIEkgZXZlciBoYXZlIHNvbWUgdGltZSBsZWZ0IEkgY291bGQgcGxvdCB0aGUgZGVzaXJlZCBlZGdlcyBvZiBhdCBjZXJ0YWluIHZpZXdwb3J0IGRyYXcgYSBncmFwaCBhbmQgY3JlYXRlIGEgZm9ydW1sYSBmb3IgdGhpc1xuICAgICAgICAvL3ZpZXdwb3J0cyBhcmUgd2F5IGVhc2llciBmb3Igbm93IDozIFxuXG4gICAgICAgIC8vVE9ETzogZmluZCBhIHdheSB0byByZWZhY3RvciB0aGlzIGlmIHBvc3NpYmxlXG4gICAgICAgIC8vbm90IHN1cmUgaG93IHlldCwgYSBzd2l0Y2ggb25seSBhbGxvd3MgMSB2YWx1ZSBidXQgdGhlcmUgc2hvdWxkIGJlIGEgcHJldHRpZXIgd2F5IG91dCB0aGVyZSB0byBkbyB0aGlzXG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDkwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDYwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDVcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDYwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDUwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDNcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDUwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDQwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDJcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDI5OSkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDEuNVxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMzAwKSB7XG4gICAgICAgICAgICAvL1RPRE86IFxuICAgICAgICAgICAgLy9kZXZpY2Ugbm90IHN1cHBvcnRlZCwgc2NyZWVuIHRvbyBzbWFsbFxuICAgICAgICAgICAgLy9leGl0IGdhbWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueCA9IHRoaXMuX21vdXNlLnggKiB3b3JsZFhFZGdlXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueSA9IHRoaXMuX21vdXNlLnkgKiB3b3JsZFlFZGdlICBcbiAgICB9XG5cbiAgICBwdWJsaWMgZGllKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgICAvL1RPRE86IGNhbGwgZ2FtZW92ZXIgb3Igc29tZXRoaW5nIGxpa2UgdGhhdCAuLi5cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCkgOiB2b2lkIHsgIFxuICAgICAgICBzdXBlci51cGRhdGUoKVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVubmVsIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDEwLCAxMCwgOTAsIDMyLCAxLCB0cnVlKSwgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKSlcbiAgICAgICAgdGhpcy5fbWVzaC5tYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGVcbiAgICAgICAgdGhpcy5fbWVzaC5yb3RhdGlvbi54ID0gMS41N1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xuICAgICAgICAvL3Byb2JhYmx5IHNvbWUgYXdlc29tZSBjb2xvciBjaGFuZ2luZyBzdHVmZiBpbiB0aGUgZnV0dXJlPyBcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL0dhbWVPYmplY3QnXG5pbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGwgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgICBwcml2YXRlIF9tYXhEaXN0YW5jZUZyb21DYW1lcmEgOiBudW1iZXJcbiAgICBwcml2YXRlIF9hbmltYXRpb24gOiBXYWxsQW5pbWF0aW9uXG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSA6IFRIUkVFLlZlY3RvcjMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaC5wb3NpdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXhEaXN0YW5jZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERpc3RhbmNlRnJvbUNhbWVyYVxuICAgIH1cblxuICAgIC8vdGhpcyBpcyB3aGVyZSB0aGUgc3RyYXRlZ3kgaXMgcGFzc2VkXG4gICAgY29uc3RydWN0b3IoYW5pbWF0aW9uIDogV2FsbEFuaW1hdGlvbil7XG4gICAgICAgIHN1cGVyKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxMCwgMjAsIDEpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCgpKVxuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSBhbmltYXRpb25cbiAgICAgICAgLy9UT0RPOiBkZWNpZGVcbiAgICAgICAgLy9zaG91bGQgSSBnaXZlIGFjY2VzcyB0byB0aGUgcGxheWVyIHBvc2l0aW9uICh6KSBzbyB0aGVyZSBhcmUgbm8gbWlzdGFrZXMgdGhhdCBjYW4gYmUgbWFkZT9cbiAgICAgICAgLy8oaWYgeW91IGNvbXBhcmUgdGhpcyB3aXRoIGEgZGlzdGFuY2UgZ3JlYXRlciB0aGF0IDEwIGEgd2FsbCB3aWxsIG5ldmVyIGhpdCB0aGUgcGxheWVyKVxuICAgICAgICB0aGlzLl9tYXhEaXN0YW5jZUZyb21DYW1lcmEgPSB0aGlzLl9nYW1lLmdldENhbWVyYSgpLnBvc2l0aW9uLnogLSA4XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgdXBkYXRlKCkgOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKClcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnVwZGF0ZSh0aGlzKVxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXG5pbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxBbmltYXRpb25MZWZ0IGltcGxlbWVudHMgV2FsbEFuaW1hdGlvbiB7XG4gICAgcHJpdmF0ZSBfd2lkdGhkcmF3aW5nIDogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHJpdmF0ZSBfaW5pdCA6IGJvb2xlYW4gPSB0cnVlXG4gICAgcHJpdmF0ZSBfZ2FtZSA6IEdhbWUgPSBHYW1lLmdldEdhbWUoKVxuICAgIHByaXZhdGUgX3N0YXJ0UG9zaXRpb25YIDogbnVtYmVyID0gLTE1XG4gICAgcHJpdmF0ZSBfZW5kUG9zaXRpb25YIDogbnVtYmVyID0gLTZcblxuICAgIHB1YmxpYyBkZXB0aEFuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG4gICAgICAgIFxuICAgICAgICBpZihwb3NpdGlvbi56IDwgd2FsbC5nZXRNYXhEaXN0YW5jZSgpKXtcbiAgICAgICAgICAgIHBvc2l0aW9uLnogKz0gMC4xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aGRyYXdpbmcgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLndpZHRoZHJhd0FuaW1hdGlvbih3YWxsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluc2VydEFuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYodGhpcy5faW5pdCl7XG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gdGhpcy5fc3RhcnRQb3NpdGlvblhcbiAgICAgICAgICAgIHRoaXMuX2luaXQgPSBmYWxzZVxuICAgICAgICB9XG4gXG4gICAgICAgIGlmKHBvc2l0aW9uLnggPD0gdGhpcy5fZW5kUG9zaXRpb25YICYmIHRoaXMuX3dpZHRoZHJhd2luZyA9PSBmYWxzZSl7XG4gICAgICAgICAgICBwb3NpdGlvbi54ICs9IDAuMDUgXG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcHVibGljIHdpZHRoZHJhd0FuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG4gICAgICAgIFxuICAgICAgICBwb3NpdGlvbi54IC09IDAuMlxuXG4gICAgICAgIGlmKHBvc2l0aW9uLnggPCB0aGlzLl9zdGFydFBvc2l0aW9uWCl7XG4gICAgICAgICAgICB0aGlzLl9nYW1lLnJlbW92ZUdhbWVPYmplY3Qod2FsbClcbiAgICAgICAgfSAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICB0aGlzLmluc2VydEFuaW1hdGlvbih3YWxsKVxuICAgICAgICB0aGlzLmRlcHRoQW5pbWF0aW9uKHdhbGwpXG4gICAgfVxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcbmltcG9ydCBXYWxsQW5pbWF0aW9uIGZyb20gJy4vV2FsbEFuaW1hdGlvbidcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCdcblxuLy9SaWdodCBub3cgV2FsbEFuaW1hdGlvbkxlZnQgJiBXYWxsQW5pbWF0aW9uUmlnaHQgY29udGFpbiBwcmV0dHkgbXVjaCBkdXBsaWNhdGUgY29kZSBcbi8vYmFzaWNhbGx5IG1vc3QgaXMgdGhlIHNhbWUgYnV0IHBvc2l0aXZlcywgbmVnYXRpdmVzLCBncmVhdGVyIHRoYW4gYW5kIHNtYWxsZXIgdGhhbiBhbGwgc3dpdGNoZWQgXG4vL3RoaXMgY2FuIHByb2JhYmx5IGJlIHNvbHZlZCBidXQgSSBkb24ndCB3YW50IHRvIGFic3RyYWN0IHNvIG11Y2ggdGhhdCBJIGNhbid0IGVhc2lseSB3YWxrIHRocm91Z2ggdGhlIGdzbWVcbi8vYW5kIGV4cGxhaW4gc29tZW9uZSBlbHNlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxBbmltYXRpb25SaWdodCBpbXBsZW1lbnRzIFdhbGxBbmltYXRpb24ge1xuICAgIHByaXZhdGUgX3dpZHRoZHJhd2luZyA6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgX2luaXQgOiBib29sZWFuID0gdHJ1ZVxuICAgIHByaXZhdGUgX2dhbWUgOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcml2YXRlIF9zdGFydFBvc2l0aW9uWCA6IG51bWJlciA9IDE1XG4gICAgcHJpdmF0ZSBfZW5kUG9zaXRpb25YIDogbnVtYmVyID0gNlxuXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcbiAgICAgICAgXG4gICAgICAgIGlmKHBvc2l0aW9uLnogPCB3YWxsLmdldE1heERpc3RhbmNlKCkpe1xuICAgICAgICAgICAgcG9zaXRpb24ueiArPSAwLjFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoZHJhd2luZyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMud2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5zZXJ0QW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcblxuICAgICAgICBpZih0aGlzLl9pbml0KXtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLl9zdGFydFBvc2l0aW9uWFxuICAgICAgICAgICAgdGhpcy5faW5pdCA9IGZhbHNlXG4gICAgICAgIH1cbiBcbiAgICAgICAgaWYocG9zaXRpb24ueCA+PSB0aGlzLl9lbmRQb3NpdGlvblggJiYgdGhpcy5fd2lkdGhkcmF3aW5nID09IGZhbHNlKXtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggLT0gMC4wNSBcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBwdWJsaWMgd2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcbiAgICAgICAgXG4gICAgICAgIHBvc2l0aW9uLnggKz0gMC4yXG5cbiAgICAgICAgaWYocG9zaXRpb24ueCA+IHRoaXMuX3N0YXJ0UG9zaXRpb25YKXtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUucmVtb3ZlR2FtZU9iamVjdCh3YWxsKVxuICAgICAgICB9ICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUod2FsbCA6IFdhbGwpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5zZXJ0QW5pbWF0aW9uKHdhbGwpXG4gICAgICAgIHRoaXMuZGVwdGhBbmltYXRpb24od2FsbClcbiAgICB9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9HYW1lT2JqZWN0J1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICBHYW1lLmdldEdhbWUoKVxufSkiXSwic291cmNlUm9vdCI6IiJ9