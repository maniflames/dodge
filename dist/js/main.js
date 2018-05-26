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
/******/ 	__webpack_require__.p = "C:\\js";
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
var Wall_1 = __webpack_require__(/*! ./Wall/Wall */ "./src/Wall/Wall.ts");
var Level_1 = __webpack_require__(/*! ./Level */ "./src/Level.ts");
var StartScreen_1 = __webpack_require__(/*! ./Screens/StartScreen */ "./src/Screens/StartScreen.ts");
var EndScreen_1 = __webpack_require__(/*! ./Screens/EndScreen */ "./src/Screens/EndScreen.ts");
var ScoreDisplay_1 = __webpack_require__(/*! ./ScoreDisplay */ "./src/ScoreDisplay.ts");
var Game = (function () {
    function Game() {
        var _this = this;
        this.STATE_INIT = "init";
        this.STATE_INIT_DONE = "init_done";
        this.STATE_PLAYING = "playing";
        this.STATE_PAUSE = "pause";
        this.STATE_OVER = "game_over";
        this._renderer = new THREE.WebGLRenderer();
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._gameObjects = new Array();
        console.count("[Game] Game construct!");
        this._state = this.STATE_INIT;
        this._level = null;
        this._screen = null;
        this._scoreDisplay = null;
        var pointLight = new THREE.PointLight(0xff0000, 1, 100, 2);
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
    Object.defineProperty(Game.prototype, "scoreDisplay", {
        get: function () { return this._scoreDisplay; },
        enumerable: true,
        configurable: true
    });
    Game.prototype.getCamera = function () {
        return this._camera;
    };
    Game.prototype.getScene = function () {
        return this._scene;
    };
    Game.prototype._init = function () {
        this._screen = new StartScreen_1.default();
        this._scoreDisplay = new ScoreDisplay_1.default();
        this.addGameObject(new Tunnel_1.default());
        this._state = this.STATE_INIT_DONE;
    };
    Game.prototype._gameloop = function () {
        var _this = this;
        if (this._state === this.STATE_INIT) {
            this._init();
        }
        if (this._level && this._state === this.STATE_PLAYING) {
            this._level.update();
        }
        for (var _i = 0, _a = this._gameObjects; _i < _a.length; _i++) {
            var object = _a[_i];
            if (this._state === this.STATE_PLAYING) {
                object.update();
            }
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
    Game.prototype.playGame = function () {
        this.addGameObject(new Player_1.default());
        this._level = new Level_1.default(1);
        this._state = this.STATE_PLAYING;
    };
    Game.prototype.gameOver = function () {
        this._state = this.STATE_OVER;
        for (var _i = 0, _a = this._gameObjects; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object instanceof Wall_1.default) {
                this.removeGameObject(object);
            }
        }
        this._screen = new EndScreen_1.default();
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
        this._game.removeGameObject(this);
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
var Wall_1 = __webpack_require__(/*! ./Wall/Wall */ "./src/Wall/Wall.ts");
var WallAnimationLeft_1 = __webpack_require__(/*! ./Wall/Animations/WallAnimationLeft */ "./src/Wall/Animations/WallAnimationLeft.ts");
var WallAnimationRight_1 = __webpack_require__(/*! ./Wall/Animations/WallAnimationRight */ "./src/Wall/Animations/WallAnimationRight.ts");
var WallAnimationLeftToRight_1 = __webpack_require__(/*! ./Wall/Animations/WallAnimationLeftToRight */ "./src/Wall/Animations/WallAnimationLeftToRight.ts");
var WallAnimationRightToLeft_1 = __webpack_require__(/*! ./Wall/Animations/WallAnimationRightToLeft */ "./src/Wall/Animations/WallAnimationRightToLeft.ts");
var Level = (function () {
    function Level(difficulty) {
        this._timer = new THREE.Clock(false);
        this._timeHistory = 0;
        this._game = Game_1.default.getGame();
        this._score = 0;
        this._difficulty = difficulty;
        this._timer.start();
    }
    Level.prototype._addWall = function () {
        var animation;
        var n = Math.floor(Math.random() * 4);
        switch (n) {
            case 0:
                animation = new WallAnimationLeft_1.default();
                break;
            case 1:
                animation = new WallAnimationRight_1.default();
                break;
            case 2:
                animation = new WallAnimationLeftToRight_1.default();
                break;
            case 3:
                animation = new WallAnimationRightToLeft_1.default();
                break;
            default:
                animation = new WallAnimationLeft_1.default();
                break;
        }
        this._game.addGameObject(new Wall_1.default(animation));
    };
    Level.prototype.nextLevel = function () {
        this._difficulty++;
    };
    Level.prototype.update = function () {
        var roundedTime = Math.floor(this._timer.getElapsedTime());
        if (roundedTime % 3 == 0 && roundedTime != this._timeHistory) {
            this._timeHistory = roundedTime;
            this._addWall();
            if (this._game.scoreDisplay) {
                this._game.scoreDisplay.visible = true;
                this._game.scoreDisplay.score = this._score++;
            }
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
        var _this = _super.call(this, new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial({ color: 0x9cb3d8 })) || this;
        _this._mouse = new THREE.Vector2();
        _this._trackCb = function (e) { _this._traceMouse(e); };
        _this._mesh.position.z = _this._game.getCamera().position.z - 10;
        window.addEventListener('mousemove', _this._trackCb);
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
        window.removeEventListener('mousemove', this._trackCb);
        this.remove();
        this._game.gameOver();
    };
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Player;
}(GameObject_1.default));
exports.default = Player;


/***/ }),

/***/ "./src/ScoreDisplay.ts":
/*!*****************************!*\
  !*** ./src/ScoreDisplay.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScoreDisplay = (function () {
    function ScoreDisplay() {
        this._visible = false;
        this._score = 0;
        this.parentElement = document.body;
        this.element = document.createElement('div');
        this.element.classList.add('display');
        this.parentElement.appendChild(this.element);
        this.visible = false;
    }
    Object.defineProperty(ScoreDisplay.prototype, "score", {
        set: function (score) {
            this._score = score;
            this.element.innerText = this._score.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScoreDisplay.prototype, "visible", {
        set: function (visible) {
            this._visible = visible;
            if (this._visible) {
                this.element.style.display = 'block';
            }
            else {
                this.element.style.display = 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    return ScoreDisplay;
}());
exports.default = ScoreDisplay;


/***/ }),

/***/ "./src/Screens/EndScreen.ts":
/*!**********************************!*\
  !*** ./src/Screens/EndScreen.ts ***!
  \**********************************/
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
var Screen_1 = __webpack_require__(/*! ./Screen */ "./src/Screens/Screen.ts");
var EndScreen = (function (_super) {
    __extends(EndScreen, _super);
    function EndScreen() {
        var _this = _super.call(this) || this;
        _this.clickCb = function (e) { _this.clickHandler(e); };
        _this.addBtn('restart');
        window.addEventListener('click', _this.clickCb);
        return _this;
    }
    EndScreen.prototype.clickHandler = function (e) {
        var target = e.target;
        if (target.nodeName === 'BUTTON') {
            this.remove();
            this._game.playGame();
        }
    };
    EndScreen.prototype.remove = function () {
        window.removeEventListener('click', this.clickCb);
        _super.prototype.remove.call(this);
    };
    return EndScreen;
}(Screen_1.default));
exports.default = EndScreen;


/***/ }),

