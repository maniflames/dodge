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

/***/ "./src/ColorManagement/ColorManager.ts":
/*!*********************************************!*\
  !*** ./src/ColorManagement/ColorManager.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorManager = (function () {
    function ColorManager() {
        this._colorListeners = new Array();
        this._color = this._generateColor();
    }
    Object.defineProperty(ColorManager.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    ColorManager.getManager = function () {
        if (!ColorManager._object) {
            ColorManager._object = new ColorManager();
        }
        return ColorManager._object;
    };
    ColorManager.prototype.subscribe = function (object) {
        console.log('subscribed!');
        this._colorListeners.push(object);
        console.log(this._colorListeners);
    };
    ColorManager.prototype.unsubscribe = function (object) {
        var index = this._colorListeners.indexOf(object);
        console.warn(this._colorListeners);
        if (index != -1) {
            this._colorListeners.splice(index, 1);
            return;
        }
        console.error('attempt to unsubscribe non subscribed object');
    };
    ColorManager.prototype.changeColor = function () {
        var color = this._generateColor();
        for (var _i = 0, _a = this._colorListeners; _i < _a.length; _i++) {
            var object = _a[_i];
            this._color = color;
            object.onColorChange(color);
        }
    };
    ColorManager.prototype._generateColor = function () {
        return new THREE.Color(Math.random(), Math.random(), Math.random());
    };
    return ColorManager;
}());
exports.default = ColorManager;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameStateManager_1 = __webpack_require__(/*! ./GameStates/GameStateManager */ "./src/GameStates/GameStateManager.ts");
var Score_1 = __webpack_require__(/*! ./Score */ "./src/Score.ts");
var Game = (function () {
    function Game() {
        var _this = this;
        this._renderer = new THREE.WebGLRenderer();
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._gameObjects = new Array();
        this._score = new Score_1.default;
        this._screen = null;
        this._scoreDisplay = null;
        console.count("[Game] Game construct!");
        this._gameStateManager = GameStateManager_1.default.getManager();
        var pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
        pointLight.position.set(0, 0, 50);
        this._scene.add(pointLight);
        this._camera.position.z = 50;
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
        requestAnimationFrame(function () { return _this._gameloop(); });
    }
    Object.defineProperty(Game.prototype, "score", {
        get: function () {
            return this._score.total;
        },
        set: function (newScore) {
            this._score.total = newScore;
            if (this._scoreDisplay) {
                this._scoreDisplay.score = this._score.total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "screen", {
        get: function () {
            return this._screen;
        },
        set: function (screen) {
            this._screen = screen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "scoreDisplay", {
        get: function () {
            return this._scoreDisplay;
        },
        set: function (scoreDisplay) {
            this._scoreDisplay = scoreDisplay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gameObjects", {
        get: function () {
            return this._gameObjects;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.getCamera = function () {
        return this._camera;
    };
    Game.prototype.getScene = function () {
        return this._scene;
    };
    Game.getGame = function () {
        if (!Game._object) {
            Game._object = new Game();
        }
        return Game._object;
    };
    Game.prototype._gameloop = function () {
        var _this = this;
        this._gameStateManager.update();
        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(function () { return _this._gameloop(); });
    };
    Game.prototype.addGameObject = function (object) {
        this._gameObjects.push(object);
    };
    Game.prototype.removeGameObject = function (target) {
        var index = this._gameObjects.indexOf(target);
        this._gameObjects.splice(index, 1);
    };
    return Game;
}());
exports.default = Game;


/***/ }),

/***/ "./src/GameObjects/GameObject.ts":
/*!***************************************!*\
  !*** ./src/GameObjects/GameObject.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var GameObject = (function () {
    function GameObject(geometry, material) {
        this._game = Game_1.default.getGame();
        this._boundingBox = new THREE.Box3();
        this._geometry = geometry;
        this._mesh = new THREE.Mesh(geometry, material);
        this._game.getScene().add(this._mesh);
    }
    GameObject.prototype.getGeometry = function () {
        return this._geometry;
    };
    GameObject.prototype.getBoundingBox = function () {
        return this._boundingBox;
    };
    GameObject.prototype.getPosition = function () {
        return this._mesh.position;
    };
    GameObject.prototype.remove = function () {
        this._game.getScene().remove(this._mesh);
        this._game.removeGameObject(this);
    };
    GameObject.prototype.update = function () {
        this._boundingBox.setFromObject(this._mesh);
    };
    return GameObject;
}());
exports.default = GameObject;


/***/ }),

/***/ "./src/GameObjects/Player.ts":
/*!***********************************!*\
  !*** ./src/GameObjects/Player.ts ***!
  \***********************************/
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
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./src/GameObjects/GameObject.ts");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial({ color: 0x9cb3d8 })) || this;
        _this._mouse = new THREE.Vector2();
        _this._trackCb = function (e) { _this._traceMouse(e); };
        _this._mesh.position.z = _this._game.getCamera().position.z - 10;
        _this.addMouseTracking();
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
    Player.prototype.addMouseTracking = function () {
        document.addEventListener('mousemove', this._trackCb);
    };
    Player.prototype.removeMouseTracking = function () {
        document.removeEventListener('mousemove', this._trackCb);
    };
    Player.prototype.remove = function () {
        this.removeMouseTracking();
        _super.prototype.remove.call(this);
    };
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Player;
}(GameObject_1.default));
exports.default = Player;


/***/ }),

/***/ "./src/GameObjects/Tunnel.ts":
/*!***********************************!*\
  !*** ./src/GameObjects/Tunnel.ts ***!
  \***********************************/
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
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./src/GameObjects/GameObject.ts");
var Tunnel = (function (_super) {
    __extends(Tunnel, _super);
    function Tunnel(color) {
        var _this = _super.call(this, new THREE.CylinderGeometry(10, 10, 90, 32, 1, true), new THREE.MeshLambertMaterial()) || this;
        _this._mesh.material.side = THREE.BackSide;
        _this._mesh.rotation.x = 1.57;
        _this.onColorChange(color);
        return _this;
    }
    Tunnel.prototype.onColorChange = function (color) {
        var material = this._mesh.material;
        material.color = color;
    };
    Tunnel.prototype.update = function () {
    };
    return Tunnel;
}(GameObject_1.default));
exports.default = Tunnel;


/***/ }),

/***/ "./src/GameObjects/Wall/Animations/WallAnimationLeft.ts":
/*!**************************************************************!*\
  !*** ./src/GameObjects/Wall/Animations/WallAnimationLeft.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WallAnimationRight_1 = __webpack_require__(/*! ./WallAnimationRight */ "./src/GameObjects/Wall/Animations/WallAnimationRight.ts");
var WallAnimationLeft = (function () {
    function WallAnimationLeft(wall, endPositionX, startPositionX) {
        if (endPositionX === void 0) { endPositionX = 6; }
        if (startPositionX === void 0) { startPositionX = 15; }
        this._widthdrawing = false;
        this.wall = wall;
        this._startPositionX = startPositionX;
        this.wall.position.x = this._startPositionX;
        this._endPositionX = endPositionX;
    }
    WallAnimationLeft.prototype.depthAnimation = function () {
        if (this.wall.position.z < this.wall.maxDistance) {
            this.wall.position.z += 0.1;
        }
        else if (this._endPositionX && this.wall.position.z >= this.wall.maxDistance) {
            this.wall.animation = new WallAnimationRight_1.default(this.wall, false, this.wall.position.x);
        }
    };
    WallAnimationLeft.prototype.insertAnimation = function () {
        if (!this._endPositionX || (this.wall.position.x >= this._endPositionX && this._widthdrawing == false)) {
            this.wall.position.x -= 0.05;
        }
    };
    WallAnimationLeft.prototype.update = function () {
        this.insertAnimation();
        this.depthAnimation();
    };
    return WallAnimationLeft;
}());
exports.default = WallAnimationLeft;


/***/ }),

/***/ "./src/GameObjects/Wall/Animations/WallAnimationRight.ts":
/*!***************************************************************!*\
  !*** ./src/GameObjects/Wall/Animations/WallAnimationRight.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WallAnimationLeft_1 = __webpack_require__(/*! ./WallAnimationLeft */ "./src/GameObjects/Wall/Animations/WallAnimationLeft.ts");
var WallAnimationRight = (function () {
    function WallAnimationRight(wall, endPositionX, startPositionX) {
        if (endPositionX === void 0) { endPositionX = -6; }
        if (startPositionX === void 0) { startPositionX = -15; }
        this.wall = wall;
        this._startPositionX = startPositionX;
        this.wall.position.x = this._startPositionX;
        this._endPositionX = endPositionX;
    }
    WallAnimationRight.prototype.depthAnimation = function () {
        if (this.wall.position.z < this.wall.maxDistance) {
            this.wall.position.z += 0.1;
        }
        else if (this._endPositionX && this.wall.position.z >= this.wall.maxDistance) {
            this.wall.animation = new WallAnimationLeft_1.default(this.wall, false, this.wall.position.x);
        }
    };
    WallAnimationRight.prototype.insertAnimation = function () {
        if (!this._endPositionX || (this.wall.position.x <= this._endPositionX)) {
            this.wall.position.x += 0.05;
        }
    };
    WallAnimationRight.prototype.update = function () {
        this.insertAnimation();
        this.depthAnimation();
    };
    return WallAnimationRight;
}());
exports.default = WallAnimationRight;


/***/ }),

/***/ "./src/GameObjects/Wall/Wall.ts":
/*!**************************************!*\
  !*** ./src/GameObjects/Wall/Wall.ts ***!
  \**************************************/
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
var GameObject_1 = __webpack_require__(/*! ../GameObject */ "./src/GameObjects/GameObject.ts");
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(color) {
        var _this = _super.call(this, new THREE.BoxGeometry(10, 20, 1), new THREE.MeshLambertMaterial()) || this;
        _this._maxDistanceFromCamera = _this._game.getCamera().position.z - 8;
        _this._animation = null;
        _this.onColorChange(color);
        return _this;
    }
    Object.defineProperty(Wall.prototype, "animation", {
        get: function () {
            return this._animation;
        },
        set: function (animation) {
            this._animation = animation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wall.prototype, "position", {
        get: function () {
            return this._mesh.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wall.prototype, "maxDistance", {
        get: function () {
            return this._maxDistanceFromCamera;
        },
        enumerable: true,
        configurable: true
    });
    Wall.prototype.onColorChange = function (color) {
        var material = this._mesh.material;
        material.color = color;
    };
    Wall.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._animation) {
            this._animation.update();
        }
    };
    return Wall;
}(GameObject_1.default));
exports.default = Wall;