/***/ "./src/Screens/Screen.ts":
/*!*******************************!*\
  !*** ./src/Screens/Screen.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var Screen = (function () {
    function Screen() {
        this._game = Game_1.default.getGame();
        this._domElement = document.createElement('div');
        this._domElement.classList.add('screen');
        document.body.appendChild(this._domElement);
    }
    Screen.prototype.addBtn = function (text) {
        var btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerHTML = text;
        this._domElement.appendChild(btn);
    };
    Screen.prototype.remove = function () {
        document.body.removeChild(this._domElement);
    };
    return Screen;
}());
exports.default = Screen;


/***/ }),

/***/ "./src/Screens/StartScreen.ts":
/*!************************************!*\
  !*** ./src/Screens/StartScreen.ts ***!
  \************************************/
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
var Screen_1 = __webpack_require__(/*! ./Screen */ "./src/Screens/Screen.ts");
var StartScreen = (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen() {
        var _this = _super.call(this) || this;
        _this.clickCb = function (e) { _this.clickHandler(e); };
        _this.addBtn('play');
        window.addEventListener('click', _this.clickCb);
        return _this;
    }
    StartScreen.prototype.clickHandler = function (e) {
        var target = e.target;
        if (target.nodeName === 'BUTTON') {
            this.remove();
            this._game.playGame();
        }
    };
    StartScreen.prototype.remove = function () {
        window.removeEventListener('click', this.clickCb);
        _super.prototype.remove.call(this);
    };
    return StartScreen;
}(Screen_1.default));
exports.default = StartScreen;


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

/***/ "./src/Wall/Animations/WallAnimationLeft.ts":
/*!**************************************************!*\
  !*** ./src/Wall/Animations/WallAnimationLeft.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
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

/***/ "./src/Wall/Animations/WallAnimationLeftToRight.ts":
/*!*********************************************************!*\
  !*** ./src/Wall/Animations/WallAnimationLeftToRight.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var WallAnimationLeftToRight = (function () {
    function WallAnimationLeftToRight() {
        this._widthdrawing = false;
        this._init = true;
        this._game = Game_1.default.getGame();
        this._startPositionX = -15;
        this._endPositionX = 6;
    }
    WallAnimationLeftToRight.prototype.depthAnimation = function (wall) {
        var position = wall.getPosition();
        if (position.z < wall.getMaxDistance()) {
            position.z += 0.1;
        }
        else {
            this._widthdrawing = true;
            this.widthdrawAnimation(wall);
        }
    };
    WallAnimationLeftToRight.prototype.insertAnimation = function (wall) {
        var position = wall.getPosition();
        if (this._init) {
            position.x = this._startPositionX;
            this._init = false;
        }
        if (position.x <= this._endPositionX && this._widthdrawing == false) {
            position.x += 0.05;
        }
    };
    WallAnimationLeftToRight.prototype.widthdrawAnimation = function (wall) {
        var position = wall.getPosition();
        position.x += 0.2;
        if (position.x < this._startPositionX) {
            this._game.removeGameObject(wall);
        }
    };
    WallAnimationLeftToRight.prototype.update = function (wall) {
        this.insertAnimation(wall);
        this.depthAnimation(wall);
    };
    return WallAnimationLeftToRight;
}());
exports.default = WallAnimationLeftToRight;


/***/ }),

/***/ "./src/Wall/Animations/WallAnimationRight.ts":
/*!***************************************************!*\
  !*** ./src/Wall/Animations/WallAnimationRight.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
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

/***/ "./src/Wall/Animations/WallAnimationRightToLeft.ts":
/*!*********************************************************!*\
  !*** ./src/Wall/Animations/WallAnimationRightToLeft.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var WallAnimationRightToLeft = (function () {
    function WallAnimationRightToLeft() {
        this._widthdrawing = false;
        this._init = true;
        this._game = Game_1.default.getGame();
        this._startPositionX = 15;
        this._endPositionX = -6;
    }
    WallAnimationRightToLeft.prototype.depthAnimation = function (wall) {
        var position = wall.getPosition();
        if (position.z < wall.getMaxDistance()) {
            position.z += 0.1;
        }
        else {
            this._widthdrawing = true;
            this.widthdrawAnimation(wall);
        }
    };
    WallAnimationRightToLeft.prototype.insertAnimation = function (wall) {
        var position = wall.getPosition();
        if (this._init) {
            position.x = this._startPositionX;
            this._init = false;
        }
        if (position.x >= this._endPositionX && this._widthdrawing == false) {
            position.x -= 0.05;
        }
    };
    WallAnimationRightToLeft.prototype.widthdrawAnimation = function (wall) {
        var position = wall.getPosition();
        position.x -= 0.2;
        if (position.x < this._startPositionX) {
            this._game.removeGameObject(wall);
        }
    };
    WallAnimationRightToLeft.prototype.update = function (wall) {
        this.insertAnimation(wall);
        this.depthAnimation(wall);
    };
    return WallAnimationRightToLeft;
}());
exports.default = WallAnimationRightToLeft;


/***/ }),