/***/ }),

/***/ "./src/GameStates/GameInit.ts":
/*!************************************!*\
  !*** ./src/GameStates/GameInit.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var StartScreen_1 = __webpack_require__(/*! ../UI/StartScreen */ "./src/UI/StartScreen.ts");
var GameStateManager_1 = __webpack_require__(/*! ./GameStateManager */ "./src/GameStates/GameStateManager.ts");
var GamePlayInit_1 = __webpack_require__(/*! ./GamePlayInit */ "./src/GameStates/GamePlayInit.ts");
var GameInit = (function () {
    function GameInit() {
        var _this = this;
        this.clickCb = function (e) { _this.clickHandler(e); };
        this._game = Game_1.default.getGame();
        this._gameStateManager = GameStateManager_1.default.getManager();
        this._game.screen = new StartScreen_1.default();
        window.addEventListener('click', this.clickCb);
    }
    GameInit.prototype.update = function () { };
    GameInit.prototype.clickHandler = function (e) {
        var target = e.target;
        if (target.nodeName === 'BUTTON') {
            window.removeEventListener('click', this.clickCb);
            if (this._game.screen) {
                this._game.screen.remove();
            }
            this._gameStateManager.state = new GamePlayInit_1.default();
        }
    };
    return GameInit;
}());
exports.default = GameInit;


/***/ }),

/***/ "./src/GameStates/GameOver.ts":
/*!************************************!*\
  !*** ./src/GameStates/GameOver.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var GameStateManager_1 = __webpack_require__(/*! ../GameStates/GameStateManager */ "./src/GameStates/GameStateManager.ts");
var GamePlayInit_1 = __webpack_require__(/*! ../GameStates/GamePlayInit */ "./src/GameStates/GamePlayInit.ts");
var Wall_1 = __webpack_require__(/*! ../GameObjects/Wall/Wall */ "./src/GameObjects/Wall/Wall.ts");
var EndScreen_1 = __webpack_require__(/*! ../UI/EndScreen */ "./src/UI/EndScreen.ts");
var GameOver = (function () {
    function GameOver() {
        var _this = this;
        this.clickCb = function (e) { _this.clickHandler(e); };
        this._game = Game_1.default.getGame();
        this._gameStateManager = GameStateManager_1.default.getManager();
        if (this._game.scoreDisplay) {
            this._game.scoreDisplay.remove();
        }
        for (var index = this._game.gameObjects.length - 1; index >= 0; index--) {
            if (this._game.gameObjects[index] instanceof Wall_1.default) {
                this._game.gameObjects[index].remove();
            }
        }
        this._game.screen = new EndScreen_1.default();
        window.addEventListener('click', this.clickCb);
    }
    GameOver.prototype.update = function () { };
    GameOver.prototype.clickHandler = function (e) {
        var target = e.target;
        if (target.nodeName === 'BUTTON') {
            window.removeEventListener('click', this.clickCb);
            if (this._game.screen) {
                this._game.screen.remove();
            }
            this._gameStateManager.state = new GamePlayInit_1.default();
        }
    };
    return GameOver;
}());
exports.default = GameOver;


/***/ }),

/***/ "./src/GameStates/GamePause.ts":
/*!*************************************!*\
  !*** ./src/GameStates/GamePause.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameStateManager_1 = __webpack_require__(/*! ../GameStates/GameStateManager */ "./src/GameStates/GameStateManager.ts");
var GamePlay_1 = __webpack_require__(/*! ./GamePlay */ "./src/GameStates/GamePlay.ts");
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var Player_1 = __webpack_require__(/*! ../GameObjects/Player */ "./src/GameObjects/Player.ts");
var GamePause = (function () {
    function GamePause() {
        var _this = this;
        this._pauseKeyCb = function (e) { _this._pauseKeyHandler(e); };
        this._game = Game_1.default.getGame();
        this._gameStateManager = GameStateManager_1.default.getManager();
        document.addEventListener('keydown', this._pauseKeyCb);
    }
    GamePause.prototype.update = function () { };
    GamePause.prototype._pauseKeyHandler = function (e) {
        if (e.key != ' ') {
            return;
        }
        document.removeEventListener('keydown', this._pauseKeyCb);
        for (var _i = 0, _a = this._game.gameObjects; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player instanceof Player_1.default) {
                player.addMouseTracking();
            }
        }
        this._gameStateManager.state = new GamePlay_1.default();
    };
    return GamePause;
}());
exports.default = GamePause;


/***/ }),

/***/ "./src/GameStates/GamePlay.ts":
/*!************************************!*\
  !*** ./src/GameStates/GamePlay.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var GameStateManager_1 = __webpack_require__(/*! ../GameStates/GameStateManager */ "./src/GameStates/GameStateManager.ts");
var GameOver_1 = __webpack_require__(/*! ../GameStates/GameOver */ "./src/GameStates/GameOver.ts");
var LevelGenerator_1 = __webpack_require__(/*! ../LevelGenerator */ "./src/LevelGenerator.ts");
var Player_1 = __webpack_require__(/*! ../GameObjects/Player */ "./src/GameObjects/Player.ts");
var Wall_1 = __webpack_require__(/*! ../GameObjects/Wall/Wall */ "./src/GameObjects/Wall/Wall.ts");
var GamePause_1 = __webpack_require__(/*! ./GamePause */ "./src/GameStates/GamePause.ts");
var ColorManager_1 = __webpack_require__(/*! ../ColorManagement/ColorManager */ "./src/ColorManagement/ColorManager.ts");
var GamePlay = (function () {
    function GamePlay() {
        var _this = this;
        this._pauseKeyCb = function (e) { _this._pauseKeyHandler(e); };
        this._game = Game_1.default.getGame();
        this._gameStateManager = GameStateManager_1.default.getManager();
        this._levelGenerator = LevelGenerator_1.default.getGenerator();
        this._colorManager = ColorManager_1.default.getManager();
        document.addEventListener('keydown', this._pauseKeyCb);
    }
    GamePlay.prototype.update = function () {
        this._levelGenerator.update();
        for (var _i = 0, _a = this._game.gameObjects; _i < _a.length; _i++) {
            var obj1 = _a[_i];
            obj1.update();
            if (obj1 instanceof Wall_1.default) {
                if (this._checkOutOfBounds(obj1)) {
                    if (this._game.scoreDisplay) {
                        this._game.score++;
                    }
                    this._colorManager.unsubscribe(obj1);
                    obj1.remove();
                }
            }
            for (var _b = 0, _c = this._game.gameObjects; _b < _c.length; _b++) {
                var obj2 = _c[_b];
                if (obj1 instanceof Player_1.default && obj2 instanceof Wall_1.default) {
                    if (this._checkCollision(obj1, obj2)) {
                        this._colorManager.unsubscribe(obj2);
                        document.removeEventListener('keydown', this._pauseKeyCb);
                        obj1.remove();
                        this._gameStateManager.state = new GameOver_1.default();
                    }
                }
            }
        }
    };
    GamePlay.prototype._checkCollision = function (obj1, obj2) {
        var boxObj = obj1.getBoundingBox();
        var boxOthObj = obj2.getBoundingBox();
        if (boxObj.intersectsBox(boxOthObj)) {
            return true;
        }
        return false;
    };
    GamePlay.prototype._checkOutOfBounds = function (wall) {
        if (wall.position.x > 15 || wall.position.x < -15) {
            return true;
        }
        return false;
    };
    GamePlay.prototype._pauseKeyHandler = function (e) {
        if (e.key != ' ') {
            return;
        }
        for (var _i = 0, _a = this._game.gameObjects; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player instanceof Player_1.default) {
                player.removeMouseTracking();
            }
        }
        document.removeEventListener('keydown', this._pauseKeyCb);
        this._gameStateManager.state = new GamePause_1.default();
    };
    return GamePlay;
}());
exports.default = GamePlay;


/***/ }),

/***/ "./src/GameStates/GamePlayInit.ts":
/*!****************************************!*\
  !*** ./src/GameStates/GamePlayInit.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var ScoreDisplay_1 = __webpack_require__(/*! ../UI/ScoreDisplay */ "./src/UI/ScoreDisplay.ts");
var Tunnel_1 = __webpack_require__(/*! ../GameObjects/Tunnel */ "./src/GameObjects/Tunnel.ts");
var Player_1 = __webpack_require__(/*! ../GameObjects/Player */ "./src/GameObjects/Player.ts");
var GameStateManager_1 = __webpack_require__(/*! ./GameStateManager */ "./src/GameStates/GameStateManager.ts");
var GamePlay_1 = __webpack_require__(/*! ./GamePlay */ "./src/GameStates/GamePlay.ts");
var ColorManager_1 = __webpack_require__(/*! ../ColorManagement/ColorManager */ "./src/ColorManagement/ColorManager.ts");
var GamePlayInit = (function () {
    function GamePlayInit() {
        this._done = false;
        this._game = Game_1.default.getGame();
        this._gameStateManager = GameStateManager_1.default.getManager();
        this._colorManager = ColorManager_1.default.getManager();
        this._game.scoreDisplay = new ScoreDisplay_1.default();
        var tunnel = new Tunnel_1.default(this._colorManager.color);
        this._colorManager.subscribe(tunnel);
        this._game.addGameObject(tunnel);
        this._game.addGameObject(new Player_1.default());
        this._done = true;
    }
    GamePlayInit.prototype.update = function () {
        if (this._done) {
            this._gameStateManager.state = new GamePlay_1.default();
        }
    };
    return GamePlayInit;
}());
exports.default = GamePlayInit;


/***/ }),

/***/ "./src/GameStates/GameStateManager.ts":
/*!********************************************!*\
  !*** ./src/GameStates/GameStateManager.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameStateManager = (function () {
    function GameStateManager() {
        this._state = null;
    }
    Object.defineProperty(GameStateManager.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    GameStateManager.getManager = function () {
        if (!GameStateManager._object) {
            GameStateManager._object = new GameStateManager();
        }
        return GameStateManager._object;
    };
    GameStateManager.prototype.update = function () {
        if (this._state) {
            this._state.update();
        }
    };
    return GameStateManager;
}());
exports.default = GameStateManager;


/***/ }),

/***/ "./src/LevelGenerator.ts":
/*!*******************************!*\
  !*** ./src/LevelGenerator.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var Wall_1 = __webpack_require__(/*! ./GameObjects/Wall/Wall */ "./src/GameObjects/Wall/Wall.ts");
var WallAnimationLeft_1 = __webpack_require__(/*! ./GameObjects/Wall/Animations/WallAnimationLeft */ "./src/GameObjects/Wall/Animations/WallAnimationLeft.ts");
var WallAnimationRight_1 = __webpack_require__(/*! ./GameObjects/Wall/Animations/WallAnimationRight */ "./src/GameObjects/Wall/Animations/WallAnimationRight.ts");
var ColorManager_1 = __webpack_require__(/*! ./ColorManagement/ColorManager */ "./src/ColorManagement/ColorManager.ts");
var LevelGenerator = (function () {
    function LevelGenerator(difficulty) {
        this._timer = new THREE.Clock(false);
        this._timeHistory = 0;
        this._game = Game_1.default.getGame();
        this._colorManager = ColorManager_1.default.getManager();
        this._difficulty = difficulty;
        this._targetScore = this._calculateNextTargetScore();
        this._timer.start();
    }
    LevelGenerator.getGenerator = function () {
        if (!LevelGenerator._object) {
            LevelGenerator._object = new LevelGenerator(1);
        }
        return LevelGenerator._object;
    };
    LevelGenerator.prototype._addWall = function () {
        var wall = new Wall_1.default(this._colorManager.color);
        var animation;
        var n = Math.floor(Math.random() * 4);
        switch (n) {
            case 0:
                animation = new WallAnimationLeft_1.default(wall);
                break;
            case 1:
                animation = new WallAnimationRight_1.default(wall);
                break;
            case 2:
                animation = new WallAnimationLeft_1.default(wall, false);
                break;
            case 3:
                animation = new WallAnimationRight_1.default(wall, false);
                break;
            default:
                animation = new WallAnimationLeft_1.default(wall);
                break;
        }
        wall.animation = animation;
        this._game.addGameObject(wall);
        this._colorManager.subscribe(wall);
    };
    LevelGenerator.prototype._calculateNextTargetScore = function () {
        if (this._game.score === 0) {
            return Math.round(Math.random() * 4 + 8);
        }
        return this._targetScore + Math.round(Math.random() * 10 + 20);
    };
    LevelGenerator.prototype._checkDifficultyUpdate = function () {
        if (this._game.score >= this._targetScore) {
            console.log('update dificulty');
            this._difficulty++;
            this._targetScore = this._calculateNextTargetScore();
            this._colorManager.changeColor();
        }
    };
    LevelGenerator.prototype.update = function () {
        this._checkDifficultyUpdate();
        var roundedTime = Math.floor(this._timer.getElapsedTime());
        if (roundedTime % 3 == 0 && roundedTime != this._timeHistory) {
            this._timeHistory = roundedTime;
            this._addWall();
        }
    };
    return LevelGenerator;
}());
exports.default = LevelGenerator;


/***/ }),

/***/ "./src/Score.ts":
/*!**********************!*\
  !*** ./src/Score.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Score = (function () {
    function Score() {
        this._total = 0;
    }
    Object.defineProperty(Score.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (newScore) {
            this._total = newScore;
        },
        enumerable: true,
        configurable: true
    });
    Score.prototype.reset = function () {
        this._total = 0;
    };
    return Score;
}());
exports.default = Score;


/***/ }),

/***/ "./src/UI/EndScreen.ts":
/*!*****************************!*\
  !*** ./src/UI/EndScreen.ts ***!
  \*****************************/
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
var Screen_1 = __webpack_require__(/*! ./Screen */ "./src/UI/Screen.ts");
var EndScreen = (function (_super) {
    __extends(EndScreen, _super);
    function EndScreen() {
        var _this = _super.call(this) || this;
        _this.addBtn('restart');
        return _this;
    }
    EndScreen.prototype.remove = function () {
        _super.prototype.remove.call(this);
    };
    return EndScreen;
}(Screen_1.default));
exports.default = EndScreen;


/***/ }),

/***/ "./src/UI/ScoreDisplay.ts":
/*!********************************!*\
  !*** ./src/UI/ScoreDisplay.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScoreDisplay = (function () {
    function ScoreDisplay() {
        this._score = 0;
        this.parentElement = document.body;
        this.element = document.createElement('div');
        this.element.classList.add('display');
        this.element.style.display = 'block';
        this.parentElement.appendChild(this.element);
        this.score = 0;
    }
    Object.defineProperty(ScoreDisplay.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (score) {
            this._score = score;
            this.element.innerText = this._score.toString();
        },
        enumerable: true,
        configurable: true
    });
    ScoreDisplay.prototype.remove = function () {
        this.parentElement.removeChild(this.element);
    };
    return ScoreDisplay;
}());
exports.default = ScoreDisplay;


/***/ }),

/***/ "./src/UI/Screen.ts":
/*!**************************!*\
  !*** ./src/UI/Screen.ts ***!
  \**************************/
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