/***/ "./src/Wall/Wall.ts":
/*!**************************!*\
  !*** ./src/Wall/Wall.ts ***!
  \**************************/
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
var GameObject_1 = __webpack_require__(/*! ../GameObject */ "./src/GameObject.ts");
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
    console.log('Page is loaded!');
    Game_1.default.getGame();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Njb3JlRGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2NyZWVucy9FbmRTY3JlZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjcmVlbnMvU2NyZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy9TY3JlZW5zL1N0YXJ0U2NyZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy9UdW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dhbGwvQW5pbWF0aW9ucy9XYWxsQW5pbWF0aW9uTGVmdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbC9BbmltYXRpb25zL1dhbGxBbmltYXRpb25MZWZ0VG9SaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbC9BbmltYXRpb25zL1dhbGxBbmltYXRpb25SaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbC9BbmltYXRpb25zL1dhbGxBbmltYXRpb25SaWdodFRvTGVmdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV2FsbC9XYWxsLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMv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Ozs7Ozs7Ozs7O0FDbERELG1GQUFzQztBQUd0QztJQUFrQyx3QkFBVTtJQWF4QyxjQUFZLFNBQXlCO1FBQXJDLFlBQ0ksa0JBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxTQU0zRTtRQUxHLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUztRQUkzQixLQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7O0lBQ3ZFLENBQUM7SUFoQk0sMEJBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtJQUM5QixDQUFDO0lBRU0sNkJBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxzQkFBc0I7SUFDdEMsQ0FBQztJQWFNLHFCQUFNLEdBQWI7UUFDSSxpQkFBTSxNQUFNLFdBQUU7UUFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLENBM0JpQyxvQkFBVSxHQTJCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQkQsZ0VBQXlCO0FBR3pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLGNBQUksQ0FBQyxPQUFPLEVBQUU7QUFDbEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJDOlxcXFxqc1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9HYW1lT2JqZWN0J1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcidcbmltcG9ydCBUdW5uZWwgZnJvbSAnLi9UdW5uZWwnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwvV2FsbCdcbmltcG9ydCBMZXZlbCBmcm9tICcuL0xldmVsJ1xuaW1wb3J0IFNjcmVlbiBmcm9tICcuL1NjcmVlbnMvU2NyZWVuJ1xuaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4vU2NyZWVucy9TdGFydFNjcmVlbidcbmltcG9ydCBFbmRTY3JlZW4gZnJvbSAnLi9TY3JlZW5zL0VuZFNjcmVlbidcbmltcG9ydCBTY29yZURpc3BsYXkgZnJvbSAnLi9TY29yZURpc3BsYXknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfb2JqZWN0OiBHYW1lO1xuICAgIHByaXZhdGUgU1RBVEVfSU5JVDogc3RyaW5nID0gXCJpbml0XCIgLy9ub3Qgc3RhdGljIGJlY2F1c2UgdGhlIGFzc2lnbm1lbnRcbiAgICBwcml2YXRlIFNUQVRFX0lOSVRfRE9ORTogc3RyaW5nID0gXCJpbml0X2RvbmVcIiAvL2hhcHBlbnMgaW4gZ2FtZSBjb25zdHJ1Y3RvciBhcyB3ZWxsXG4gICAgcHJpdmF0ZSBTVEFURV9QTEFZSU5HOiBzdHJpbmcgPSBcInBsYXlpbmdcIlxuICAgIHByaXZhdGUgU1RBVEVfUEFVU0U6IHN0cmluZyA9IFwicGF1c2VcIlxuICAgIHByaXZhdGUgU1RBVEVfT1ZFUjogc3RyaW5nID0gXCJnYW1lX292ZXJcIlxuICAgIHByaXZhdGUgX3N0YXRlOiBzdHJpbmcgfCBudWxsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpXG4gICAgcHJpdmF0ZSBfc2NlbmU6IFRIUkVFLlNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBwcml2YXRlIF9jYW1lcmE6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKVxuICAgIHByaXZhdGUgX2dhbWVPYmplY3RzOiBBcnJheTxHYW1lT2JqZWN0PiA9IG5ldyBBcnJheTxHYW1lT2JqZWN0PigpXG4gICAgcHJpdmF0ZSBfbGV2ZWw6IExldmVsIHwgbnVsbFxuICAgIHByaXZhdGUgX3NjcmVlbjogU2NyZWVuIHwgbnVsbFxuICAgIHByaXZhdGUgX3Njb3JlRGlzcGxheTogU2NvcmVEaXNwbGF5IHwgbnVsbFxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRHYW1lKCk6IEdhbWUge1xuICAgICAgICBpZiAoIUdhbWUuX29iamVjdCkge1xuICAgICAgICAgICAgR2FtZS5fb2JqZWN0ID0gbmV3IEdhbWUoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEdhbWUuX29iamVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNjb3JlRGlzcGxheSgpIHsgcmV0dXJuIHRoaXMuX3Njb3JlRGlzcGxheSB9XG5cbiAgICBwdWJsaWMgZ2V0Q2FtZXJhKCk6IFRIUkVFLkNhbWVyYSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW1lcmE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNjZW5lKCk6IFRIUkVFLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjZW5lO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUuY291bnQoXCJbR2FtZV0gR2FtZSBjb25zdHJ1Y3QhXCIpXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5TVEFURV9JTklUXG4gICAgICAgIHRoaXMuX2xldmVsID0gbnVsbFxuICAgICAgICB0aGlzLl9zY3JlZW4gPSBudWxsXG4gICAgICAgIHRoaXMuX3Njb3JlRGlzcGxheSA9IG51bGxcblxuICAgICAgICAvLyBsZXQgcG9pbnRMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmYwMDAwLCAxLCAxMDApXG4gICAgICAgIGNvbnN0IHBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmMDAwMCwgMSwgMTAwLCAyKTtcbiAgICAgICAgcG9pbnRMaWdodC5wb3NpdGlvbi5zZXQoMCwgMCwgNTApXG4gICAgICAgIHRoaXMuX3NjZW5lLmFkZChwb2ludExpZ2h0KVxuXG4gICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi56ID0gNTBcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3JlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX2dhbWVsb29wKCkpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc2NyZWVuID0gbmV3IFN0YXJ0U2NyZWVuKClcbiAgICAgICAgdGhpcy5fc2NvcmVEaXNwbGF5ID0gbmV3IFNjb3JlRGlzcGxheSgpXG4gICAgICAgIHRoaXMuYWRkR2FtZU9iamVjdChuZXcgVHVubmVsKCkpXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5TVEFURV9JTklUX0RPTkVcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nYW1lbG9vcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLlNUQVRFX0lOSVQpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9UT0RPOiBjaGVjayBpZiB0aGUgZ2FtZSB0aGUgZ2FtZSBzdGF0ZSBpcyBcInBsYXlpbmcuLlwiIFxuICAgICAgICAvL3RoaXMgd291bGQgYmUgY29vbCBiZWNhdXNlIHRoZSBvbmx5IHRoaW5nIHRoYXQgaGFzIHRvIGhhcHBlbiBpcyB0aGF0IHRoaXMgXG4gICAgICAgIC8vYW5kIHRoZSBvYmplY3RzIGluIHRoZSBnYW1lb2JqZWN0cyBhcnJheSB3aWxsIHN0b3AgZHVyaW5nIHBhdXNlXG4gICAgICAgIGlmICh0aGlzLl9sZXZlbCAmJiB0aGlzLl9zdGF0ZSA9PT0gdGhpcy5TVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICB0aGlzLl9sZXZlbC51cGRhdGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMuX2dhbWVPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IHRoaXMuU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgICAgIG9iamVjdC51cGRhdGUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0xvZ2ljIGJlaGluZCBjb2xsaXNpb24gc2hvdWxkIGJlIHJlZmFjdG9yZWQgdG8gYSBzZXBlcmF0ZSBmdW5jdGlvblxuICAgICAgICAgICAgLy9UT0RPOiByZWZhY3RvciBpbnRvIHNvbWV0aGluZyBwcmV0dHlcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvdGhlck9iamVjdCBvZiB0aGlzLl9nYW1lT2JqZWN0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJPYmplY3QgaW5zdGFuY2VvZiBXYWxsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3hPYmogPSBvYmplY3QuZ2V0Qm91bmRpbmdCb3goKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJveE90aE9iaiA9IG90aGVyT2JqZWN0LmdldEJvdW5kaW5nQm94KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJveE9iai5pbnRlcnNlY3RzQm94KGJveE90aE9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuZGllKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSwgdGhpcy5fY2FtZXJhKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fZ2FtZWxvb3AoKSlcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUdhbWUoKSB7XG4gICAgICAgIHRoaXMuYWRkR2FtZU9iamVjdChuZXcgUGxheWVyKCkpXG4gICAgICAgIHRoaXMuX2xldmVsID0gbmV3IExldmVsKDEpXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5TVEFURV9QTEFZSU5HXG4gICAgfVxuXG4gICAgLy9UT0RPOiBjaGVja291dCB3aHkgd2FsbHMgYXJlbid0IGFsd2F5cyByZW1vdmVkIHByb3Blcmx5XG4gICAgcHVibGljIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuU1RBVEVfT1ZFUlxuICAgICAgICBmb3IgKGxldCBvYmplY3Qgb2YgdGhpcy5fZ2FtZU9iamVjdHMpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBXYWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVHYW1lT2JqZWN0KG9iamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zY3JlZW4gPSBuZXcgRW5kU2NyZWVuKClcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkR2FtZU9iamVjdChvYmplY3Q6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZ2FtZU9iamVjdHMucHVzaChvYmplY3QpXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUdhbWVPYmplY3QodGFyZ2V0OiBHYW1lT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IG9iamVjdCBvZiB0aGlzLl9nYW1lT2JqZWN0cykge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fZ2FtZU9iamVjdHMuaW5kZXhPZih0YXJnZXQpXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZU9iamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XHJcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdhbWVPYmplY3Qge1xyXG4gICAgcHJvdGVjdGVkIF9tZXNoIDogVEhSRUUuTWVzaFxyXG4gICAgcHJvdGVjdGVkIF9nZW9tZXRyeSA6IFRIUkVFLkdlb21ldHJ5XHJcbiAgICBwcm90ZWN0ZWQgX2dhbWUgOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcclxuICAgIHByb3RlY3RlZCBfYm91bmRpbmdCb3ggOiBUSFJFRS5Cb3gzXHJcblxyXG4gICAgcHVibGljIGdldEdlb21ldHJ5KCkgOiBUSFJFRS5HZW9tZXRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dlb21ldHJ5XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEJvdW5kaW5nQm94KCkgOiBUSFJFRS5Cb3gzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRpbmdCb3hcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggZ2VvbWV0cnkgOiBUSFJFRS5HZW9tZXRyeSwgbWF0ZXJpYWwgOiBUSFJFRS5NYXRlcmlhbCkge1xyXG4gICAgICAgIHRoaXMuX2dlb21ldHJ5ID0gZ2VvbWV0cnlcclxuICAgICAgICB0aGlzLl9tZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxyXG4gICAgICAgIC8vVXNpbmcgLnNldEZyb21PYmplY3Qgb3ZlciBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3ggYmVjYXVzZSB5b3UgaGF2ZSB0byBcclxuICAgICAgICAvL3JlY29tcHV0ZSB0aGUgYm91bmRpbmdCb3ggbWFudWFsbHkgd2hpbGUgeW91IGNhbiByZWNvbXB1dGUgLnNldEZyb21PYmplY3QgYnkgY2FsbGluZyBpdCBhZ2FpblxyXG4gICAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMTE3MCBcclxuICAgICAgICB0aGlzLl9ib3VuZGluZ0JveCA9IG5ldyBUSFJFRS5Cb3gzKCkuc2V0RnJvbU9iamVjdCh0aGlzLl9tZXNoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vSE1NTTogdGhpcyBjYXVzZXMgdGhlIHBhcmFkb3ggdGhhdCBtYWtlcyBpdCByYXRoZXIgaGFyZCBmb3IgbWUgdG8gY3JlYXRlIG5ldyBnYW1lT2JqZWN0cyBpbnNpZGUgb2YgdGhlIGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lLmdldFNjZW5lKCkuYWRkKHRoaXMuX21lc2gpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZSgpIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZS5nZXRTY2VuZSgpLnJlbW92ZSh0aGlzLl9tZXNoKVxyXG4gICAgICAgIHRoaXMuX2dhbWUucmVtb3ZlR2FtZU9iamVjdCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpIDogVEhSRUUuVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc2gucG9zaXRpb25cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ib3VuZGluZ0JveC5zZXRGcm9tT2JqZWN0KHRoaXMuX21lc2gpXHJcbiAgICB9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwvV2FsbCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uIGZyb20gJy4vV2FsbC9BbmltYXRpb25zL1dhbGxBbmltYXRpb24nXG5pbXBvcnQgV2FsbEFuaW1hdGlvbkxlZnQgZnJvbSAnLi9XYWxsL0FuaW1hdGlvbnMvV2FsbEFuaW1hdGlvbkxlZnQnXG5pbXBvcnQgV2FsbEFuaW1hdGlvblJpZ2h0IGZyb20gJy4vV2FsbC9BbmltYXRpb25zL1dhbGxBbmltYXRpb25SaWdodCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uTGVmdFRvUmlnaHQgZnJvbSAnLi9XYWxsL0FuaW1hdGlvbnMvV2FsbEFuaW1hdGlvbkxlZnRUb1JpZ2h0J1xuaW1wb3J0IFdhbGxBbmltYXRpb25SaWdodFRvTGVmdCBmcm9tICcuL1dhbGwvQW5pbWF0aW9ucy9XYWxsQW5pbWF0aW9uUmlnaHRUb0xlZnQnO1xuXG4vL2EgbGV2ZWwgb25seSB0YWtlcyBjYXJlIG9mIGhvdyBhbmQgd2hpY2ggb2JqZWN0cyBhcmUgc3Bhd25lZCBpbnRvIHRoZSBnYW1lIFxuLy95b3Ugc2hvdWxkIGJlIGFibGUgdG8gZ2l2ZSBhIGRpZmZpY3VsdHkgdG8gYSBsZXZlbCBhbmQgdGhlIGxldmVsIHdpbGwgYWN0IGJhc2VkIG9uIGRpZmZpY3VsdHlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsIHtcbiAgICBwcml2YXRlIF9kaWZmaWN1bHR5OiBudW1iZXJcbiAgICBwcml2YXRlIF90aW1lcjogVEhSRUUuQ2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soZmFsc2UpXG4gICAgcHJpdmF0ZSBfdGltZUhpc3Rvcnk6IG51bWJlciA9IDBcbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcml2YXRlIF9zY29yZTogbnVtYmVyID0gMFxuXG4gICAgY29uc3RydWN0b3IoZGlmZmljdWx0eTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2RpZmZpY3VsdHkgPSBkaWZmaWN1bHR5XG4gICAgICAgIHRoaXMuX3RpbWVyLnN0YXJ0KClcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRXYWxsKCk6IHZvaWQge1xuICAgICAgICBsZXQgYW5pbWF0aW9uOiBXYWxsQW5pbWF0aW9uXG4gICAgICAgIGNvbnN0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KTtcbiAgICAgICAgc3dpdGNoIChuKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gbmV3IFdhbGxBbmltYXRpb25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgV2FsbEFuaW1hdGlvblJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgV2FsbEFuaW1hdGlvbkxlZnRUb1JpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgV2FsbEFuaW1hdGlvblJpZ2h0VG9MZWZ0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gbmV3IFdhbGxBbmltYXRpb25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ2FtZS5hZGRHYW1lT2JqZWN0KG5ldyBXYWxsKGFuaW1hdGlvbikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZXh0TGV2ZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RpZmZpY3VsdHkrK1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgICAgIC8vd2hlbiBpdCBjb21lcyB0byBzcGVlZCBmbG9vcmluZyB0aGUgdGltZSB3aWxsIGNhdXNlIGEgbG90IG9mIHRyb3VibGUgLi4uIFxuICAgICAgICAvL3N0aWxsIHRoaW5raW5nIHdoYXQgd291bGQgYmUgYmV0dGVyXG4gICAgICAgIC8vc2luY2UgZGVsdGEgaXMgdXBkYXRlZCBldmVyeSB0aW1lIEkgY2FsbCBnZXRFbGFwc2VkVGltZSBtYXliZSBJIHNob3VsZCBqdXN0IGNyZWF0ZSBteSBvd24gZGVsdGE/IFxuICAgICAgICBsZXQgcm91bmRlZFRpbWUgPSBNYXRoLmZsb29yKHRoaXMuX3RpbWVyLmdldEVsYXBzZWRUaW1lKCkpXG5cbiAgICAgICAgaWYgKHJvdW5kZWRUaW1lICUgMyA9PSAwICYmIHJvdW5kZWRUaW1lICE9IHRoaXMuX3RpbWVIaXN0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lSGlzdG9yeSA9IHJvdW5kZWRUaW1lXG4gICAgICAgICAgICB0aGlzLl9hZGRXYWxsKClcbiAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lLnNjb3JlRGlzcGxheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWUuc2NvcmVEaXNwbGF5LnZpc2libGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZS5zY29yZURpc3BsYXkuc2NvcmUgPSB0aGlzLl9zY29yZSsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9HYW1lT2JqZWN0J1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcbiAgICBwcml2YXRlIF9tb3VzZTogVEhSRUUuVmVjdG9yMiA9IG5ldyBUSFJFRS5WZWN0b3IyKClcbiAgICBwcml2YXRlIF90cmFja0NiID0gKGU6IE1vdXNlRXZlbnQpID0+IHsgdGhpcy5fdHJhY2VNb3VzZShlKSB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIobmV3IFRIUkVFLkJveEdlb21ldHJ5KDEuNSwgMS41LCAxLjUpLCBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHg5Y2IzZDggfSkpXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueiA9IHRoaXMuX2dhbWUuZ2V0Q2FtZXJhKCkucG9zaXRpb24ueiAtIDEwO1xuICAgICAgICAvL1RPRE86IG9ubHkgbGlzdGVuIHdoZW4gdGhlIGdhbWVzdGF0ZSBpcyBTVEFURV9QTEFZSU5HXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl90cmFja0NiKVxuICAgIH1cblxuICAgIC8vTk9URTogSSByZWNlbnRseSBmb3VuZCBhbiBpc3N1ZSB0aGF0IGRpc2N1c3NlZCB0aGUgbWF0aCBvZiBmaW5kaW5nIHRoZSBGT1ZcbiAgICAvL1VzaW5nIHRoZXNlIGNhbGN1bGF0aW9ucyBtaWdodCBlbmFibGUgbWUgdG8gcGxhY2UgdGhlIHBsYXllciBkaXJlY3RseSB1bmRlciB0aGUgbW91c2Ugbm8gbWF0dGVyIGhvdyBiaWcgdGhlIHNjcmVlblxuICAgIC8vVGhpcyB3b3VsZCBtZWFuIEkgaGF2ZSB0byBpbXBsZW1lbnQgY29sbGlzaW9uIGJldHdlZW4gdGhlIHBsYXllciAmIHRoZSB0dW5uZWxcbiAgICAvL0N1cnJlbnQgY2FsY3VsYXRpb25zIG1ha2UgaXQgaW1wb3NzaWJsZSB0byByZWFjaCB0aGUgdHVubmVsIGluIHRoZSBmaXJzdCBwbGFjZVxuICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMTIzOVxuICAgIHByaXZhdGUgX3RyYWNlTW91c2UoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICAvL25vcm1hbGl6ZWQgbW91c2UgY29vcmRpbmF0ZXNcbiAgICAgICAgLy9yZXR1cm5zIG51bWJlciBiZXR3ZWVuIC0xICYgMSByZXByZXNlbnRpbmcgcG9zaXRpb24gb24gc2NyZWVuIFxuICAgICAgICAvL3doZXJlIDAsMCBpcyB0aGUgbWlkZGxlXG4gICAgICAgIC8vaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvY29yZS9SYXljYXN0ZXJcbiAgICAgICAgdGhpcy5fbW91c2UueCA9IChlLnggLyB3aW5kb3cuaW5uZXJXaWR0aCkgKiAyIC0gMVxuICAgICAgICB0aGlzLl9tb3VzZS55ID0gLSAoZS55IC8gd2luZG93LmlubmVySGVpZ2h0KSAqIDIgKyAxXG5cbiAgICAgICAgLy90aGUgd2hvbGUgcG9zaXRpb25pbmcgb2YgdGhlIGdhbWUgaXMgYmFzZWQgb24gdGhlIHR1bm5lbCB3aGljaCBoYXMgYSByYWRpdXMgb2YgMTBcbiAgICAgICAgLy90aGUgZWRnZXMgKHkpIG9mIHRoZSB0dW5uZWwgb24gdGhlIGN1cnJlbnQgeiBpbmRleCBvZiB0aGUgcGxheWVyIGFyZSBub3QgMTAwJSBvbiBzY3JlZW4gXG4gICAgICAgIC8vdGhlIHZpc2liaWxpdHkgb2YgZWRnZXMgKHgpIG9mIHRoZSB0dW5uZWwgZGVwZW5kcyBvbiB0aGUgd2lkdGggb2YgdGhlIHNjcmVlblxuICAgICAgICAvL3RoZSBjb3JuZXJzIG9mIHRoZSBzY3JlZW4gYXJlIG5vdCAxMDAlIGF2YWlsYWJsZSBiZWNhdXNlIHRoZSBlZGdlIG9mIHRoZSB0dW5uZWwgY3V0cyB0aGVtIG9mIG9uIHRoZSBjdXJyZW50IHogaW5kZXggb2YgdGhlIHBsYXllclxuICAgICAgICBsZXQgd29ybGRYRWRnZSA9IDZcbiAgICAgICAgbGV0IHdvcmxkWUVkZ2UgPSA2XG5cbiAgICAgICAgLy9JIGFtIHN0aWxsIG5vdCBzdXJlIHdoeSBidXQgYSB0cmFuc2Zvcm1hdGlvbiBvZiBzcGVjaWZpY2FsbHkgdGhlIHNjcmVlbiB3aWR0aCBoYXMgYSBodWdlIGltcGFjdCBvbiBwbGF5ZXIgbW92ZW1lbnRcbiAgICAgICAgLy9pdCBjb3VsZCBiZSBiZWNhdXNlIG9mIHRoZSBjYWxjdWxhdGlvbnMgb2YgdGhlIHBlcnNwZWN0aXZlIGNhbWVyYSBzaW5jZSBhIGhpZ2hlciB3aWR0aCBtZWFucyB0aGF0IG1vcmUgb2YgdGhlIHdvcmxkIGlzIHNob3duIHRvIHRoZSBwbGF5ZXJcbiAgICAgICAgLy9mb3IgYSB2aWV3cG9ydCB3aGVyZSB4IDwgOTAwcHggdGhlcmUgbmVlZCB0byBiZSBzbWFsbGVyIHdvcmxkIGVkZ2VzXG4gICAgICAgIC8vTk9URTogaWYgSSBldmVyIGhhdmUgc29tZSB0aW1lIGxlZnQgSSBjb3VsZCBwbG90IHRoZSBkZXNpcmVkIGVkZ2VzIG9mIGF0IGNlcnRhaW4gdmlld3BvcnQgZHJhdyBhIGdyYXBoIGFuZCBjcmVhdGUgYSBmb3J1bWxhIGZvciB0aGlzXG4gICAgICAgIC8vdmlld3BvcnRzIGFyZSB3YXkgZWFzaWVyIGZvciBub3cgOjMgXG5cbiAgICAgICAgLy9UT0RPOiBmaW5kIGEgd2F5IHRvIHJlZmFjdG9yIHRoaXMgaWYgcG9zc2libGVcbiAgICAgICAgLy9ub3Qgc3VyZSBob3cgeWV0LCBhIHN3aXRjaCBvbmx5IGFsbG93cyAxIHZhbHVlIGJ1dCB0aGVyZSBzaG91bGQgYmUgYSBwcmV0dGllciB3YXkgb3V0IHRoZXJlIHRvIGRvIHRoaXNcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDkwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDYwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDVcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA2MDAgJiYgd2luZG93LmlubmVyV2lkdGggPiA1MDApIHtcbiAgICAgICAgICAgIHdvcmxkWEVkZ2UgPSAzXG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNTAwICYmIHdpbmRvdy5pbm5lcldpZHRoID4gNDAwKSB7XG4gICAgICAgICAgICB3b3JsZFhFZGdlID0gMlxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDI5OSkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDEuNVxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMzAwKSB7XG4gICAgICAgICAgICAvL1RPRE86IFxuICAgICAgICAgICAgLy9kZXZpY2Ugbm90IHN1cHBvcnRlZCwgc2NyZWVuIHRvbyBzbWFsbFxuICAgICAgICAgICAgLy9leGl0IGdhbWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueCA9IHRoaXMuX21vdXNlLnggKiB3b3JsZFhFZGdlXG4gICAgICAgIHRoaXMuX21lc2gucG9zaXRpb24ueSA9IHRoaXMuX21vdXNlLnkgKiB3b3JsZFlFZGdlXG4gICAgfVxuXG4gICAgcHVibGljIGRpZSgpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX3RyYWNrQ2IpXG4gICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgdGhpcy5fZ2FtZS5nYW1lT3ZlcigpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKClcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZURpc3BsYXkge1xuICAgIHByaXZhdGUgcGFyZW50RWxlbWVudDogSFRNTERpdkVsZW1lbnRcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50XG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlciA9IDBcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgc2V0IHNjb3JlKHNjb3JlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBzY29yZVxuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5fc2NvcmUudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIHNldCB2aXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGVcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxyXG5pbXBvcnQgU2NyZWVuIGZyb20gJy4vU2NyZWVuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kU2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuICAgIHByaXZhdGUgY2xpY2tDYiA9IChlIDogTW91c2VFdmVudCkgPT4geyB0aGlzLmNsaWNrSGFuZGxlcihlKSB9IC8vIHB1dHRpbmcgdGhlIGNhbGxiYWNrIGluIGFuIGF0dHJpYnV0ZSBvdGhlcndpc2UgaXQgd29uJ3QgYmUgcmVtb3ZlZCBjb3JyZWN0bHlcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5hZGRCdG4oJ3Jlc3RhcnQnKVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tDYilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsaWNrSGFuZGxlcihlIDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudFxyXG5cclxuICAgICAgICBpZih0YXJnZXQubm9kZU5hbWUgPT09ICdCVVRUT04nKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lLnBsYXlHYW1lKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZSgpIDogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0NiKVxyXG4gICAgICAgIHN1cGVyLnJlbW92ZSgpXHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFNjcmVlbiB7IFxyXG4gICAgcHJvdGVjdGVkIF9kb21FbGVtZW50IDogSFRNTEVsZW1lbnRcclxuICAgIHByb3RlY3RlZCBfZ2FtZSA6IEdhbWUgPSBHYW1lLmdldEdhbWUoKSBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2RvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2NyZWVuJylcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2RvbUVsZW1lbnQpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEJ0bih0ZXh0IDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpXHJcbiAgICAgICAgYnRuLmlubmVySFRNTCA9IHRleHRcclxuICAgICAgICB0aGlzLl9kb21FbGVtZW50LmFwcGVuZENoaWxkKGJ0bilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKCkgOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2RvbUVsZW1lbnQpXHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuL1NjcmVlbidcclxuXHJcbi8vYSBsb3QgbW9yZSBmdW5jdGlvbmFsaXR5IGNvdWxkIGJlIG1vdmVkIHRvIHRoZSBwYXJlbnQgc2NyZWVuIGNsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuICAgIHByaXZhdGUgY2xpY2tDYiA9IChlIDogTW91c2VFdmVudCkgPT4geyB0aGlzLmNsaWNrSGFuZGxlcihlKSB9IC8vIHB1dHRpbmcgdGhlIGNhbGxiYWNrIGluIGFuIGF0dHJpYnV0ZSBvdGhlcndpc2UgaXQgd29uJ3QgYmUgcmVtb3ZlZCBjb3JyZWN0bHlcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5hZGRCdG4oJ3BsYXknKVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tDYilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsaWNrSGFuZGxlcihlIDogTW91c2VFdmVudCkgOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnRcclxuXHJcbiAgICAgICAgaWYodGFyZ2V0Lm5vZGVOYW1lID09PSAnQlVUVE9OJyl7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcclxuICAgICAgICAgICAgdGhpcy5fZ2FtZS5wbGF5R2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoKSA6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tDYilcclxuICAgICAgICBzdXBlci5yZW1vdmUoKVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvaW5kZXguZC50c1wiIC8+XHJcbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1bm5lbCBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMTAsIDEwLCA5MCwgMzIsIDEsIHRydWUpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCgpKVxyXG4gICAgICAgIHRoaXMuX21lc2gubWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkJhY2tTaWRlXHJcbiAgICAgICAgdGhpcy5fbWVzaC5yb3RhdGlvbi54ID0gMS41N1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xyXG4gICAgICAgIC8vcHJvYmFibHkgc29tZSBhd2Vzb21lIGNvbG9yIGNoYW5naW5nIHN0dWZmIGluIHRoZSBmdXR1cmU/IFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSdcclxuaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9XYWxsQW5pbWF0aW9uJ1xyXG5pbXBvcnQgV2FsbCBmcm9tICcuLi9XYWxsJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbEFuaW1hdGlvbkxlZnQgaW1wbGVtZW50cyBXYWxsQW5pbWF0aW9uIHtcclxuICAgIHByaXZhdGUgX3dpZHRoZHJhd2luZzogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gdHJ1ZVxyXG4gICAgcHJpdmF0ZSBfZ2FtZTogR2FtZSA9IEdhbWUuZ2V0R2FtZSgpXHJcbiAgICBwcml2YXRlIF9zdGFydFBvc2l0aW9uWDogbnVtYmVyID0gLTE1XHJcbiAgICBwcml2YXRlIF9lbmRQb3NpdGlvblg6IG51bWJlciA9IC02XHJcblxyXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKHdhbGw6IFdhbGwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uLnogPCB3YWxsLmdldE1heERpc3RhbmNlKCkpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24ueiArPSAwLjFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl93aWR0aGRyYXdpbmcgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnRBbmltYXRpb24od2FsbDogV2FsbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHdhbGwuZ2V0UG9zaXRpb24oKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faW5pdCkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gdGhpcy5fc3RhcnRQb3NpdGlvblhcclxuICAgICAgICAgICAgdGhpcy5faW5pdCA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zaXRpb24ueCA8PSB0aGlzLl9lbmRQb3NpdGlvblggJiYgdGhpcy5fd2lkdGhkcmF3aW5nID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLnggKz0gMC4wNVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2lkdGhkcmF3QW5pbWF0aW9uKHdhbGw6IFdhbGwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcclxuXHJcbiAgICAgICAgcG9zaXRpb24ueCAtPSAwLjJcclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uLnggPCB0aGlzLl9zdGFydFBvc2l0aW9uWCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lLnJlbW92ZUdhbWVPYmplY3Qod2FsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSh3YWxsOiBXYWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnNlcnRBbmltYXRpb24od2FsbClcclxuICAgICAgICB0aGlzLmRlcHRoQW5pbWF0aW9uKHdhbGwpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi8uLi9HYW1lJ1xuaW1wb3J0IFdhbGwgZnJvbSAnLi4vV2FsbCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uTGVmdCBmcm9tICcuL1dhbGxBbmltYXRpb25MZWZ0J1xuaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9XYWxsQW5pbWF0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsQW5pbWF0aW9uTGVmdFRvUmlnaHQgaW1wbGVtZW50cyBXYWxsQW5pbWF0aW9uIHtcbiAgICBwcml2YXRlIF93aWR0aGRyYXdpbmc6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgX2luaXQ6IGJvb2xlYW4gPSB0cnVlXG4gICAgcHJpdmF0ZSBfZ2FtZTogR2FtZSA9IEdhbWUuZ2V0R2FtZSgpXG4gICAgcHJpdmF0ZSBfc3RhcnRQb3NpdGlvblg6IG51bWJlciA9IC0xNVxuICAgIHByaXZhdGUgX2VuZFBvc2l0aW9uWDogbnVtYmVyID0gNlxuXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKHdhbGw6IFdhbGwpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYgKHBvc2l0aW9uLnogPCB3YWxsLmdldE1heERpc3RhbmNlKCkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnogKz0gMC4xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aGRyYXdpbmcgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLndpZHRoZHJhd0FuaW1hdGlvbih3YWxsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluc2VydEFuaW1hdGlvbih3YWxsOiBXYWxsKTogdm9pZCB7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHdhbGwuZ2V0UG9zaXRpb24oKVxuXG4gICAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gdGhpcy5fc3RhcnRQb3NpdGlvblhcbiAgICAgICAgICAgIHRoaXMuX2luaXQgPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uLnggPD0gdGhpcy5fZW5kUG9zaXRpb25YICYmIHRoaXMuX3dpZHRoZHJhd2luZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcG9zaXRpb24ueCArPSAwLjA1XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgd2lkdGhkcmF3QW5pbWF0aW9uKHdhbGw6IFdhbGwpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG5cbiAgICAgICAgcG9zaXRpb24ueCArPSAwLjJcblxuICAgICAgICBpZiAocG9zaXRpb24ueCA8IHRoaXMuX3N0YXJ0UG9zaXRpb25YKSB7XG4gICAgICAgICAgICB0aGlzLl9nYW1lLnJlbW92ZUdhbWVPYmplY3Qod2FsbClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUod2FsbDogV2FsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluc2VydEFuaW1hdGlvbih3YWxsKVxuICAgICAgICB0aGlzLmRlcHRoQW5pbWF0aW9uKHdhbGwpXG4gICAgfVxufVxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSdcclxuaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9XYWxsQW5pbWF0aW9uJ1xyXG5pbXBvcnQgV2FsbCBmcm9tICcuLi9XYWxsJ1xyXG5cclxuLy9SaWdodCBub3cgV2FsbEFuaW1hdGlvbkxlZnQgJiBXYWxsQW5pbWF0aW9uUmlnaHQgY29udGFpbiBwcmV0dHkgbXVjaCBkdXBsaWNhdGUgY29kZSBcclxuLy9iYXNpY2FsbHkgbW9zdCBpcyB0aGUgc2FtZSBidXQgcG9zaXRpdmVzLCBuZWdhdGl2ZXMsIGdyZWF0ZXIgdGhhbiBhbmQgc21hbGxlciB0aGFuIGFsbCBzd2l0Y2hlZCBcclxuLy90aGlzIGNhbiBwcm9iYWJseSBiZSBzb2x2ZWQgYnV0IEkgZG9uJ3Qgd2FudCB0byBhYnN0cmFjdCBzbyBtdWNoIHRoYXQgSSBjYW4ndCBlYXNpbHkgd2FsayB0aHJvdWdoIHRoZSBnc21lXHJcbi8vYW5kIGV4cGxhaW4gc29tZW9uZSBlbHNlXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsQW5pbWF0aW9uUmlnaHQgaW1wbGVtZW50cyBXYWxsQW5pbWF0aW9uIHtcclxuICAgIHByaXZhdGUgX3dpZHRoZHJhd2luZyA6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgcHJpdmF0ZSBfaW5pdCA6IGJvb2xlYW4gPSB0cnVlXHJcbiAgICBwcml2YXRlIF9nYW1lIDogR2FtZSA9IEdhbWUuZ2V0R2FtZSgpXHJcbiAgICBwcml2YXRlIF9zdGFydFBvc2l0aW9uWCA6IG51bWJlciA9IDE1XHJcbiAgICBwcml2YXRlIF9lbmRQb3NpdGlvblggOiBudW1iZXIgPSA2XHJcblxyXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHdhbGwuZ2V0UG9zaXRpb24oKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBvc2l0aW9uLnogPCB3YWxsLmdldE1heERpc3RhbmNlKCkpe1xyXG4gICAgICAgICAgICBwb3NpdGlvbi56ICs9IDAuMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoZHJhd2luZyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy53aWR0aGRyYXdBbmltYXRpb24od2FsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc2VydEFuaW1hdGlvbih3YWxsIDogV2FsbCkgOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcclxuXHJcbiAgICAgICAgaWYodGhpcy5faW5pdCl7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLl9zdGFydFBvc2l0aW9uWFxyXG4gICAgICAgICAgICB0aGlzLl9pbml0ID0gZmFsc2VcclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBpZihwb3NpdGlvbi54ID49IHRoaXMuX2VuZFBvc2l0aW9uWCAmJiB0aGlzLl93aWR0aGRyYXdpbmcgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBwb3NpdGlvbi54IC09IDAuMDUgXHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwgOiBXYWxsKSA6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHdhbGwuZ2V0UG9zaXRpb24oKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHBvc2l0aW9uLnggKz0gMC4yXHJcblxyXG4gICAgICAgIGlmKHBvc2l0aW9uLnggPiB0aGlzLl9zdGFydFBvc2l0aW9uWCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2dhbWUucmVtb3ZlR2FtZU9iamVjdCh3YWxsKVxyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSh3YWxsIDogV2FsbCkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluc2VydEFuaW1hdGlvbih3YWxsKVxyXG4gICAgICAgIHRoaXMuZGVwdGhBbmltYXRpb24od2FsbClcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gJy4uLy4uL0dhbWUnXG5pbXBvcnQgV2FsbCBmcm9tICcuLi9XYWxsJ1xuaW1wb3J0IFdhbGxBbmltYXRpb25MZWZ0IGZyb20gJy4vV2FsbEFuaW1hdGlvbkxlZnQnXG5pbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxBbmltYXRpb25SaWdodFRvTGVmdCBpbXBsZW1lbnRzIFdhbGxBbmltYXRpb24ge1xuICAgIHByaXZhdGUgX3dpZHRoZHJhd2luZzogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHJpdmF0ZSBfaW5pdDogYm9vbGVhbiA9IHRydWVcbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcml2YXRlIF9zdGFydFBvc2l0aW9uWDogbnVtYmVyID0gMTVcbiAgICBwcml2YXRlIF9lbmRQb3NpdGlvblg6IG51bWJlciA9IC02XG5cbiAgICBwdWJsaWMgZGVwdGhBbmltYXRpb24od2FsbDogV2FsbCk6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcblxuICAgICAgICBpZiAocG9zaXRpb24ueiA8IHdhbGwuZ2V0TWF4RGlzdGFuY2UoKSkge1xuICAgICAgICAgICAgcG9zaXRpb24ueiArPSAwLjFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoZHJhd2luZyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMud2lkdGhkcmF3QW5pbWF0aW9uKHdhbGwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5zZXJ0QW5pbWF0aW9uKHdhbGw6IFdhbGwpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gd2FsbC5nZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLl9zdGFydFBvc2l0aW9uWFxuICAgICAgICAgICAgdGhpcy5faW5pdCA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24ueCA+PSB0aGlzLl9lbmRQb3NpdGlvblggJiYgdGhpcy5fd2lkdGhkcmF3aW5nID09IGZhbHNlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi54IC09IDAuMDVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB3aWR0aGRyYXdBbmltYXRpb24od2FsbDogV2FsbCk6IHZvaWQge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB3YWxsLmdldFBvc2l0aW9uKClcblxuICAgICAgICBwb3NpdGlvbi54IC09IDAuMlxuXG4gICAgICAgIC8vIFRPRE86IEl0IGRvZXNuJ3QgYW5pbWF0ZTsganVzdCBqdW1wcyBvdXQgb2YgZXhpc3RlbmNlLiBJIHdvbmRlciB3aGF0J3Mgd3Jvbmc/XG4gICAgICAgIGlmIChwb3NpdGlvbi54IDwgdGhpcy5fc3RhcnRQb3NpdGlvblgpIHtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUucmVtb3ZlR2FtZU9iamVjdCh3YWxsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSh3YWxsOiBXYWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5zZXJ0QW5pbWF0aW9uKHdhbGwpXG4gICAgICAgIHRoaXMuZGVwdGhBbmltYXRpb24od2FsbClcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cclxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi4vR2FtZU9iamVjdCdcclxuaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9BbmltYXRpb25zL1dhbGxBbmltYXRpb24nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsIGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcbiAgICBwcml2YXRlIF9tYXhEaXN0YW5jZUZyb21DYW1lcmEgOiBudW1iZXJcclxuICAgIHByaXZhdGUgX2FuaW1hdGlvbiA6IFdhbGxBbmltYXRpb25cclxuXHJcbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSA6IFRIUkVFLlZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNoLnBvc2l0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1heERpc3RhbmNlKCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEaXN0YW5jZUZyb21DYW1lcmFcclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMgaXMgd2hlcmUgdGhlIHN0cmF0ZWd5IGlzIHBhc3NlZFxyXG4gICAgY29uc3RydWN0b3IoYW5pbWF0aW9uIDogV2FsbEFuaW1hdGlvbil7XHJcbiAgICAgICAgc3VwZXIobmV3IFRIUkVFLkJveEdlb21ldHJ5KDEwLCAyMCwgMSksIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKCkpXHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gYW5pbWF0aW9uXHJcbiAgICAgICAgLy9UT0RPOiBkZWNpZGVcclxuICAgICAgICAvL3Nob3VsZCBJIGdpdmUgYWNjZXNzIHRvIHRoZSBwbGF5ZXIgcG9zaXRpb24gKHopIHNvIHRoZXJlIGFyZSBubyBtaXN0YWtlcyB0aGF0IGNhbiBiZSBtYWRlP1xyXG4gICAgICAgIC8vKGlmIHlvdSBjb21wYXJlIHRoaXMgd2l0aCBhIGRpc3RhbmNlIGdyZWF0ZXIgdGhhdCAxMCBhIHdhbGwgd2lsbCBuZXZlciBoaXQgdGhlIHBsYXllcilcclxuICAgICAgICB0aGlzLl9tYXhEaXN0YW5jZUZyb21DYW1lcmEgPSB0aGlzLl9nYW1lLmdldENhbWVyYSgpLnBvc2l0aW9uLnogLSA4XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpXHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnVwZGF0ZSh0aGlzKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xyXG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuL0dhbWVPYmplY3QnXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdQYWdlIGlzIGxvYWRlZCEnKTtcclxuICAgIEdhbWUuZ2V0R2FtZSgpXHJcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==