/***/ "./src/UI/StartScreen.ts":
/*!*******************************!*\
  !*** ./src/UI/StartScreen.ts ***!
  \*******************************/
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
var Screen_1 = __webpack_require__(/*! ./Screen */ "./src/UI/Screen.ts");
var StartScreen = (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen() {
        var _this = _super.call(this) || this;
        _this.addBtn('play');
        return _this;
    }
    StartScreen.prototype.remove = function () {
        _super.prototype.remove.call(this);
    };
    return StartScreen;
}(Screen_1.default));
exports.default = StartScreen;


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
var GameStateManager_1 = __webpack_require__(/*! ./GameStates/GameStateManager */ "./src/GameStates/GameStateManager.ts");
var GameInit_1 = __webpack_require__(/*! ./GameStates/GameInit */ "./src/GameStates/GameInit.ts");
window.addEventListener('load', function () {
    console.log('Page is loaded!');
    Game_1.default.getGame();
    GameStateManager_1.default.getManager().state = new GameInit_1.default();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbG9yTWFuYWdlbWVudC9Db2xvck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3RzL0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3RzL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZU9iamVjdHMvVHVubmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lT2JqZWN0cy9XYWxsL0FuaW1hdGlvbnMvV2FsbEFuaW1hdGlvbkxlZnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3RzL1dhbGwvQW5pbWF0aW9ucy9XYWxsQW5pbWF0aW9uUmlnaHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVPYmplY3RzL1dhbGwvV2FsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVN0YXRlcy9HYW1lSW5pdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVN0YXRlcy9HYW1lT3Zlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVN0YXRlcy9HYW1lUGF1c2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVTdGF0ZXMvR2FtZVBsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVTdGF0ZXMvR2FtZVBsYXlJbml0LnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lU3RhdGVzL0dhbWVTdGF0ZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xldmVsR2VuZXJhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9TY29yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVUkvRW5kU2NyZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy9VSS9TY29yZURpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VJL1NjcmVlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVUkvU3Rh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O1FBQ3pCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUk7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFFTSx1QkFBTSxHQUFiO1FBQ0ksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMvQyxDQUFDO0lBQ0wsYUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJELHlFQUE2QjtBQUs3QjtJQUF5QywrQkFBTTtJQUUzQztRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOztJQUN2QixDQUFDO0lBRU0sNEJBQU0sR0FBYjtRQUNJLGlCQUFNLE1BQU0sV0FBRTtJQUNsQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLENBVndDLGdCQUFNLEdBVTlDOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJELGdFQUF5QjtBQUV6QiwwSEFBNEQ7QUFDNUQsa0dBQTRDO0FBRTVDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLGNBQUksQ0FBQyxPQUFPLEVBQUU7SUFDZCwwQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQkFBUSxFQUFFO0FBQ3hELENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IElDb2xvck1hbmFnZXIgZnJvbSBcIi4vSUNvbG9yTWFuYWdlclwiXG5pbXBvcnQgQ29sb3JMaXN0ZW5lciBmcm9tIFwiLi9Db2xvckxpc3RlbmVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JNYW5hZ2VyIGltcGxlbWVudHMgSUNvbG9yTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX29iamVjdDogQ29sb3JNYW5hZ2VyXG4gICAgcHJpdmF0ZSBfY29sb3I6IFRIUkVFLkNvbG9yXG4gICAgcHJpdmF0ZSBfY29sb3JMaXN0ZW5lcnM6IEFycmF5PENvbG9yTGlzdGVuZXI+ID0gbmV3IEFycmF5PENvbG9yTGlzdGVuZXI+KClcblxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogVEhSRUUuQ29sb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb2xvciA9IHRoaXMuX2dlbmVyYXRlQ29sb3IoKVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWFuYWdlcigpOiBDb2xvck1hbmFnZXIge1xuICAgICAgICBpZighQ29sb3JNYW5hZ2VyLl9vYmplY3Qpe1xuICAgICAgICAgICAgQ29sb3JNYW5hZ2VyLl9vYmplY3QgPSBuZXcgQ29sb3JNYW5hZ2VyKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDb2xvck1hbmFnZXIuX29iamVjdFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc3Vic2NyaWJlKG9iamVjdDogQ29sb3JMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc3Vic2NyaWJlZCEnKVxuICAgICAgICB0aGlzLl9jb2xvckxpc3RlbmVycy5wdXNoKG9iamVjdClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fY29sb3JMaXN0ZW5lcnMpXG4gICAgfVxuXG4gICAgcHVibGljIHVuc3Vic2NyaWJlKG9iamVjdDogQ29sb3JMaXN0ZW5lcik6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jb2xvckxpc3RlbmVycy5pbmRleE9mKG9iamVjdClcbiAgICAgICAgY29uc29sZS53YXJuKHRoaXMuX2NvbG9yTGlzdGVuZXJzKVxuICAgICAgICBpZihpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fY29sb3JMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmVycm9yKCdhdHRlbXB0IHRvIHVuc3Vic2NyaWJlIG5vbiBzdWJzY3JpYmVkIG9iamVjdCcpXG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZUNvbG9yKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLl9nZW5lcmF0ZUNvbG9yKClcbiAgICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMuX2NvbG9yTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICBvYmplY3Qub25Db2xvckNoYW5nZShjb2xvcilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dlbmVyYXRlQ29sb3IoKTogVEhSRUUuQ29sb3Ige1xuICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkNvbG9yKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdHMvR2FtZU9iamVjdCdcbmltcG9ydCBTY3JlZW4gZnJvbSAnLi9VSS9TY3JlZW4nXG5pbXBvcnQgU2NvcmVEaXNwbGF5IGZyb20gJy4vVUkvU2NvcmVEaXNwbGF5J1xuaW1wb3J0IEdhbWVTdGF0ZU1hbmFnZXIgZnJvbSAnLi9HYW1lU3RhdGVzL0dhbWVTdGF0ZU1hbmFnZXInXG5pbXBvcnQgU2NvcmUgZnJvbSAnLi9TY29yZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX29iamVjdDogR2FtZVxuICAgIHByaXZhdGUgX2dhbWVTdGF0ZU1hbmFnZXI6IEdhbWVTdGF0ZU1hbmFnZXJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKClcbiAgICBwcml2YXRlIF9zY2VuZTogVEhSRUUuU2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIHByaXZhdGUgX2NhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG4gICAgcHJpdmF0ZSBfZ2FtZU9iamVjdHM6IEFycmF5PEdhbWVPYmplY3Q+ID0gbmV3IEFycmF5PEdhbWVPYmplY3Q+KClcbiAgICBwcml2YXRlIF9zY29yZTogU2NvcmUgPSBuZXcgU2NvcmVcbiAgICBwcml2YXRlIF9zY3JlZW46IFNjcmVlbiB8IG51bGwgPSBudWxsXG4gICAgcHJpdmF0ZSBfc2NvcmVEaXNwbGF5OiBTY29yZURpc3BsYXkgfCBudWxsID0gbnVsbFxuXG5cbiAgICBwdWJsaWMgZ2V0IHNjb3JlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZS50b3RhbFxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2NvcmUobmV3U2NvcmU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zY29yZS50b3RhbCA9IG5ld1Njb3JlXG4gICAgICAgIGlmKHRoaXMuX3Njb3JlRGlzcGxheSkge1xuICAgICAgICAgICAgdGhpcy5fc2NvcmVEaXNwbGF5LnNjb3JlID0gdGhpcy5fc2NvcmUudG90YWxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2NyZWVuKCk6IFNjcmVlbiB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NyZWVuOyBcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNjcmVlbihzY3JlZW46IFNjcmVlbiB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2NyZWVuID0gc2NyZWVuXG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzY29yZURpc3BsYXkoKTogU2NvcmVEaXNwbGF5IHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZURpc3BsYXlcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNjb3JlRGlzcGxheShzY29yZURpc3BsYXk6IFNjb3JlRGlzcGxheSB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2NvcmVEaXNwbGF5ID0gc2NvcmVEaXNwbGF5XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBnYW1lT2JqZWN0cygpOiBBcnJheTxHYW1lT2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lT2JqZWN0c1xuICAgIH1cblxuICAgIC8vVE9ETzogcmVmYWN0b3IgdGhlc2UgZ2V0dGVycyBcbiAgICBwdWJsaWMgZ2V0Q2FtZXJhKCk6IFRIUkVFLkNhbWVyYSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW1lcmE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNjZW5lKCk6IFRIUkVFLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjZW5lO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUuY291bnQoXCJbR2FtZV0gR2FtZSBjb25zdHJ1Y3QhXCIpXG5cbiAgICAgICAgdGhpcy5fZ2FtZVN0YXRlTWFuYWdlciA9IEdhbWVTdGF0ZU1hbmFnZXIuZ2V0TWFuYWdlcigpXG5cbiAgICAgICAgLy8gbGV0IHBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmMDAwMCwgMSwgMTAwKVxuICAgICAgICBjb25zdCBwb2ludExpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYsIDEsIDEwMCwgMik7XG4gICAgICAgIHBvaW50TGlnaHQucG9zaXRpb24uc2V0KDAsIDAsIDUwKVxuICAgICAgICB0aGlzLl9zY2VuZS5hZGQocG9pbnRMaWdodClcblxuICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueiA9IDUwXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9yZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9nYW1lbG9vcCgpKVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R2FtZSgpOiBHYW1lIHtcbiAgICAgICAgaWYgKCFHYW1lLl9vYmplY3QpIHtcbiAgICAgICAgICAgIEdhbWUuX29iamVjdCA9IG5ldyBHYW1lKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBHYW1lLl9vYmplY3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2FtZWxvb3AoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIudXBkYXRlKClcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKHRoaXMuX3NjZW5lLCB0aGlzLl9jYW1lcmEpXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9nYW1lbG9vcCgpKVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRHYW1lT2JqZWN0KG9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9nYW1lT2JqZWN0cy5wdXNoKG9iamVjdClcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlR2FtZU9iamVjdCh0YXJnZXQ6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fZ2FtZU9iamVjdHMuaW5kZXhPZih0YXJnZXQpXG4gICAgICAgIHRoaXMuX2dhbWVPYmplY3RzLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdhbWVPYmplY3Qge1xuICAgIHByb3RlY3RlZCBfbWVzaDogVEhSRUUuTWVzaFxuICAgIHByb3RlY3RlZCBfZ2VvbWV0cnk6IFRIUkVFLkdlb21ldHJ5XG4gICAgcHJvdGVjdGVkIF9nYW1lOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcm90ZWN0ZWQgX2JvdW5kaW5nQm94OiBUSFJFRS5Cb3gzID0gbmV3IFRIUkVFLkJveDMoKVxuXG4gICAgcHVibGljIGdldEdlb21ldHJ5KCkgOiBUSFJFRS5HZW9tZXRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZW9tZXRyeVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCb3VuZGluZ0JveCgpIDogVEhSRUUuQm94MyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZGluZ0JveFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSA6IFRIUkVFLlZlY3RvcjMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaC5wb3NpdGlvblxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGdlb21ldHJ5IDogVEhSRUUuR2VvbWV0cnksIG1hdGVyaWFsIDogVEhSRUUuTWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBnZW9tZXRyeVxuICAgICAgICB0aGlzLl9tZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuXG4gICAgICAgIC8vVXNpbmcgLnNldEZyb21PYmplY3Qgb3ZlciBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3ggYmVjYXVzZSB5b3UgaGF2ZSB0byBcbiAgICAgICAgLy9yZWNvbXB1dGUgdGhlIGJvdW5kaW5nQm94IG1hbnVhbGx5IHdoaWxlIHlvdSBjYW4gcmVjb21wdXRlIC5zZXRGcm9tT2JqZWN0IGJ5IGNhbGxpbmcgaXQgYWdhaW5cbiAgICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8xMTcwIFxuICAgICAgICBcbiAgICAgICAgLy9IbW1tbSB0aGlzIGNhdXNlcyB0aGUgcGFyYWRveCB0aGF0IG1ha2VzIGl0IHJhdGhlciBoYXJkIGZvciBtZSB0byBjcmVhdGUgbmV3IGdhbWVPYmplY3RzIGluc2lkZSBvZiB0aGUgZ2FtZVxuICAgICAgICB0aGlzLl9nYW1lLmdldFNjZW5lKCkuYWRkKHRoaXMuX21lc2gpXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhbWUuZ2V0U2NlbmUoKS5yZW1vdmUodGhpcy5fbWVzaClcbiAgICAgICAgdGhpcy5fZ2FtZS5yZW1vdmVHYW1lT2JqZWN0KHRoaXMpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2JvdW5kaW5nQm94LnNldEZyb21PYmplY3QodGhpcy5fbWVzaClcbiAgICB9XG5cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcblxuLy9UT0RPOiBUcnkgdG8gYWRkIGEgbGlnaHQgdG8gdGhlIHBsYXllclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgR2FtZU9iamVjdCB7XG4gICAgcHJpdmF0ZSBfbW91c2U6IFRIUkVFLlZlY3RvcjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpXG4gICAgcHJpdmF0ZSBfdHJhY2tDYiA9IChlOiBNb3VzZUV2ZW50KSA9PiB7IHRoaXMuX3RyYWNlTW91c2UoZSkgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihuZXcgVEhSRUUuQm94R2VvbWV0cnkoMS41LCAxLjUsIDEuNSksIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDljYjNkOCB9KSlcbiAgICAgICAgdGhpcy5fbWVzaC5wb3NpdGlvbi56ID0gdGhpcy5fZ2FtZS5nZXRDYW1lcmEoKS5wb3NpdGlvbi56IC0gMTBcbiAgICAgICAgdGhpcy5hZGRNb3VzZVRyYWNraW5nKClcbiAgICB9XG5cbiAgICAvL05PVEU6IEkgcmVjZW50bHkgZm91bmQgYW4gaXNzdWUgdGhhdCBkaXNjdXNzZWQgdGhlIG1hdGggb2YgZmluZGluZyB0aGUgRk9WXG4gICAgLy9Vc2luZyB0aGVzZSBjYWxjdWxhdGlvbnMgbWlnaHQgZW5hYmxlIG1lIHRvIHBsYWNlIHRoZSBwbGF5ZXIgZGlyZWN0bHkgdW5kZXIgdGhlIG1vdXNlIG5vIG1hdHRlciBob3cgYmlnIHRoZSBzY3JlZW5cbiAgICAvL1RoaXMgd291bGQgbWVhbiBJIGhhdmUgdG8gaW1wbGVtZW50IGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSBwbGF5ZXIgJiB0aGUgdHVubmVsXG4gICAgLy9DdXJyZW50IGNhbGN1bGF0aW9ucyBtYWtlIGl0IGltcG9zc2libGUgdG8gcmVhY2ggdGhlIHR1bm5lbCBpbiB0aGUgZmlyc3QgcGxhY2VcbiAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvaXNzdWVzLzEyMzlcbiAgICBwcml2YXRlIF90cmFjZU1vdXNlKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy9ub3JtYWxpemVkIG1vdXNlIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vcmV0dXJucyBudW1iZXIgYmV0d2VlbiAtMSAmIDEgcmVwcmVzZW50aW5nIHBvc2l0aW9uIG9uIHNjcmVlbiBcbiAgICAgICAgLy93aGVyZSAwLDAgaXMgdGhlIG1pZGRsZVxuICAgICAgICAvL2h0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2NvcmUvUmF5Y2FzdGVyXG4gICAgICAgIHRoaXMuX21vdXNlLnggPSAoZS54IC8gd2luZG93LmlubmVyV2lkdGgpICogMiAtIDFcbiAgICAgICAgdGhpcy5fbW91c2UueSA9IC0gKGUueSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiAyICsgMVxuXG4gICAgICAgIC8vdGhlIHdob2xlIHBvc2l0aW9uaW5nIG9mIHRoZSBnYW1lIGlzIGJhc2VkIG9uIHRoZSB0dW5uZWwgd2hpY2ggaGFzIGEgcmFkaXVzIG9mIDEwXG4gICAgICAgIC8vdGhlIGVkZ2VzICh5KSBvZiB0aGUgdHVubmVsIG9uIHRoZSBjdXJyZW50IHogaW5kZXggb2YgdGhlIHBsYXllciBhcmUgbm90IDEwMCUgb24gc2NyZWVuIFxuICAgICAgICAvL3RoZSB2aXNpYmlsaXR5IG9mIGVkZ2VzICh4KSBvZiB0aGUgdHVubmVsIGRlcGVuZHMgb24gdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW5cbiAgICAgICAgLy90aGUgY29ybmVycyBvZiB0aGUgc2NyZWVuIGFyZSBub3QgMTAwJSBhdmFpbGFibGUgYmVjYXVzZSB0aGUgZWRnZSBvZiB0aGUgdHVubmVsIGN1dHMgdGhlbSBvZiBvbiB0aGUgY3VycmVudCB6IGluZGV4IG9mIHRoZSBwbGF5ZXJcbiAgICAgICAgbGV0IHdvcmxkWEVkZ2UgPSA2XG4gICAgICAgIGxldCB3b3JsZFlFZGdlID0gNlxuXG4gICAgICAgIC8vSSBhbSBzdGlsbCBub3Qgc3VyZSB3aHkgYnV0IGEgdHJhbnNmb3JtYXRpb24gb2Ygc3BlY2lmaWNhbGx5IHRoZSBzY3JlZW4gd2lkdGggaGFzIGEgaHVnZSBpbXBhY3Qgb24gcGxheWVyIG1vdmVtZW50XG4gICAgICAgIC8vaXQgY291bGQgYmUgYmVjYXVzZSBvZiB0aGUgY2FsY3VsYXRpb25zIG9mIHRoZSBwZXJzcGVjdGl2ZSBjYW1lcmEgc2luY2UgYSBoaWdoZXIgd2lkdGggbWVhbnMgdGhhdCBtb3JlIG9mIHRoZSB3b3JsZCBpcyBzaG93biB0byB0aGUgcGxheWVyXG4gICAgICAgIC8vZm9yIGEgdmlld3BvcnQgd2hlcmUgeCA8IDkwMHB4IHRoZXJlIG5lZWQgdG8gYmUgc21hbGxlciB3b3JsZCBlZGdlc1xuICAgICAgICAvL05PVEU6IGlmIEkgZXZlciBoYXZlIHNvbWUgdGltZSBsZWZ0IEkgY291bGQgcGxvdCB0aGUgZGVzaXJlZCBlZGdlcyBvZiBhdCBjZXJ0YWluIHZpZXdwb3J0IGRyYXcgYSBncmFwaCBhbmQgY3JlYXRlIGEgZm9ydW1sYSBmb3IgdGhpc1xuICAgICAgICAvL3ZpZXdwb3J0cyBhcmUgd2F5IGVhc2llciBmb3Igbm93IDozIFxuXG4gICAgICAgIC8vVE9ETzogZmluZCBhIHdheSB0byByZWZhY3RvciB0aGlzIGlmIHBvc3NpYmxlXG4gICAgICAgIC8vbm90IHN1cmUgaG93IHlldCwgYSBzd2l0Y2ggb25seSBhbGxvd3MgMSB2YWx1ZSBidXQgdGhlcmUgc2hvdWxkIGJlIGEgcHJldHRpZXIgd2F5IG91dCB0aGVyZSB0byBkbyB0aGlzXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5MDAgJiYgd2luZG93LmlubmVyV2lkdGggPiA2MDApIHtcbiAgICAgICAgICAgIHdvcmxkWEVkZ2UgPSA1XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNjAwICYmIHdpbmRvdy5pbm5lcldpZHRoID4gNTAwKSB7XG4gICAgICAgICAgICB3b3JsZFhFZGdlID0gM1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDUwMCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDQwMCkge1xuICAgICAgICAgICAgd29ybGRYRWRnZSA9IDJcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA0MDAgJiYgd2luZG93LmlubmVyV2lkdGggPiAyOTkpIHtcbiAgICAgICAgICAgIHdvcmxkWEVkZ2UgPSAxLjVcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDMwMCkge1xuICAgICAgICAgICAgLy9UT0RPOiBcbiAgICAgICAgICAgIC8vZGV2aWNlIG5vdCBzdXBwb3J0ZWQsIHNjcmVlbiB0b28gc21hbGxcbiAgICAgICAgICAgIC8vZXhpdCBnYW1lXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tZXNoLnBvc2l0aW9uLnggPSB0aGlzLl9tb3VzZS54ICogd29ybGRYRWRnZVxuICAgICAgICB0aGlzLl9tZXNoLnBvc2l0aW9uLnkgPSB0aGlzLl9tb3VzZS55ICogd29ybGRZRWRnZVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRNb3VzZVRyYWNraW5nKCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl90cmFja0NiKVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVNb3VzZVRyYWNraW5nKCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl90cmFja0NiKVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3ZlTW91c2VUcmFja2luZygpXG4gICAgICAgIHN1cGVyLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKClcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJy4vR2FtZU9iamVjdCdcbmltcG9ydCBDb2xvckxpc3RlbmVyIGZyb20gJy4uL0NvbG9yTWFuYWdlbWVudC9Db2xvckxpc3RlbmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdW5uZWwgZXh0ZW5kcyBHYW1lT2JqZWN0IGltcGxlbWVudHMgQ29sb3JMaXN0ZW5lciB7XG4gICAgY29uc3RydWN0b3IoY29sb3I6IFRIUkVFLkNvbG9yKSB7XG4gICAgICAgIHN1cGVyKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDEwLCAxMCwgOTAsIDMyLCAxLCB0cnVlKSwgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKSlcbiAgICAgICAgdGhpcy5fbWVzaC5tYXRlcmlhbC5zaWRlID0gVEhSRUUuQmFja1NpZGVcbiAgICAgICAgdGhpcy5fbWVzaC5yb3RhdGlvbi54ID0gMS41N1xuICAgICAgICB0aGlzLm9uQ29sb3JDaGFuZ2UoY29sb3IpXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ29sb3JDaGFuZ2UoY29sb3I6IFRIUkVFLkNvbG9yKTogdm9pZCB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21lc2gubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbFxuICAgICAgICBtYXRlcmlhbC5jb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xuICAgICAgICAvL3Byb2JhYmx5IHNvbWUgYXdlc29tZSBjb2xvciBjaGFuZ2luZyBzdHVmZiBpbiB0aGUgZnV0dXJlPyBcbiAgICB9XG59IiwiaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9XYWxsQW5pbWF0aW9uJ1xuaW1wb3J0IFdhbGwgZnJvbSAnLi4vV2FsbCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uUmlnaHQgZnJvbSAnLi9XYWxsQW5pbWF0aW9uUmlnaHQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsQW5pbWF0aW9uTGVmdCBpbXBsZW1lbnRzIFdhbGxBbmltYXRpb24ge1xuICAgIHB1YmxpYyB3YWxsOiBXYWxsXG4gICAgcHJpdmF0ZSBfd2lkdGhkcmF3aW5nOiBib29sZWFuID0gZmFsc2VcbiAgICBwcml2YXRlIF9zdGFydFBvc2l0aW9uWDogbnVtYmVyXG4gICAgcHJpdmF0ZSBfZW5kUG9zaXRpb25YOiBudW1iZXIgfCBib29sZWFuXG5cbiAgICBjb25zdHJ1Y3Rvcih3YWxsOiBXYWxsLCBlbmRQb3NpdGlvblg6IG51bWJlciB8IGJvb2xlYW4gPSA2LCBzdGFydFBvc2l0aW9uWDogbnVtYmVyID0gMTUpIHtcbiAgICAgICAgdGhpcy53YWxsID0gd2FsbFxuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uWCA9IHN0YXJ0UG9zaXRpb25YXG4gICAgICAgIHRoaXMud2FsbC5wb3NpdGlvbi54ID0gdGhpcy5fc3RhcnRQb3NpdGlvblhcbiAgICAgICAgdGhpcy5fZW5kUG9zaXRpb25YID0gZW5kUG9zaXRpb25YXG4gICAgfVxuXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKCkgOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy53YWxsLnBvc2l0aW9uLnogPCB0aGlzLndhbGwubWF4RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMud2FsbC5wb3NpdGlvbi56ICs9IDAuMVxuICAgICAgICB9IGVsc2UgaWYodGhpcy5fZW5kUG9zaXRpb25YICYmIHRoaXMud2FsbC5wb3NpdGlvbi56ID49IHRoaXMud2FsbC5tYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy53YWxsLmFuaW1hdGlvbiA9IG5ldyBXYWxsQW5pbWF0aW9uUmlnaHQodGhpcy53YWxsLCBmYWxzZSwgdGhpcy53YWxsLnBvc2l0aW9uLngpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5zZXJ0QW5pbWF0aW9uKCkgOiB2b2lkIHtcbiAgICAgICAgaWYoICF0aGlzLl9lbmRQb3NpdGlvblggfHwgKHRoaXMud2FsbC5wb3NpdGlvbi54ID49IHRoaXMuX2VuZFBvc2l0aW9uWCAmJiB0aGlzLl93aWR0aGRyYXdpbmcgPT0gZmFsc2UpKSB7XG4gICAgICAgICAgICB0aGlzLndhbGwucG9zaXRpb24ueCAtPSAwLjA1IFxuICAgICAgICB9IFxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLmluc2VydEFuaW1hdGlvbigpXG4gICAgICAgIHRoaXMuZGVwdGhBbmltYXRpb24oKVxuICAgIH1cbn0iLCJpbXBvcnQgV2FsbEFuaW1hdGlvbiBmcm9tICcuL1dhbGxBbmltYXRpb24nXG5pbXBvcnQgV2FsbCBmcm9tICcuLi9XYWxsJ1xuaW1wb3J0IFdhbGxBbmltYXRpb25MZWZ0IGZyb20gJy4vV2FsbEFuaW1hdGlvbkxlZnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxBbmltYXRpb25SaWdodCBpbXBsZW1lbnRzIFdhbGxBbmltYXRpb24ge1xuICAgIHB1YmxpYyB3YWxsOiBXYWxsXG4gICAgcHJpdmF0ZSBfc3RhcnRQb3NpdGlvblg6IG51bWJlclxuICAgIHByaXZhdGUgX2VuZFBvc2l0aW9uWDogbnVtYmVyIHwgYm9vbGVhblxuXG4gICAgY29uc3RydWN0b3Iod2FsbDogV2FsbCwgZW5kUG9zaXRpb25YOiBudW1iZXIgfCBib29sZWFuID0gLTYsIHN0YXJ0UG9zaXRpb25YOiBudW1iZXIgPSAtMTUpIHtcbiAgICAgICAgdGhpcy53YWxsID0gd2FsbFxuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uWCA9IHN0YXJ0UG9zaXRpb25YXG4gICAgICAgIHRoaXMud2FsbC5wb3NpdGlvbi54ID0gdGhpcy5fc3RhcnRQb3NpdGlvblhcbiAgICAgICAgdGhpcy5fZW5kUG9zaXRpb25YID0gZW5kUG9zaXRpb25YXG4gICAgfVxuXG4gICAgcHVibGljIGRlcHRoQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy53YWxsLnBvc2l0aW9uLnogPCB0aGlzLndhbGwubWF4RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMud2FsbC5wb3NpdGlvbi56ICs9IDAuMVxuICAgICAgICB9IGVsc2UgaWYodGhpcy5fZW5kUG9zaXRpb25YICYmIHRoaXMud2FsbC5wb3NpdGlvbi56ID49IHRoaXMud2FsbC5tYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy53YWxsLmFuaW1hdGlvbiA9IG5ldyBXYWxsQW5pbWF0aW9uTGVmdCh0aGlzLndhbGwsIGZhbHNlLCB0aGlzLndhbGwucG9zaXRpb24ueClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbnNlcnRBbmltYXRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICggIXRoaXMuX2VuZFBvc2l0aW9uWCB8fCAodGhpcy53YWxsLnBvc2l0aW9uLnggPD0gdGhpcy5fZW5kUG9zaXRpb25YKSkge1xuICAgICAgICAgICAgdGhpcy53YWxsLnBvc2l0aW9uLnggKz0gMC4wNVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnNlcnRBbmltYXRpb24oKVxuICAgICAgICB0aGlzLmRlcHRoQW5pbWF0aW9uKClcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICcuLi9HYW1lT2JqZWN0J1xuaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9BbmltYXRpb25zL1dhbGxBbmltYXRpb24nXG5pbXBvcnQgQ29sb3JMaXN0ZW5lciBmcm9tICcuLi8uLi9Db2xvck1hbmFnZW1lbnQvQ29sb3JMaXN0ZW5lcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbCBleHRlbmRzIEdhbWVPYmplY3QgaW1wbGVtZW50cyBDb2xvckxpc3RlbmVyIHtcbiAgICBwcml2YXRlIF9tYXhEaXN0YW5jZUZyb21DYW1lcmE6IG51bWJlciA9IHRoaXMuX2dhbWUuZ2V0Q2FtZXJhKCkucG9zaXRpb24ueiAtIDhcbiAgICBwcml2YXRlIF9hbmltYXRpb246IFdhbGxBbmltYXRpb24gfCBudWxsID0gbnVsbFxuXG4gICAgcHVibGljIGdldCBhbmltYXRpb24oKTogV2FsbEFuaW1hdGlvbiB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uXG4gICAgfVxuXG4gICAgcHVibGljIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBXYWxsQW5pbWF0aW9uIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSBhbmltYXRpb25cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6IFRIUkVFLlZlY3RvcjMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzaC5wb3NpdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF4RGlzdGFuY2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERpc3RhbmNlRnJvbUNhbWVyYVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbG9yOiBUSFJFRS5Db2xvcikge1xuICAgICAgICBzdXBlcihuZXcgVEhSRUUuQm94R2VvbWV0cnkoMTAsIDIwLCAxKSwgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKSlcbiAgICAgICAgdGhpcy5vbkNvbG9yQ2hhbmdlKGNvbG9yKVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNvbG9yQ2hhbmdlKGNvbG9yOiBUSFJFRS5Db2xvcik6IHZvaWQge1xuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9tZXNoLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWxcbiAgICAgICAgbWF0ZXJpYWwuY29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci51cGRhdGUoKVxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pe1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnVwZGF0ZSgpXG4gICAgICAgIH0gIFxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJ1xuaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4uL1VJL1N0YXJ0U2NyZWVuJ1xuaW1wb3J0IEdhbWVTdGF0ZU1hbmFnZXIgZnJvbSAnLi9HYW1lU3RhdGVNYW5hZ2VyJ1xuaW1wb3J0IEdhbWVQbGF5SW5pdCBmcm9tICcuL0dhbWVQbGF5SW5pdCdcbmltcG9ydCBHYW1lU3RhdGUgZnJvbSAnLi9HYW1lU3RhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVJbml0IGltcGxlbWVudHMgR2FtZVN0YXRlIHtcbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lXG4gICAgcHJpdmF0ZSBfZ2FtZVN0YXRlTWFuYWdlcjogR2FtZVN0YXRlTWFuYWdlclxuICAgIHByaXZhdGUgY2xpY2tDYiA9IChlIDogTW91c2VFdmVudCkgPT4geyB0aGlzLmNsaWNrSGFuZGxlcihlKSB9IFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgPSBHYW1lLmdldEdhbWUoKVxuICAgICAgICB0aGlzLl9nYW1lU3RhdGVNYW5hZ2VyID0gR2FtZVN0YXRlTWFuYWdlci5nZXRNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5fZ2FtZS5zY3JlZW4gPSBuZXcgU3RhcnRTY3JlZW4oKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrQ2IpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHsgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0hhbmRsZXIoZTogTW91c2VFdmVudCkgOiB2b2lkIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50XG5cbiAgICAgICAgaWYodGFyZ2V0Lm5vZGVOYW1lID09PSAnQlVUVE9OJyl7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrQ2IpXG4gICAgICAgICAgICBpZih0aGlzLl9nYW1lLnNjcmVlbil7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZS5zY3JlZW4ucmVtb3ZlKClcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIuc3RhdGUgPSBuZXcgR2FtZVBsYXlJbml0KClcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJ1xuaW1wb3J0IEdhbWVTdGF0ZU1hbmFnZXIgZnJvbSAnLi4vR2FtZVN0YXRlcy9HYW1lU3RhdGVNYW5hZ2VyJ1xuaW1wb3J0IEdhbWVQbGF5SW5pdCBmcm9tICcuLi9HYW1lU3RhdGVzL0dhbWVQbGF5SW5pdCdcbmltcG9ydCBXYWxsIGZyb20gJy4uL0dhbWVPYmplY3RzL1dhbGwvV2FsbCdcbmltcG9ydCBFbmRTY3JlZW4gZnJvbSAnLi4vVUkvRW5kU2NyZWVuJ1xuaW1wb3J0IEdhbWVTdGF0ZSBmcm9tICcuL0dhbWVTdGF0ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU92ZXIgaW1wbGVtZW50cyBHYW1lU3RhdGUge1xuICAgIHByaXZhdGUgX2dhbWU6IEdhbWUgXG4gICAgcHJpdmF0ZSBfZ2FtZVN0YXRlTWFuYWdlcjogR2FtZVN0YXRlTWFuYWdlclxuICAgIHByaXZhdGUgY2xpY2tDYiA9IChlIDogTW91c2VFdmVudCkgPT4geyB0aGlzLmNsaWNrSGFuZGxlcihlKSB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IEdhbWUuZ2V0R2FtZSgpXG4gICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIgPSBHYW1lU3RhdGVNYW5hZ2VyLmdldE1hbmFnZXIoKVxuXG4gICAgICAgIGlmKHRoaXMuX2dhbWUuc2NvcmVEaXNwbGF5KXtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUuc2NvcmVEaXNwbGF5LnJlbW92ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuX2dhbWUuZ2FtZU9iamVjdHMubGVuZ3RoIC0gMSA7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lLmdhbWVPYmplY3RzW2luZGV4XSBpbnN0YW5jZW9mIFdhbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lLmdhbWVPYmplY3RzW2luZGV4XS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZ2FtZS5zY3JlZW4gPSBuZXcgRW5kU2NyZWVuKClcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0NiKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7IH1cblxuICAgIHByaXZhdGUgY2xpY2tIYW5kbGVyKGUgOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudFxuXG4gICAgICAgIGlmKHRhcmdldC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpe1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0NiKVxuICAgICAgICAgICAgaWYodGhpcy5fZ2FtZS5zY3JlZW4pe1xuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWUuc2NyZWVuLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIuc3RhdGUgPSBuZXcgR2FtZVBsYXlJbml0KClcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZVN0YXRlTWFuYWdlciBmcm9tICcuLi9HYW1lU3RhdGVzL0dhbWVTdGF0ZU1hbmFnZXInXG5pbXBvcnQgR2FtZVBsYXkgZnJvbSAnLi9HYW1lUGxheSdcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnXG5pbXBvcnQgUGxheWVyIGZyb20gJy4uL0dhbWVPYmplY3RzL1BsYXllcidcbmltcG9ydCBHYW1lU3RhdGUgZnJvbSAnLi9HYW1lU3RhdGUnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBhdXNlIGltcGxlbWVudHMgR2FtZVN0YXRlIHtcbiAgICBwcml2YXRlIF9wYXVzZUtleUNiID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHsgdGhpcy5fcGF1c2VLZXlIYW5kbGVyKGUpIH1cbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lXG4gICAgcHJpdmF0ZSBfZ2FtZVN0YXRlTWFuYWdlcjogR2FtZVN0YXRlTWFuYWdlclxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgPSBHYW1lLmdldEdhbWUoKVxuICAgICAgICB0aGlzLl9nYW1lU3RhdGVNYW5hZ2VyID0gR2FtZVN0YXRlTWFuYWdlci5nZXRNYW5hZ2VyKClcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX3BhdXNlS2V5Q2IpXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHsgfVxuXG4gICAgcHJpdmF0ZSBfcGF1c2VLZXlIYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYoZS5rZXkgIT0gJyAnKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9wYXVzZUtleUNiKVxuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9nYW1lLmdhbWVPYmplY3RzKXtcbiAgICAgICAgICAgIGlmKHBsYXllciBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgIHBsYXllci5hZGRNb3VzZVRyYWNraW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9nYW1lU3RhdGVNYW5hZ2VyLnN0YXRlID0gbmV3IEdhbWVQbGF5KClcbiAgICB9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSdcbmltcG9ydCBHYW1lU3RhdGVNYW5hZ2VyIGZyb20gJy4uL0dhbWVTdGF0ZXMvR2FtZVN0YXRlTWFuYWdlcidcbmltcG9ydCBHYW1lT3ZlciBmcm9tICcuLi9HYW1lU3RhdGVzL0dhbWVPdmVyJ1xuaW1wb3J0IExldmVsR2VuZXJhdG9yIGZyb20gJy4uL0xldmVsR2VuZXJhdG9yJ1xuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi4vR2FtZU9iamVjdHMvR2FtZU9iamVjdCdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi4vR2FtZU9iamVjdHMvUGxheWVyJ1xuaW1wb3J0IFdhbGwgZnJvbSAnLi4vR2FtZU9iamVjdHMvV2FsbC9XYWxsJ1xuaW1wb3J0IEdhbWVQYXVzZSBmcm9tICcuL0dhbWVQYXVzZSdcbmltcG9ydCBDb2xvck1hbmFnZXIgZnJvbSAnLi4vQ29sb3JNYW5hZ2VtZW50L0NvbG9yTWFuYWdlcidcbmltcG9ydCBHYW1lU3RhdGUgZnJvbSAnLi9HYW1lU3RhdGUnXG5pbXBvcnQgSUNvbG9yTWFuYWdlciBmcm9tICcuLi9Db2xvck1hbmFnZW1lbnQvSUNvbG9yTWFuYWdlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXkgaW1wbGVtZW50cyBHYW1lU3RhdGUge1xuICAgIHByaXZhdGUgX2dhbWU6IEdhbWVcbiAgICBwcml2YXRlIF9nYW1lU3RhdGVNYW5hZ2VyOiBHYW1lU3RhdGVNYW5hZ2VyXG4gICAgcHJpdmF0ZSBfbGV2ZWxHZW5lcmF0b3I6IExldmVsR2VuZXJhdG9yXG4gICAgcHJpdmF0ZSBfY29sb3JNYW5hZ2VyOiBJQ29sb3JNYW5hZ2VyXG4gICAgcHJpdmF0ZSBfcGF1c2VLZXlDYiA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7IHRoaXMuX3BhdXNlS2V5SGFuZGxlcihlKSB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IEdhbWUuZ2V0R2FtZSgpXG4gICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIgPSBHYW1lU3RhdGVNYW5hZ2VyLmdldE1hbmFnZXIoKVxuICAgICAgICB0aGlzLl9sZXZlbEdlbmVyYXRvciA9IExldmVsR2VuZXJhdG9yLmdldEdlbmVyYXRvcigpIFxuICAgICAgICB0aGlzLl9jb2xvck1hbmFnZXIgPSBDb2xvck1hbmFnZXIuZ2V0TWFuYWdlcigpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9wYXVzZUtleUNiKVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbGV2ZWxHZW5lcmF0b3IudXBkYXRlKClcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IG9iajEgb2YgdGhpcy5fZ2FtZS5nYW1lT2JqZWN0cykge1xuICAgICAgICAgICAgb2JqMS51cGRhdGUoKVxuXG4gICAgICAgICAgICBpZihvYmoxIGluc3RhbmNlb2YgV2FsbCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY2hlY2tPdXRPZkJvdW5kcyhvYmoxKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2dhbWUuc2NvcmVEaXNwbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dhbWUuc2NvcmUrK1xuICAgICAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yTWFuYWdlci51bnN1YnNjcmliZShvYmoxKVxuICAgICAgICAgICAgICAgICAgICBvYmoxLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBvYmoyIG9mIHRoaXMuX2dhbWUuZ2FtZU9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZihvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBXYWxsKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2hlY2tDb2xsaXNpb24ob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yTWFuYWdlci51bnN1YnNjcmliZShvYmoyKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX3BhdXNlS2V5Q2IpXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nYW1lU3RhdGVNYW5hZ2VyLnN0YXRlID0gbmV3IEdhbWVPdmVyKClcbiAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tDb2xsaXNpb24ob2JqMTogR2FtZU9iamVjdCwgb2JqMjogR2FtZU9iamVjdCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgYm94T2JqID0gb2JqMS5nZXRCb3VuZGluZ0JveCgpXG4gICAgICAgIGxldCBib3hPdGhPYmogPSBvYmoyLmdldEJvdW5kaW5nQm94KClcblxuICAgICAgICBpZiAoYm94T2JqLmludGVyc2VjdHNCb3goYm94T3RoT2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrT3V0T2ZCb3VuZHMod2FsbDogV2FsbCk6IGJvb2xlYW4ge1xuICAgICAgICBpZih3YWxsLnBvc2l0aW9uLnggPiAxNSB8fCB3YWxsLnBvc2l0aW9uLnggPCAtMTUgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGF1c2VLZXlIYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYoZS5rZXkgIT0gJyAnKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fZ2FtZS5nYW1lT2JqZWN0cykge1xuICAgICAgICAgICAgaWYocGxheWVyIGluc3RhbmNlb2YgUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLnJlbW92ZU1vdXNlVHJhY2tpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX3BhdXNlS2V5Q2IpXG4gICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIuc3RhdGUgPSBuZXcgR2FtZVBhdXNlKCk7IFxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi4vR2FtZVwiXG5pbXBvcnQgU2NvcmVEaXNwbGF5IGZyb20gXCIuLi9VSS9TY29yZURpc3BsYXlcIlxuaW1wb3J0IFR1bm5lbCBmcm9tIFwiLi4vR2FtZU9iamVjdHMvVHVubmVsXCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL0dhbWVPYmplY3RzL1BsYXllclwiXG5pbXBvcnQgR2FtZVN0YXRlTWFuYWdlciBmcm9tIFwiLi9HYW1lU3RhdGVNYW5hZ2VyXCJcbmltcG9ydCBHYW1lUGxheSBmcm9tIFwiLi9HYW1lUGxheVwiXG5pbXBvcnQgQ29sb3JNYW5hZ2VyIGZyb20gXCIuLi9Db2xvck1hbmFnZW1lbnQvQ29sb3JNYW5hZ2VyXCJcbmltcG9ydCBHYW1lU3RhdGUgZnJvbSBcIi4vR2FtZVN0YXRlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXlJbml0IGltcGxlbWVudHMgR2FtZVN0YXRlIHtcbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lXG4gICAgcHJpdmF0ZSBfZ2FtZVN0YXRlTWFuYWdlcjogR2FtZVN0YXRlTWFuYWdlclxuICAgIHByaXZhdGUgX2NvbG9yTWFuYWdlcjogQ29sb3JNYW5hZ2VyXG4gICAgcHJpdmF0ZSBfZG9uZTogQm9vbGVhbiA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IEdhbWUuZ2V0R2FtZSgpXG4gICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIgPSBHYW1lU3RhdGVNYW5hZ2VyLmdldE1hbmFnZXIoKVxuICAgICAgICB0aGlzLl9jb2xvck1hbmFnZXIgPSBDb2xvck1hbmFnZXIuZ2V0TWFuYWdlcigpXG4gICAgICAgIHRoaXMuX2dhbWUuc2NvcmVEaXNwbGF5ID0gbmV3IFNjb3JlRGlzcGxheSgpXG4gICAgICAgIGxldCB0dW5uZWwgPSBuZXcgVHVubmVsKHRoaXMuX2NvbG9yTWFuYWdlci5jb2xvcilcbiAgICAgICAgdGhpcy5fY29sb3JNYW5hZ2VyLnN1YnNjcmliZSh0dW5uZWwpXG4gICAgICAgIHRoaXMuX2dhbWUuYWRkR2FtZU9iamVjdCh0dW5uZWwpXG4gICAgICAgIHRoaXMuX2dhbWUuYWRkR2FtZU9iamVjdChuZXcgUGxheWVyKCkpXG4gICAgICAgIHRoaXMuX2RvbmUgPSB0cnVlXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHsgXG4gICAgICAgIGlmKHRoaXMuX2RvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVTdGF0ZU1hbmFnZXIuc3RhdGUgPSBuZXcgR2FtZVBsYXkoKVxuICAgICAgICB9XG4gICAgfVxufSAiLCJpbXBvcnQgR2FtZVN0YXRlIGZyb20gXCIuL0dhbWVTdGF0ZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZU1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIF9vYmplY3Q6IEdhbWVTdGF0ZU1hbmFnZXJcbiAgICBwcml2YXRlIF9zdGF0ZTogR2FtZVN0YXRlIHwgbnVsbCA9IG51bGxcblxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogR2FtZVN0YXRlIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc3RhdGUoc3RhdGU6IEdhbWVTdGF0ZSB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZVxuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7ICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldE1hbmFnZXIoKTogR2FtZVN0YXRlTWFuYWdlciB7XG4gICAgICAgIGlmKCFHYW1lU3RhdGVNYW5hZ2VyLl9vYmplY3Qpe1xuICAgICAgICAgICAgR2FtZVN0YXRlTWFuYWdlci5fb2JqZWN0ID0gbmV3IEdhbWVTdGF0ZU1hbmFnZXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEdhbWVTdGF0ZU1hbmFnZXIuX29iamVjdFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUudXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcbmltcG9ydCBXYWxsIGZyb20gJy4vR2FtZU9iamVjdHMvV2FsbC9XYWxsJ1xuaW1wb3J0IFdhbGxBbmltYXRpb24gZnJvbSAnLi9HYW1lT2JqZWN0cy9XYWxsL0FuaW1hdGlvbnMvV2FsbEFuaW1hdGlvbidcbmltcG9ydCBXYWxsQW5pbWF0aW9uTGVmdCBmcm9tICcuL0dhbWVPYmplY3RzL1dhbGwvQW5pbWF0aW9ucy9XYWxsQW5pbWF0aW9uTGVmdCdcbmltcG9ydCBXYWxsQW5pbWF0aW9uUmlnaHQgZnJvbSAnLi9HYW1lT2JqZWN0cy9XYWxsL0FuaW1hdGlvbnMvV2FsbEFuaW1hdGlvblJpZ2h0J1xuaW1wb3J0IENvbG9yTWFuYWdlciBmcm9tICcuL0NvbG9yTWFuYWdlbWVudC9Db2xvck1hbmFnZXInXG4vL1RPRE86IENoYW5nZSBzcGVlZCBiYXNlZCBvbiBkaWZmaWN1bHR5IFxuXG4vL2EgbGV2ZWwgb25seSB0YWtlcyBjYXJlIG9mIGhvdyBhbmQgd2hpY2ggb2JqZWN0cyBhcmUgc3Bhd25lZCBpbnRvIHRoZSBnYW1lIFxuLy95b3Ugc2hvdWxkIGJlIGFibGUgdG8gZ2l2ZSBhIGRpZmZpY3VsdHkgdG8gYSBsZXZlbCBhbmQgdGhlIGxldmVsIHdpbGwgYWN0IGJhc2VkIG9uIGRpZmZpY3VsdHlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsR2VuZXJhdG9yIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfb2JqZWN0OiBMZXZlbEdlbmVyYXRvclxuICAgIHByaXZhdGUgX2RpZmZpY3VsdHk6IG51bWJlclxuICAgIHByaXZhdGUgX3RhcmdldFNjb3JlOiBudW1iZXJcbiAgICBwcml2YXRlIF90aW1lcjogVEhSRUUuQ2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soZmFsc2UpXG4gICAgcHJpdmF0ZSBfdGltZUhpc3Rvcnk6IG51bWJlciA9IDBcbiAgICBwcml2YXRlIF9nYW1lOiBHYW1lID0gR2FtZS5nZXRHYW1lKClcbiAgICBwcml2YXRlIF9jb2xvck1hbmFnZXI6IENvbG9yTWFuYWdlciA9IENvbG9yTWFuYWdlci5nZXRNYW5hZ2VyKClcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoZGlmZmljdWx0eTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2RpZmZpY3VsdHkgPSBkaWZmaWN1bHR5XG4gICAgICAgIHRoaXMuX3RhcmdldFNjb3JlID0gdGhpcy5fY2FsY3VsYXRlTmV4dFRhcmdldFNjb3JlKClcbiAgICAgICAgdGhpcy5fdGltZXIuc3RhcnQoKVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R2VuZXJhdG9yKCk6IExldmVsR2VuZXJhdG9yIHtcbiAgICAgICAgaWYoIUxldmVsR2VuZXJhdG9yLl9vYmplY3Qpe1xuICAgICAgICAgICAgTGV2ZWxHZW5lcmF0b3IuX29iamVjdCA9IG5ldyBMZXZlbEdlbmVyYXRvcigxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIExldmVsR2VuZXJhdG9yLl9vYmplY3RcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRXYWxsKCk6IHZvaWQge1xuICAgICAgICBsZXQgd2FsbCA9IG5ldyBXYWxsKHRoaXMuX2NvbG9yTWFuYWdlci5jb2xvcilcbiAgICAgICAgbGV0IGFuaW1hdGlvbjogV2FsbEFuaW1hdGlvblxuXG4gICAgICAgIC8vVE9ETzogZGlmZmljdWx0eSBpbmZsdWVuY2VzIHdhbGwgc2VsZWN0aW9uXG4gICAgICAgIC8vU1RFUCAxOiBEaWZmaWN1bHR5IGNhdGVnb3J5IHNlbGVjdGlvblxuICAgICAgICAgICAgLy9TVEVQIDI6IERpcmVjdGlvbiBTZWxlY3Rpb25cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KVxuICAgICAgICBzd2l0Y2ggKG4pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgV2FsbEFuaW1hdGlvbkxlZnQod2FsbClcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gbmV3IFdhbGxBbmltYXRpb25SaWdodCh3YWxsKVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgV2FsbEFuaW1hdGlvbkxlZnQod2FsbCwgZmFsc2UpXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbiA9IG5ldyBXYWxsQW5pbWF0aW9uUmlnaHQod2FsbCwgZmFsc2UpXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgV2FsbEFuaW1hdGlvbkxlZnQod2FsbClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgd2FsbC5hbmltYXRpb24gPSBhbmltYXRpb25cbiAgICAgICAgdGhpcy5fZ2FtZS5hZGRHYW1lT2JqZWN0KHdhbGwpXG4gICAgICAgIHRoaXMuX2NvbG9yTWFuYWdlci5zdWJzY3JpYmUod2FsbClcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVOZXh0VGFyZ2V0U2NvcmUoKTogbnVtYmVyIHtcbiAgICAgICAgaWYodGhpcy5fZ2FtZS5zY29yZSA9PT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNCArIDgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0U2NvcmUgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCArIDIwKVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrRGlmZmljdWx0eVVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5fZ2FtZS5zY29yZSA+PSB0aGlzLl90YXJnZXRTY29yZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBkaWZpY3VsdHknKVxuICAgICAgICAgICAgdGhpcy5fZGlmZmljdWx0eSsrXG4gICAgICAgICAgICB0aGlzLl90YXJnZXRTY29yZSA9IHRoaXMuX2NhbGN1bGF0ZU5leHRUYXJnZXRTY29yZSgpXG4gICAgICAgICAgICB0aGlzLl9jb2xvck1hbmFnZXIuY2hhbmdlQ29sb3IoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2hlY2tEaWZmaWN1bHR5VXBkYXRlKClcblxuICAgICAgICAvL3doZW4gaXQgY29tZXMgdG8gc3BlZWQgZmxvb3JpbmcgdGhlIHRpbWUgd2lsbCBjYXVzZSBhIGxvdCBvZiB0cm91YmxlIC4uLiBcbiAgICAgICAgLy9zdGlsbCB0aGlua2luZyB3aGF0IHdvdWxkIGJlIGJldHRlclxuICAgICAgICAvL3NpbmNlIGRlbHRhIGlzIHVwZGF0ZWQgZXZlcnkgdGltZSBJIGNhbGwgZ2V0RWxhcHNlZFRpbWUgbWF5YmUgSSBzaG91bGQganVzdCBjcmVhdGUgbXkgb3duIGRlbHRhPyBcbiAgICAgICAgbGV0IHJvdW5kZWRUaW1lID0gTWF0aC5mbG9vcih0aGlzLl90aW1lci5nZXRFbGFwc2VkVGltZSgpKVxuXG4gICAgICAgIGlmIChyb3VuZGVkVGltZSAlIDMgPT0gMCAmJiByb3VuZGVkVGltZSAhPSB0aGlzLl90aW1lSGlzdG9yeSkge1xuICAgICAgICAgICAgdGhpcy5fdGltZUhpc3RvcnkgPSByb3VuZGVkVGltZVxuICAgICAgICAgICAgdGhpcy5fYWRkV2FsbCgpXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlIHtcbiAgICBwcml2YXRlIF90b3RhbDogbnVtYmVyXG5cbiAgICBwdWJsaWMgZ2V0IHRvdGFsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbFxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdG90YWwobmV3U2NvcmU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbCA9IG5ld1Njb3JlXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsID0gMFxuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdG90YWwgPSAwOyBcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgU2NyZWVuIGZyb20gJy4vU2NyZWVuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiBleHRlbmRzIFNjcmVlbiB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5hZGRCdG4oJ3Jlc3RhcnQnKVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoKSA6IHZvaWQge1xuICAgICAgICBzdXBlci5yZW1vdmUoKVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZURpc3BsYXkge1xuICAgIHByaXZhdGUgcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlciA9IDBcblxuICAgIGdldCBzY29yZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmVcbiAgICB9XG5cbiAgICBzZXQgc2NvcmUoc2NvcmU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlXG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLl9zY29yZS50b1N0cmluZygpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmJvZHkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5JylcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudClcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiB7IFxuICAgIHByb3RlY3RlZCBfZG9tRWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICBwcm90ZWN0ZWQgX2dhbWU6IEdhbWUgPSBHYW1lLmdldEdhbWUoKSBcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuX2RvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0aGlzLl9kb21FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NjcmVlbicpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZG9tRWxlbWVudClcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkQnRuKHRleHQ6IHN0cmluZykge1xuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSB0ZXh0XG4gICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnRuKVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZG9tRWxlbWVudClcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5pbXBvcnQgU2NyZWVuIGZyb20gJy4vU2NyZWVuJ1xuaW1wb3J0IEdhbWVTdGF0ZU1hbmFnZXIgZnJvbSAnLi4vR2FtZVN0YXRlcy9HYW1lU3RhdGVNYW5hZ2VyJ1xuaW1wb3J0IEdhbWVQbGF5SW5pdCBmcm9tICcuLi9HYW1lU3RhdGVzL0dhbWVQbGF5SW5pdCdcblxuLy9UT0RPOiBtb3ZlIHN0YXRlbWFuYWdlbWVudCB0byB0aGUgR2FtZUluaXQgQ2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuYWRkQnRuKCdwbGF5JylcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKCkgOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucmVtb3ZlKClcbiAgICB9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJ1xuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnLi9HYW1lT2JqZWN0cy9HYW1lT2JqZWN0J1xuaW1wb3J0IEdhbWVTdGF0ZU1hbmFnZXIgZnJvbSAnLi9HYW1lU3RhdGVzL0dhbWVTdGF0ZU1hbmFnZXInXG5pbXBvcnQgR2FtZUluaXQgZnJvbSAnLi9HYW1lU3RhdGVzL0dhbWVJbml0J1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnUGFnZSBpcyBsb2FkZWQhJyk7XG4gICAgR2FtZS5nZXRHYW1lKClcbiAgICBHYW1lU3RhdGVNYW5hZ2VyLmdldE1hbmFnZXIoKS5zdGF0ZSA9IG5ldyBHYW1lSW5pdCgpXG59KSJdLCJzb3VyY2VSb290IjoiIn0=