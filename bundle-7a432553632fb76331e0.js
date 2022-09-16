/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var constants_1 = __webpack_require__(/*! ./src/constants/constants */ "./src/constants/constants.ts");
var Settings_1 = __webpack_require__(/*! ./src/Settings/Settings */ "./src/Settings/Settings.ts");
var gameBoardUi_1 = __webpack_require__(/*! ./src/gameBoardUi/gameBoardUi */ "./src/gameBoardUi/gameBoardUi.ts");
__webpack_require__(/*! ./src/style.scss */ "./src/style.scss");
var GameBoardState_1 = __importDefault(__webpack_require__(/*! ./src/GameBoardState/GameBoardState */ "./src/GameBoardState/GameBoardState.ts"));
var localStorage_1 = __webpack_require__(/*! ./src/localStorage/localStorage */ "./src/localStorage/localStorage.ts");
var statisticInfo_1 = __webpack_require__(/*! ./src/statisticInfo/statisticInfo */ "./src/statisticInfo/statisticInfo.ts");
{
    var playingFieldDimension = document.getElementById(constants_1.PLAYING_FIELD_DIMENSION_ID);
    var winningStreakDimension = document.getElementById(constants_1.WINNING_STREAK_DIMENSION_ID);
    var buttonReloadGame = document.getElementById(constants_1.RESTART_GAME_BUTTON_ID);
    var buttonStartGame = document.getElementById(constants_1.START_GAME_BUTTON_ID);
    var buttonResetStatistics = document.getElementById(constants_1.RESET_STATISTICS_BUTTON_ID);
    var rootElement = document.getElementById(constants_1.ROOT_ID);
    var gameBoardHtmlElement_1 = document.createElement('div');
    var gameBoardStateJSON = (0, localStorage_1.getValueForLocalStorage)("gameBoardState" /* LocalStorageKeys.gameBoardStateKey */);
    var gameBoardState_1 = gameBoardStateJSON
        ? GameBoardState_1.default.fromJSON(gameBoardStateJSON)
        : new GameBoardState_1.default({ firstPlayerWalks: "x" /* PLAYER.X */, size: 3, winningStreak: 3 });
    var winnerInformation = gameBoardState_1.winnerInformation, firstPlayerWalks = gameBoardState_1.firstPlayerWalks;
    var statistics = winnerInformation.statistics;
    var countWin_x = statistics.countWin_x, countWin_o = statistics.countWin_o, countDraw = statistics.countDraw;
    (0, statisticInfo_1.updateStatisticInformation)(String(countWin_x), String(countWin_o), String(countDraw));
    (0, Settings_1.choiceRadioButtonFromFirstPlayerWalks)(firstPlayerWalks);
    if (playingFieldDimension && winningStreakDimension) {
        (0, Settings_1.initializeSettingsFormFromLocalStorage)(playingFieldDimension, winningStreakDimension, gameBoardState_1);
    }
    else {
        console.error('playingFieldDimension of winningStreakDimension is not defined!');
    }
    if (playingFieldDimension && winningStreakDimension) {
        (0, Settings_1.addListenerForChangeMaxWinStreak)(playingFieldDimension, winningStreakDimension);
    }
    else {
        console.error('playingFieldDimension or winningStreakDimension is not defined!');
    }
    if (buttonStartGame) {
        (0, Settings_1.addListenerForButtonStartGame)(buttonStartGame, gameBoardHtmlElement_1, gameBoardState_1);
    }
    else {
        console.error('buttonStartGame is not defined!');
    }
    (0, gameBoardUi_1.fillGameBoardHtmlElement)(gameBoardHtmlElement_1, gameBoardState_1);
    gameBoardHtmlElement_1.addEventListener('click', function (event) {
        gameBoardUi_1.onClickGameBoard.call(this, event, gameBoardState_1);
    });
    gameBoardState_1.subscribeToEndGame(function (winnerInformation) { return (0, gameBoardUi_1.handleEndGame)(gameBoardHtmlElement_1, winnerInformation); });
    buttonReloadGame === null || buttonReloadGame === void 0 ? void 0 : buttonReloadGame.addEventListener('click', function () { return (0, gameBoardUi_1.handleReloadGame)(gameBoardHtmlElement_1, gameBoardState_1); });
    buttonResetStatistics === null || buttonResetStatistics === void 0 ? void 0 : buttonResetStatistics.addEventListener('click', function () { return (0, statisticInfo_1.handleResetStatistics)(gameBoardState_1); });
    if (rootElement) {
        rootElement.appendChild(gameBoardHtmlElement_1);
    }
    else {
        console.error('rootElement is not defined!');
    }
}


/***/ }),

/***/ "./src/GameBoardState/GameBoardState.ts":
/*!**********************************************!*\
  !*** ./src/GameBoardState/GameBoardState.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var gameBoardState_utils_1 = __webpack_require__(/*! ./gameBoardState_utils */ "./src/GameBoardState/gameBoardState_utils.ts");
var GameBoardState = /** @class */ (function () {
    function GameBoardState(options) {
        if (options === void 0) { options = {}; }
        this._playerWalks = "x" /* PLAYER.X */;
        this._firstPlayerWalks = "x" /* PLAYER.X */;
        this._handleEndGame = function (winnerInformation) { console.error('Method handleEndGame is not defined!', winnerInformation); };
        var board = options.board, playerWalks = options.playerWalks, _a = options.winnerInformation, winnerInformation = _a === void 0 ? {
            winner: 0 /* WINNER._UNKNOWN_ */,
            winnerDirectionLine: 0 /* ORIENTATION._UNKNOWN_ */,
            winningLine: [],
            statistics: {
                countDraw: 0,
                countWin_o: 0,
                countWin_x: 0,
            }
        } : _a, _b = options.size, size = _b === void 0 ? 3 : _b, winningStreak = options.winningStreak, _c = options.firstPlayerWalks, firstPlayerWalks = _c === void 0 ? "x" /* PLAYER.X */ : _c;
        if (board && playerWalks) {
            var isValidBoard = (0, gameBoardState_utils_1._checkIsValidBoardFormat)(board);
            if (!isValidBoard) {
                throw new TypeError("Board is not valid! {board: ".concat(board, "}"));
            }
            this._board = board;
            this._playerWalks = playerWalks;
        }
        else {
            this._board = (0, gameBoardState_utils_1._getDefaultBordValues)(size);
            this._playerWalks = firstPlayerWalks;
        }
        this._winningStreak = winningStreak && winningStreak <= this.size ? winningStreak : this.size;
        this._firstPlayerWalks = firstPlayerWalks;
        this._winnerInformation = winnerInformation;
    }
    GameBoardState.prototype.subscribeToEndGame = function (collback) {
        this._handleEndGame = collback;
    };
    Object.defineProperty(GameBoardState.prototype, "board", {
        get: function () {
            return this._board.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "countSteps", {
        get: function () {
            return this._board.flat().filter(function (cell) { return cell !== "" /* PLAYER._VOID_ */; }).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "playerWalks", {
        get: function () {
            return this._playerWalks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "winningStreak", {
        get: function () {
            return this._winningStreak;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "winnerInformation", {
        get: function () {
            var winningLine = this._winnerInformation.winningLine;
            return __assign(__assign({}, this._winnerInformation), { winningLine: winningLine ? __spreadArray([], winningLine, true) : [] });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "firstPlayerWalks", {
        get: function () {
            return this._firstPlayerWalks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "size", {
        get: function () {
            return this._board.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBoardState.prototype, "numberOfMoves", {
        get: function () {
            return this._board.length * this._board.length;
        },
        enumerable: false,
        configurable: true
    });
    GameBoardState.prototype.addMark = function (coordinate) {
        var _a = this, playerWalks = _a._playerWalks, board = _a._board, winnerInformation = _a._winnerInformation;
        var winner = winnerInformation.winner;
        var isValidCoordinate = (0, gameBoardState_utils_1._checkIsValidCoordinate)(coordinate, board.length);
        if (!isValidCoordinate) {
            var errorText = 'Coordinate not valid!';
            throw new Error(errorText);
        }
        var _b = (0, gameBoardState_utils_1._normalizeCoordinate)(coordinate), x = _b.x, y = _b.y;
        if (winner === 3 /* WINNER.DRAW */ || winner === 2 /* WINNER.PLAYER_O */ || winner === 1 /* WINNER.PLAYER_X */) {
            var errorText = 'They made a move, but the game is over and there is a winner!';
            throw new Error(errorText);
        }
        var isNotAlreadyMarkedCell = (0, gameBoardState_utils_1._checkIsNotAlreadyMarkedCell)(this._board[y][x]);
        if (isNotAlreadyMarkedCell) {
            // todo: здесь костыль, какой-то не понятный баг с сетом значения в клеточку
            var selectRow = __spreadArray([], board[y], true);
            selectRow[x] = playerWalks;
            board[y] = selectRow;
            var isVictory = this._checkForVictory({ x: x, y: y });
            var isCanMovie = (0, gameBoardState_utils_1._checkIsCanMovie)(this.countSteps, board.length * board.length);
            if (isVictory) {
                this._handleEndGame(this.winnerInformation);
                return;
            }
            if (!isCanMovie) {
                winnerInformation.winner = 3 /* WINNER.DRAW */;
                this.winnerInformation.statistics.countDraw++;
                this._handleEndGame(this.winnerInformation);
                return;
            }
            this._playerWalks = (0, gameBoardState_utils_1._togglePlayer)(playerWalks);
            return {
                playerWalks: playerWalks,
            };
        }
        else {
            var errorText = 'Error! Already marked cell!!';
            throw new Error(errorText);
        }
    };
    GameBoardState.prototype._checkForVictory = function (coordinate) {
        var _a = this, winningStreak = _a._winningStreak, playerWalks = _a._playerWalks, board = _a._board, winnerInformation = _a._winnerInformation;
        var arrayOfCoordinatesMarksInLine;
        arrayOfCoordinatesMarksInLine = (0, gameBoardState_utils_1._getArrayOfCoordinatesMarksInLine)(coordinate, 1 /* ORIENTATION.VERTICAL */, board, playerWalks);
        if (arrayOfCoordinatesMarksInLine.length >= winningStreak) {
            this._fillWinnerInformation(arrayOfCoordinatesMarksInLine, 1 /* ORIENTATION.VERTICAL */);
            return true;
        }
        arrayOfCoordinatesMarksInLine = (0, gameBoardState_utils_1._getArrayOfCoordinatesMarksInLine)(coordinate, 2 /* ORIENTATION.HORIZONTAL */, board, playerWalks);
        if (arrayOfCoordinatesMarksInLine.length >= winningStreak) {
            this._fillWinnerInformation(arrayOfCoordinatesMarksInLine, 2 /* ORIENTATION.HORIZONTAL */);
            return true;
        }
        arrayOfCoordinatesMarksInLine = (0, gameBoardState_utils_1._getArrayOfCoordinatesMarksInLine)(coordinate, 3 /* ORIENTATION.DIAGONAL_RIGHT */, board, playerWalks);
        if (arrayOfCoordinatesMarksInLine.length >= winningStreak) {
            this._fillWinnerInformation(arrayOfCoordinatesMarksInLine, 3 /* ORIENTATION.DIAGONAL_RIGHT */);
            return true;
        }
        arrayOfCoordinatesMarksInLine = (0, gameBoardState_utils_1._getArrayOfCoordinatesMarksInLine)(coordinate, 4 /* ORIENTATION.DIAGONAL_LEFT */, board, playerWalks);
        if (arrayOfCoordinatesMarksInLine.length >= winningStreak) {
            this._fillWinnerInformation(arrayOfCoordinatesMarksInLine, 4 /* ORIENTATION.DIAGONAL_LEFT */);
            return true;
        }
        return false;
    };
    GameBoardState.prototype._fillWinnerInformation = function (arrayOfCoordinatesMarksInLine, orientation) {
        var _a = this, playerWalks = _a.playerWalks, winnerInformation = _a._winnerInformation;
        winnerInformation.winner = (0, gameBoardState_utils_1._playerToWinner)(playerWalks);
        winnerInformation.winnerDirectionLine = orientation;
        winnerInformation.winningLine = arrayOfCoordinatesMarksInLine;
        if (playerWalks === "x" /* PLAYER.X */) {
            winnerInformation.statistics.countWin_x++;
        }
        else if (playerWalks === "o" /* PLAYER.O */) {
            winnerInformation.statistics.countWin_o++;
        }
    };
    GameBoardState.prototype.restartGame = function () {
        this._playerWalks = this._firstPlayerWalks;
        this._board = (0, gameBoardState_utils_1._getDefaultBordValues)(this.size);
        this._winnerInformation = __assign(__assign({}, this.winnerInformation), { winner: 0 /* WINNER._UNKNOWN_ */, winnerDirectionLine: 0 /* ORIENTATION._UNKNOWN_ */, winningLine: [] });
    };
    GameBoardState.prototype.start = function (options) {
        if (options === void 0) { options = {}; }
        var board = options.board, playerWalks = options.playerWalks, _a = options.winnerInformation, winnerInformation = _a === void 0 ? {
            winner: 0 /* WINNER._UNKNOWN_ */,
            winnerDirectionLine: 0 /* ORIENTATION._UNKNOWN_ */,
            winningLine: [],
        } : _a, _b = options.size, size = _b === void 0 ? 3 : _b, winningStreak = options.winningStreak, _c = options.firstPlayerWalks, firstPlayerWalks = _c === void 0 ? "x" /* PLAYER.X */ : _c;
        if (board && playerWalks) {
            var isValidBoard = (0, gameBoardState_utils_1._checkIsValidBoardFormat)(board);
            if (!isValidBoard) {
                throw new TypeError("Board is not valid! {board: ".concat(board, "}"));
            }
            this._board = board;
            this._playerWalks = playerWalks;
        }
        else {
            this._board = (0, gameBoardState_utils_1._getDefaultBordValues)(size);
            this._playerWalks = firstPlayerWalks;
        }
        this._winningStreak = winningStreak && winningStreak <= this.size ? winningStreak : this.size;
        this._firstPlayerWalks = firstPlayerWalks;
        this._winnerInformation = __assign(__assign({}, this._winnerInformation), winnerInformation);
    };
    GameBoardState.prototype.resetStatistics = function () {
        this._winnerInformation.statistics.countWin_o = 0;
        this._winnerInformation.statistics.countWin_x = 0;
        this._winnerInformation.statistics.countDraw = 0;
    };
    GameBoardState.prototype.toJSON = function () {
        var _a = this, board = _a.board, playerWalks = _a.playerWalks, winnerInformation = _a.winnerInformation, winningStreak = _a.winningStreak, firstPlayerWalks = _a.firstPlayerWalks;
        return JSON.stringify({
            board: board,
            playerWalks: playerWalks,
            winnerInformation: winnerInformation,
            winningStreak: winningStreak,
            firstPlayerWalks: firstPlayerWalks,
        });
    };
    GameBoardState.fromJSON = function (gameBoardStateJSON) {
        var gameBoardStateFields = JSON.parse(gameBoardStateJSON);
        return new GameBoardState(gameBoardStateFields);
    };
    return GameBoardState;
}());
exports["default"] = GameBoardState;


/***/ }),

/***/ "./src/GameBoardState/gameBoardState_utils.ts":
/*!****************************************************!*\
  !*** ./src/GameBoardState/gameBoardState_utils.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._sortArrayOfCoordinatesMarksForOrientationLine = exports._checkIsNotAlreadyMarkedCell = exports._checkIsValidMark = exports._checkIsValidBoardFormat = exports._checkIsCanMovie = exports._checkIsValidCoordinate = exports._getArrayOfCoordinatesMarksInLine = exports._playerToWinner = exports._normalizeCoordinate = exports._togglePlayer = exports._getDefaultBordValues = void 0;
function _getDefaultBordValues(size) {
    return new Array(size).fill(Array(size).fill("" /* PLAYER._VOID_ */));
}
exports._getDefaultBordValues = _getDefaultBordValues;
function _togglePlayer(playerWalks) {
    switch (playerWalks) {
        case "x" /* PLAYER.X */: {
            return "o" /* PLAYER.O */;
        }
        case "o" /* PLAYER.O */: {
            return "x" /* PLAYER.X */;
        }
        default: {
            throw new Error('Unknown player mark!');
        }
    }
}
exports._togglePlayer = _togglePlayer;
function _normalizeCoordinate(coordinate) {
    return { x: coordinate.x - 1, y: coordinate.y - 1 };
}
exports._normalizeCoordinate = _normalizeCoordinate;
function _playerToWinner(playerWalks) {
    if (playerWalks === "x" /* PLAYER.X */) {
        return 1 /* WINNER.PLAYER_X */;
    }
    if (playerWalks === "o" /* PLAYER.O */) {
        return 2 /* WINNER.PLAYER_O */;
    }
    throw new Error('Player not defined!');
}
exports._playerToWinner = _playerToWinner;
function _getArrayOfCoordinatesMarksInLine(coordinate, orientation, board, playerWalks) {
    var arrayOfCoordinatesMarksInLine = [];
    function _getArrayOfCoordinatesMarksInDirection(coordinate, direction, board, playerWalks) {
        var x = coordinate.x, y = coordinate.y;
        var arrayOfCoordinatesMarksInDirection = [];
        switch (direction) {
            case 1 /* DIRECTION.UP */: {
                for (var currentY = y - 1; currentY >= 0; currentY--) {
                    var currentCell = board[currentY][x];
                    var currentCoordinates = { x: x, y: currentY };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 2 /* DIRECTION.DOWN */: {
                for (var currentY = y + 1; currentY < board.length; currentY++) {
                    var currentCell = board[currentY][x];
                    var currentCoordinates = { x: x, y: currentY };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 4 /* DIRECTION.LEFT */: {
                for (var currentX = x - 1; currentX >= 0; currentX--) {
                    var currentCell = board[y][currentX];
                    var currentCoordinates = { x: currentX, y: y };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 3 /* DIRECTION.RIGHT */: {
                for (var currentX = x + 1; currentX < board.length; currentX++) {
                    var currentCell = board[y][currentX];
                    var currentCoordinates = { x: currentX, y: y };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 5 /* DIRECTION.UP_RIGHT */: {
                for (var currentX = x + 1, currentY = y - 1; currentY >= 0 && currentX < board.length;) {
                    var currentCell = board[currentY][currentX];
                    var currentCoordinates = { x: currentX, y: currentY };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                    currentX++;
                    currentY--;
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 6 /* DIRECTION.DOWN_RIGHT */: {
                for (var currentX = x + 1, currentY = y + 1; currentY < board.length && currentX < board.length;) {
                    var currentCell = board[currentY][currentX];
                    var currentCoordinates = { x: currentX, y: currentY };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                    currentX++;
                    currentY++;
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 7 /* DIRECTION.UP_LEFT */: {
                for (var currentX = x - 1, currentY = y - 1; currentY >= 0 && currentX >= 0;) {
                    var currentCell = board[currentY][currentX];
                    var currentCoordinates = { x: currentX, y: currentY };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                    currentX--;
                    currentY--;
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            case 8 /* DIRECTION.DOWN_LEFT */: {
                for (var currentX = x - 1, currentY = y + 1; currentY < board.length && currentX >= 0;) {
                    var currentCell = board[currentY][currentX];
                    var currentCoordinates = { x: currentX, y: currentY };
                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                    currentX--;
                    currentY++;
                }
                return arrayOfCoordinatesMarksInDirection;
            }
            default: {
                throw new Error('Direction is no found!');
            }
        }
    }
    switch (orientation) {
        case 1 /* ORIENTATION.VERTICAL */: {
            var arrayOfCoordinatesMarksInDirection_up = _getArrayOfCoordinatesMarksInDirection(coordinate, 1 /* DIRECTION.UP */, board, playerWalks);
            var arrayOfCoordinatesMarksInDirection_down = _getArrayOfCoordinatesMarksInDirection(coordinate, 2 /* DIRECTION.DOWN */, board, playerWalks);
            arrayOfCoordinatesMarksInLine = __spreadArray(__spreadArray([
                coordinate
            ], arrayOfCoordinatesMarksInDirection_up, true), arrayOfCoordinatesMarksInDirection_down, true);
            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinatesMarksInLine, 1 /* ORIENTATION.VERTICAL */);
            break;
        }
        case 2 /* ORIENTATION.HORIZONTAL */: {
            var arrayOfCoordinatesMarksInDirection_right = _getArrayOfCoordinatesMarksInDirection(coordinate, 3 /* DIRECTION.RIGHT */, board, playerWalks);
            var arrayOfCoordinatesMarksInDirection_left = _getArrayOfCoordinatesMarksInDirection(coordinate, 4 /* DIRECTION.LEFT */, board, playerWalks);
            arrayOfCoordinatesMarksInLine = __spreadArray(__spreadArray([
                coordinate
            ], arrayOfCoordinatesMarksInDirection_right, true), arrayOfCoordinatesMarksInDirection_left, true);
            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinatesMarksInLine, 2 /* ORIENTATION.HORIZONTAL */);
            break;
        }
        case 3 /* ORIENTATION.DIAGONAL_RIGHT */: {
            var arrayOfCoordinatesMarksInDirection_upRight = _getArrayOfCoordinatesMarksInDirection(coordinate, 5 /* DIRECTION.UP_RIGHT */, board, playerWalks);
            var arrayOfCoordinatesMarksInDirection_downLeft = _getArrayOfCoordinatesMarksInDirection(coordinate, 8 /* DIRECTION.DOWN_LEFT */, board, playerWalks);
            arrayOfCoordinatesMarksInLine = __spreadArray(__spreadArray([
                coordinate
            ], arrayOfCoordinatesMarksInDirection_upRight, true), arrayOfCoordinatesMarksInDirection_downLeft, true);
            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinatesMarksInLine, 3 /* ORIENTATION.DIAGONAL_RIGHT */);
            break;
        }
        case 4 /* ORIENTATION.DIAGONAL_LEFT */: {
            var arrayOfCoordinatesMarksInDirection_upLeft = _getArrayOfCoordinatesMarksInDirection(coordinate, 7 /* DIRECTION.UP_LEFT */, board, playerWalks);
            var arrayOfCoordinatesMarksInDirection_downRight = _getArrayOfCoordinatesMarksInDirection(coordinate, 6 /* DIRECTION.DOWN_RIGHT */, board, playerWalks);
            arrayOfCoordinatesMarksInLine = __spreadArray(__spreadArray([
                coordinate
            ], arrayOfCoordinatesMarksInDirection_upLeft, true), arrayOfCoordinatesMarksInDirection_downRight, true);
            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinatesMarksInLine, 4 /* ORIENTATION.DIAGONAL_LEFT */);
            break;
        }
        default: {
            throw new Error('ORIENTATION is not found!');
        }
    }
    return arrayOfCoordinatesMarksInLine;
}
exports._getArrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine;
function _checkIsValidCoordinate(coordinate, sizeBoard) {
    var x = coordinate.x, y = coordinate.y;
    return y > 0 && x > 0 && y <= sizeBoard && x <= sizeBoard;
}
exports._checkIsValidCoordinate = _checkIsValidCoordinate;
function _checkIsCanMovie(countSteps, sizeBoard) {
    return countSteps < sizeBoard;
}
exports._checkIsCanMovie = _checkIsCanMovie;
function _checkIsValidBoardFormat(gameBoard) {
    for (var _i = 0, gameBoard_1 = gameBoard; _i < gameBoard_1.length; _i++) {
        var currentRow = gameBoard_1[_i];
        if (currentRow.length !== gameBoard.length) {
            return false;
        }
        for (var _a = 0, currentRow_1 = currentRow; _a < currentRow_1.length; _a++) {
            var markCurrentCell = currentRow_1[_a];
            var isValidMark = _checkIsValidMark(markCurrentCell);
            if (!isValidMark) {
                return false;
            }
        }
    }
    return true;
}
exports._checkIsValidBoardFormat = _checkIsValidBoardFormat;
function _checkIsValidMark(mark) {
    return mark === "x" /* PLAYER.X */ || mark === "o" /* PLAYER.O */ || mark === "" /* PLAYER._VOID_ */;
}
exports._checkIsValidMark = _checkIsValidMark;
function _checkIsNotAlreadyMarkedCell(markCell) {
    return markCell === "" /* PLAYER._VOID_ */;
}
exports._checkIsNotAlreadyMarkedCell = _checkIsNotAlreadyMarkedCell;
function _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinates, orientationLine) {
    if (orientationLine === 2 /* ORIENTATION.HORIZONTAL */) {
        return arrayOfCoordinates.sort(function (prevCoordinate, nextCoordinate) { return prevCoordinate.x - nextCoordinate.x; });
    }
    return arrayOfCoordinates.sort(function (prevCoordinate, nextCoordinate) { return prevCoordinate.y - nextCoordinate.y; });
}
exports._sortArrayOfCoordinatesMarksForOrientationLine = _sortArrayOfCoordinatesMarksForOrientationLine;


/***/ }),

/***/ "./src/Settings/Settings.ts":
/*!**********************************!*\
  !*** ./src/Settings/Settings.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.choiceRadioButtonFromFirstPlayerWalks = exports.addListenerForButtonStartGame = exports.initializeSettingsFormFromLocalStorage = exports.addListenerForChangeMaxWinStreak = void 0;
var constants_1 = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");
var gameBoardUi_1 = __webpack_require__(/*! ../gameBoardUi/gameBoardUi */ "./src/gameBoardUi/gameBoardUi.ts");
function addListenerForChangeMaxWinStreak(playingFieldDimension, winningStreakDimension) {
    playingFieldDimension.addEventListener('change', function (event) {
        var playingFieldDimensionValue = event.target.value;
        var winningStreakDimensionValue = winningStreakDimension.value;
        winningStreakDimension.setAttribute('max', playingFieldDimensionValue);
        if (Number(playingFieldDimensionValue) < Number(winningStreakDimensionValue)) {
            winningStreakDimension.value = playingFieldDimensionValue;
        }
    });
}
exports.addListenerForChangeMaxWinStreak = addListenerForChangeMaxWinStreak;
function initializeSettingsFormFromLocalStorage(playingFieldDimension, winningStreakDimension, gameBoardState) {
    var playingFieldDimensionValue = gameBoardState.size, winningStreakDimensionValue = gameBoardState.winningStreak;
    playingFieldDimension.setAttribute('value', String(playingFieldDimensionValue));
    winningStreakDimension.setAttribute('value', String(winningStreakDimensionValue));
    winningStreakDimension.setAttribute('max', String(playingFieldDimensionValue));
}
exports.initializeSettingsFormFromLocalStorage = initializeSettingsFormFromLocalStorage;
function addListenerForButtonStartGame(buttonStartGame, gameBoardHtmlElement, gameBoardState) {
    buttonStartGame.addEventListener('click', function (event) {
        var playingFieldDimension = document.getElementById(constants_1.PLAYING_FIELD_DIMENSION_ID);
        var winningStreakDimension = document.getElementById(constants_1.WINNING_STREAK_DIMENSION_ID);
        var firstPlayerWalksRadioButton = document.querySelector("input[name=".concat(constants_1.FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME, "]:checked"));
        if (!playingFieldDimension || !winningStreakDimension || !firstPlayerWalksRadioButton) {
            throw new Error('playingFieldDimension || winningStreakDimension || firstPlayerWalksRadioButton is not defined');
        }
        var size = Number(playingFieldDimension.value);
        var winningStreak = Number(winningStreakDimension.value);
        var firstPlayerWalks = firstPlayerWalksRadioButton.value;
        if (firstPlayerWalks !== "x" /* PLAYER.X */ && firstPlayerWalks !== "o" /* PLAYER.O */) {
            throw new Error("No valid firstPlayerWalks value!");
        }
        gameBoardState.start({
            size: size,
            winningStreak: winningStreak,
            firstPlayerWalks: firstPlayerWalks,
        });
        (0, gameBoardUi_1.handleStartGame)(gameBoardHtmlElement, gameBoardState);
    });
}
exports.addListenerForButtonStartGame = addListenerForButtonStartGame;
function choiceRadioButtonFromFirstPlayerWalks(player) {
    var radioButtons = document.querySelectorAll("input[name=".concat(constants_1.FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME, "]"));
    for (var _i = 0, radioButtons_1 = radioButtons; _i < radioButtons_1.length; _i++) {
        var radioButton = radioButtons_1[_i];
        radioButton.checked = radioButton.value === player;
    }
}
exports.choiceRadioButtonFromFirstPlayerWalks = choiceRadioButtonFromFirstPlayerWalks;


/***/ }),

/***/ "./src/constants/constants.ts":
/*!************************************!*\
  !*** ./src/constants/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STATISTICS_COUNT_VALUE_DRAW = exports.STATISTICS_COUNT_VALUE_WIN_X = exports.STATISTICS_COUNT_VALUE_WIN_O = exports.RESET_STATISTICS_BUTTON_ID = exports.START_GAME_BUTTON_ID = exports.RESTART_GAME_BUTTON_ID = exports.GAME_BOARD_HTML_ELEMENT_ID = exports.FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME = exports.WINNING_STREAK_DIMENSION_ID = exports.PLAYING_FIELD_DIMENSION_ID = exports.ROOT_ID = void 0;
exports.ROOT_ID = '__ROOT_ID__';
exports.PLAYING_FIELD_DIMENSION_ID = '__PLAYING_FIELD_DIMENSION_ID__';
exports.WINNING_STREAK_DIMENSION_ID = '__WINNING_STREAK_DIMENSION_ID__';
exports.FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME = 'firstPlayerWalks';
exports.GAME_BOARD_HTML_ELEMENT_ID = '__GAME_BOARD_ID__';
exports.RESTART_GAME_BUTTON_ID = '__RESTART_GAME_BUTTON_ID__';
exports.START_GAME_BUTTON_ID = '__START_GAME_BUTTON_ID__';
exports.RESET_STATISTICS_BUTTON_ID = '__RESET_STATISTICS_BUTTON_ID__';
exports.STATISTICS_COUNT_VALUE_WIN_O = 'STATISTICS-COUNT-VALUE_WIN-O';
exports.STATISTICS_COUNT_VALUE_WIN_X = 'STATISTICS-COUNT-VALUE_WIN-X';
exports.STATISTICS_COUNT_VALUE_DRAW = 'STATISTICS-COUNT-VALUE_WIN-DRAW';


/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HIDDEN = exports.DISABLE = exports.PLAYER_MARK = exports.CELL_MARK = exports.CELL = exports.MARK_O = exports.MARK_X = exports.CELL_VICTORY_LINE_DIAGONAL_LEFT = exports.CELL_VICTORY_LINE_DIAGONAL_RIGHT = exports.CELL_VICTORY_LINE_DIRECTION_HORIZONTAL = exports.CELL_VICTORY_LINE_DIRECTION_VERTICAL = exports.CELL_VICTORY_LINE = exports.CELL_MARK_O = exports.CELL_MARK_X = exports.DRAW = exports.WINNER_GAMER_O = exports.WINNER_GAMER_X = exports.MOVE_GAMER_O = exports.MOVE_GAMER_X = void 0;
/* -------------------------------------------------------- */
// constants for styles
// container
exports.MOVE_GAMER_X = 'move_gamer_X';
exports.MOVE_GAMER_O = 'move_gamer_O';
exports.WINNER_GAMER_X = 'winner_gamer_X';
exports.WINNER_GAMER_O = 'winner_gamer_O';
exports.DRAW = 'draw';
// cell
exports.CELL_MARK_X = 'cell-mark-x';
exports.CELL_MARK_O = 'cell-mark-o';
exports.CELL_VICTORY_LINE = 'cell-victory-line';
exports.CELL_VICTORY_LINE_DIRECTION_VERTICAL = 'direction-vertical';
exports.CELL_VICTORY_LINE_DIRECTION_HORIZONTAL = 'direction-horizontal';
exports.CELL_VICTORY_LINE_DIAGONAL_RIGHT = 'direction-diagonal-right';
exports.CELL_VICTORY_LINE_DIAGONAL_LEFT = 'direction-diagonal-left';
// marks
exports.MARK_X = 'mark-x';
exports.MARK_O = 'mark-o';
/* -------------------------------------------------------- */
// constants for JS code
// cell
exports.CELL = 'cell';
exports.CELL_MARK = 'cell-mark';
// marks
exports.PLAYER_MARK = 'player-mark';
/* -------------------------------------------------------- */
// other
exports.DISABLE = 'disable';
exports.HIDDEN = 'hidden';


/***/ }),

/***/ "./src/gameBoardUi/gameBoardUi.ts":
/*!****************************************!*\
  !*** ./src/gameBoardUi/gameBoardUi.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleStartGame = exports.handleReloadGame = exports.getGameBoardCellsArray = exports.crossOutWinningLine = exports.handleEndGame = exports.onClickGameBoard = exports.checkWhoseMarkHtmlElement = exports.checkCellHtmlElementHasMark = exports.getCoordinateForClickedCell = exports.getClickedCell = exports.setWinnerForGameBoard = exports.togglePlayerWalksForGameBoard = exports.markCell = exports.fillGameBoardHtmlElement = exports.createCellsArray = exports.createCell = exports.createCellHtmlElement = exports.createMarkHtmlElement = void 0;
var consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
var constants_1 = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");
var GameBoardState_1 = __importDefault(__webpack_require__(/*! ../GameBoardState/GameBoardState */ "./src/GameBoardState/GameBoardState.ts"));
var localStorage_1 = __webpack_require__(/*! ../localStorage/localStorage */ "./src/localStorage/localStorage.ts");
var statisticInfo_1 = __webpack_require__(/*! ../statisticInfo/statisticInfo */ "./src/statisticInfo/statisticInfo.ts");
function createMarkHtmlElement(mark, hiddenMark) {
    if (hiddenMark === void 0) { hiddenMark = true; }
    var markHtmlElement = document.createElement('span');
    markHtmlElement.setAttribute('class', "gameBoard__mark gameBoardMark");
    switch (mark) {
        case "x" /* PLAYER.X */: {
            markHtmlElement.setAttribute(consts_1.PLAYER_MARK, String("x" /* PLAYER.X */));
            markHtmlElement.classList.add(consts_1.MARK_X);
            markHtmlElement.innerText = "x" /* PLAYER.X */;
            break;
        }
        case "o" /* PLAYER.O */: {
            markHtmlElement.setAttribute(consts_1.PLAYER_MARK, String("o" /* PLAYER.O */));
            markHtmlElement.classList.add(consts_1.MARK_O);
            markHtmlElement.innerText = "o" /* PLAYER.O */;
            break;
        }
        default: {
            markHtmlElement.classList.remove(consts_1.CELL_MARK);
        }
    }
    if (hiddenMark) {
        markHtmlElement.classList.add(consts_1.HIDDEN);
    }
    return markHtmlElement;
}
exports.createMarkHtmlElement = createMarkHtmlElement;
function createCellHtmlElement(coordinate, mark) {
    var x = coordinate.x, y = coordinate.y;
    var gameCell = document.createElement('div');
    gameCell.setAttribute('class', "gameBoard__cell gameBoardCell");
    gameCell.setAttribute("x" /* COORDINATE.X */, String(x));
    gameCell.setAttribute("y" /* COORDINATE.Y */, String(y));
    gameCell.setAttribute(consts_1.CELL, consts_1.CELL);
    if (mark === "x" /* PLAYER.X */ || mark === "o" /* PLAYER.O */) {
        _markCellHtmlElement(gameCell, mark);
    }
    return gameCell;
}
exports.createCellHtmlElement = createCellHtmlElement;
function createCell(coordinate, mark) {
    var cellHtmlElement = createCellHtmlElement(coordinate, mark);
    if (mark === "x" /* PLAYER.X */ || mark === "o" /* PLAYER.O */) {
        var markHtmlElement = createMarkHtmlElement(mark, false);
        cellHtmlElement.appendChild(markHtmlElement);
        return cellHtmlElement;
    }
    var markHtmlElement_X = createMarkHtmlElement("x" /* PLAYER.X */, true);
    var markHtmlElement_O = createMarkHtmlElement("o" /* PLAYER.O */, true);
    cellHtmlElement.appendChild(markHtmlElement_X);
    cellHtmlElement.appendChild(markHtmlElement_O);
    return cellHtmlElement;
}
exports.createCell = createCell;
function createCellsArray(board) {
    var gameBoardTable = [];
    for (var y = 1; y <= board.length; y++) {
        var gameBoardRow = [];
        for (var x = 1; x <= board.length; x++) {
            var gameCell = void 0;
            var currentValueForCellGameBoardState = board[y - 1][x - 1];
            gameCell = createCell({ x: x, y: y }, currentValueForCellGameBoardState);
            gameBoardRow.push(gameCell);
        }
        gameBoardTable.push(gameBoardRow);
    }
    return gameBoardTable;
}
exports.createCellsArray = createCellsArray;
function fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState) {
    var winnerInformation = gameBoardState.winnerInformation, board = gameBoardState.board, playerWalks = gameBoardState.playerWalks;
    var winner = winnerInformation.winner, winnerDirectionLine = winnerInformation.winnerDirectionLine, winningLine = winnerInformation.winningLine;
    var isEndGame = winner === 1 /* WINNER.PLAYER_X */ || winner === 2 /* WINNER.PLAYER_O */ || winner === 3 /* WINNER.DRAW */;
    var isWinGame = winner === 1 /* WINNER.PLAYER_X */ || winner === 2 /* WINNER.PLAYER_O */;
    if (gameBoardHtmlElement) {
        _resetGameBoardHtmlElement(gameBoardHtmlElement);
    }
    var gameBoardCellsArray = createCellsArray(board);
    gameBoardHtmlElement.setAttribute('id', constants_1.GAME_BOARD_HTML_ELEMENT_ID);
    gameBoardHtmlElement.setAttribute('class', "gameBoard");
    if (isEndGame) {
        setWinnerForGameBoard(gameBoardHtmlElement, winner);
    }
    else {
        togglePlayerWalksForGameBoard(gameBoardHtmlElement, playerWalks);
    }
    for (var _i = 0, gameBoardCellsArray_1 = gameBoardCellsArray; _i < gameBoardCellsArray_1.length; _i++) {
        var currentRow = gameBoardCellsArray_1[_i];
        var gameBoardRow = document.createElement('div');
        gameBoardRow.setAttribute('class', 'gameBoard__row');
        for (var _a = 0, currentRow_1 = currentRow; _a < currentRow_1.length; _a++) {
            var currentCell = currentRow_1[_a];
            gameBoardRow.appendChild(currentCell);
        }
        gameBoardHtmlElement.appendChild(gameBoardRow);
    }
    if (isWinGame && winningLine && winnerDirectionLine) {
        crossOutWinningLine(gameBoardHtmlElement, winningLine, winnerDirectionLine);
    }
}
exports.fillGameBoardHtmlElement = fillGameBoardHtmlElement;
function markCell(cell, player) {
    var cellMarks = __spreadArray([], cell === null || cell === void 0 ? void 0 : cell.children, true);
    if (checkCellHtmlElementHasMark(cell)) {
        throw new Error('Cell is marked!');
    }
    for (var _i = 0, cellMarks_1 = cellMarks; _i < cellMarks_1.length; _i++) {
        var currentMarkHtmlElement = cellMarks_1[_i];
        var isMark_X = checkWhoseMarkHtmlElement(currentMarkHtmlElement, "x" /* PLAYER.X */);
        var isMark_O = checkWhoseMarkHtmlElement(currentMarkHtmlElement, "o" /* PLAYER.O */);
        switch (player) {
            case "x" /* PLAYER.X */: {
                if (isMark_X) {
                    currentMarkHtmlElement.classList.remove(consts_1.HIDDEN);
                }
                else if (isMark_O) {
                    cell.removeChild(currentMarkHtmlElement);
                }
                break;
            }
            case "o" /* PLAYER.O */: {
                if (isMark_X) {
                    cell.removeChild(currentMarkHtmlElement);
                }
                else if (isMark_O) {
                    currentMarkHtmlElement.classList.remove(consts_1.HIDDEN);
                }
                break;
            }
        }
    }
    _markCellHtmlElement(cell, player);
}
exports.markCell = markCell;
function togglePlayerWalksForGameBoard(gameBoard, playerWalks) {
    switch (playerWalks) {
        case "x" /* PLAYER.X */: {
            gameBoard.classList.add(consts_1.MOVE_GAMER_X);
            gameBoard.classList.remove(consts_1.MOVE_GAMER_O);
            break;
        }
        case "o" /* PLAYER.O */: {
            gameBoard.classList.add(consts_1.MOVE_GAMER_O);
            gameBoard.classList.remove(consts_1.MOVE_GAMER_X);
            break;
        }
    }
}
exports.togglePlayerWalksForGameBoard = togglePlayerWalksForGameBoard;
function setWinnerForGameBoard(gameBoard, winner) {
    gameBoard.setAttribute(consts_1.DISABLE, consts_1.DISABLE);
    gameBoard.classList.add(consts_1.DISABLE);
    switch (winner) {
        case 1 /* WINNER.PLAYER_X */: {
            gameBoard.classList.add(consts_1.WINNER_GAMER_X);
            break;
        }
        case 2 /* WINNER.PLAYER_O */: {
            gameBoard.classList.add(consts_1.WINNER_GAMER_O);
            break;
        }
        case 3 /* WINNER.DRAW */: {
            gameBoard.classList.add(consts_1.DRAW);
            break;
        }
    }
}
exports.setWinnerForGameBoard = setWinnerForGameBoard;
function getClickedCell(clickedChild) {
    var clickedCell = clickedChild.closest("[".concat(consts_1.CELL, "=").concat(consts_1.CELL, "]"));
    if (!clickedCell) {
        return null;
    }
    return clickedCell;
}
exports.getClickedCell = getClickedCell;
function getCoordinateForClickedCell(clickedCell) {
    var x = clickedCell.getAttribute("x" /* COORDINATE.X */);
    var y = clickedCell.getAttribute("y" /* COORDINATE.Y */);
    if (!x || !y) {
        throw new Error('Coordinate is not valid!');
    }
    return {
        x: Number(x),
        y: Number(y),
    };
}
exports.getCoordinateForClickedCell = getCoordinateForClickedCell;
function checkCellHtmlElementHasMark(cell, player) {
    var mark = cell.getAttribute(consts_1.CELL_MARK);
    switch (player) {
        case "x" /* PLAYER.X */: {
            return mark === "x" /* PLAYER.X */;
        }
        case "o" /* PLAYER.O */: {
            return mark === "o" /* PLAYER.O */;
        }
        default: {
            return mark === "x" /* PLAYER.X */ || mark === "o" /* PLAYER.O */;
        }
    }
}
exports.checkCellHtmlElementHasMark = checkCellHtmlElementHasMark;
function checkWhoseMarkHtmlElement(markHtmlElement, player) {
    var playerMarkAttribute = markHtmlElement.getAttribute(consts_1.PLAYER_MARK);
    switch (player) {
        case "x" /* PLAYER.X */: {
            return playerMarkAttribute === "x" /* PLAYER.X */;
        }
        case "o" /* PLAYER.O */: {
            return playerMarkAttribute === "o" /* PLAYER.O */;
        }
    }
}
exports.checkWhoseMarkHtmlElement = checkWhoseMarkHtmlElement;
function onClickGameBoard(event, gameBoardState) {
    var gameBoardHtmlElement = this;
    var isDisable = gameBoardHtmlElement.getAttribute(consts_1.DISABLE);
    var currentGameCell = getClickedCell(event.target);
    if (!currentGameCell || isDisable) {
        return;
    }
    var isMarkedCell = checkCellHtmlElementHasMark(currentGameCell);
    var coordinate = getCoordinateForClickedCell(currentGameCell);
    if (isMarkedCell) {
        return;
    }
    var playerWalks = gameBoardState.playerWalks;
    markCell(currentGameCell, playerWalks);
    gameBoardState.addMark(coordinate);
    // получим этот аттрибут ещё раз, он после победы добавляется
    isDisable = gameBoardHtmlElement.getAttribute(consts_1.DISABLE);
    if (!isDisable) {
        togglePlayerWalksForGameBoard(this, gameBoardState.playerWalks);
    }
    (0, localStorage_1.setValueForLocalStorage)("gameBoardState" /* LocalStorageKeys.gameBoardStateKey */, gameBoardState.toJSON());
}
exports.onClickGameBoard = onClickGameBoard;
function _markCellHtmlElement(cell, player) {
    cell.classList.add(consts_1.CELL_MARK);
    switch (player) {
        case "x" /* PLAYER.X */: {
            cell.setAttribute(consts_1.CELL_MARK, String("x" /* PLAYER.X */));
            cell.classList.add(consts_1.CELL_MARK_X);
            break;
        }
        case "o" /* PLAYER.O */: {
            cell.setAttribute(consts_1.CELL_MARK, String("o" /* PLAYER.O */));
            cell.classList.add(consts_1.CELL_MARK_O);
            break;
        }
    }
}
function handleEndGame(gameBoardHtmlElement, winnerInformation) {
    var winner = winnerInformation.winner, winnerDirectionLine = winnerInformation.winnerDirectionLine, winningLine = winnerInformation.winningLine, statistics = winnerInformation.statistics;
    var countDraw = statistics.countDraw, countWin_o = statistics.countWin_o, countWin_x = statistics.countWin_x;
    if (!gameBoardHtmlElement) {
        throw new Error('gameBoardHtmlElement is not found!');
    }
    gameBoardHtmlElement.setAttribute(consts_1.DISABLE, consts_1.DISABLE);
    gameBoardHtmlElement.classList.remove(consts_1.MOVE_GAMER_O);
    gameBoardHtmlElement.classList.remove(consts_1.MOVE_GAMER_X);
    gameBoardHtmlElement.classList.add(consts_1.DISABLE);
    switch (winner) {
        case 1 /* WINNER.PLAYER_X */: {
            gameBoardHtmlElement.classList.add(consts_1.WINNER_GAMER_X);
            break;
        }
        case 2 /* WINNER.PLAYER_O */: {
            gameBoardHtmlElement.classList.add(consts_1.WINNER_GAMER_O);
            break;
        }
        case 3 /* WINNER.DRAW */: {
            gameBoardHtmlElement.classList.add(consts_1.DRAW);
            break;
        }
        default: {
            throw new Error('Winner is not defined!');
        }
    }
    if ((winner !== 3 /* WINNER.DRAW */) && winningLine && winnerDirectionLine) {
        crossOutWinningLine(gameBoardHtmlElement, winningLine, winnerDirectionLine);
    }
    (0, statisticInfo_1.updateStatisticInformation)(String(countWin_x), String(countWin_o), String(countDraw));
}
exports.handleEndGame = handleEndGame;
function crossOutWinningLine(board, winningLineCoordinatesArray, orientation) {
    var cellsBoard = getGameBoardCellsArray(board);
    for (var _i = 0, winningLineCoordinatesArray_1 = winningLineCoordinatesArray; _i < winningLineCoordinatesArray_1.length; _i++) {
        var coordinate = winningLineCoordinatesArray_1[_i];
        var x = coordinate.x, y = coordinate.y;
        var cellHtmlElement = cellsBoard[y][x];
        addWinningMarkForCell(cellHtmlElement, orientation);
    }
}
exports.crossOutWinningLine = crossOutWinningLine;
function addWinningMarkForCell(cell, orientation) {
    cell.classList.add(consts_1.CELL_VICTORY_LINE);
    switch (orientation) {
        case 1 /* ORIENTATION.VERTICAL */: {
            cell.classList.add(consts_1.CELL_VICTORY_LINE_DIRECTION_VERTICAL);
            break;
        }
        case 2 /* ORIENTATION.HORIZONTAL */: {
            cell.classList.add(consts_1.CELL_VICTORY_LINE_DIRECTION_HORIZONTAL);
            break;
        }
        case 4 /* ORIENTATION.DIAGONAL_LEFT */: {
            cell.classList.add(consts_1.CELL_VICTORY_LINE_DIAGONAL_LEFT);
            break;
        }
        case 3 /* ORIENTATION.DIAGONAL_RIGHT */: {
            cell.classList.add(consts_1.CELL_VICTORY_LINE_DIAGONAL_RIGHT);
            break;
        }
        default: {
            console.error('Unknown orientation!');
        }
    }
}
function getGameBoardCellsArray(board) {
    var rowsBoard = __spreadArray([], board.children, true);
    return rowsBoard.map(function (rowHtmlElement) {
        return __spreadArray([], rowHtmlElement.children, true);
    });
}
exports.getGameBoardCellsArray = getGameBoardCellsArray;
function handleReloadGame(gameBoardHtmlElement, gameBoardState) {
    gameBoardState.restartGame();
    fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState);
    (0, localStorage_1.setValueForLocalStorage)("gameBoardState" /* LocalStorageKeys.gameBoardStateKey */, gameBoardState.toJSON());
}
exports.handleReloadGame = handleReloadGame;
function handleStartGame(gameBoardHtmlElement, options) {
    var _a = options.size, size = _a === void 0 ? 3 : _a, _b = options.winningStreak, winningStreak = _b === void 0 ? 3 : _b, _c = options.firstPlayerWalks, firstPlayerWalks = _c === void 0 ? "x" /* PLAYER.X */ : _c;
    var gameBoardState = new GameBoardState_1.default({
        size: size,
        firstPlayerWalks: firstPlayerWalks,
        winningStreak: winningStreak,
    });
    _resetGameBoardHtmlElement(gameBoardHtmlElement);
    gameBoardState.restartGame();
    fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState);
    (0, localStorage_1.setValueForLocalStorage)("gameBoardState" /* LocalStorageKeys.gameBoardStateKey */, gameBoardState.toJSON());
    return gameBoardState;
}
exports.handleStartGame = handleStartGame;
function _resetGameBoardHtmlElement(gameBoard) {
    gameBoard.innerHTML = '';
    while (gameBoard.attributes.length > 0) {
        gameBoard.removeAttribute(gameBoard.attributes[0].name);
    }
}


/***/ }),

/***/ "./src/localStorage/localStorage.ts":
/*!******************************************!*\
  !*** ./src/localStorage/localStorage.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getValueForLocalStorage = exports.setValueForLocalStorage = void 0;
function setValueForLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
exports.setValueForLocalStorage = setValueForLocalStorage;
function getValueForLocalStorage(key) {
    return localStorage.getItem(key);
}
exports.getValueForLocalStorage = getValueForLocalStorage;


/***/ }),

/***/ "./src/statisticInfo/statisticInfo.ts":
/*!********************************************!*\
  !*** ./src/statisticInfo/statisticInfo.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleResetStatistics = exports.updateStatisticInformation = void 0;
var constants_1 = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.ts");
var localStorage_1 = __webpack_require__(/*! ../localStorage/localStorage */ "./src/localStorage/localStorage.ts");
function updateStatisticInformation(countWinGame_x, countWinGame_o, countDrawGame) {
    var countWinOHtmlElement = document.getElementById(constants_1.STATISTICS_COUNT_VALUE_WIN_O);
    var countWinXHtmlElement = document.getElementById(constants_1.STATISTICS_COUNT_VALUE_WIN_X);
    var countDrawHtmlElement = document.getElementById(constants_1.STATISTICS_COUNT_VALUE_DRAW);
    if (!countWinOHtmlElement || !countWinXHtmlElement || !countDrawHtmlElement) {
        throw new Error('countWinOHtmlElement || countWinXHtmlElement || countDrawHtmlElement is not defined!');
    }
    countWinOHtmlElement.innerText = countWinGame_o;
    countWinXHtmlElement.innerText = countWinGame_x;
    countDrawHtmlElement.innerText = countDrawGame;
}
exports.updateStatisticInformation = updateStatisticInformation;
function handleResetStatistics(gameBoardState) {
    gameBoardState.resetStatistics();
    (0, localStorage_1.setValueForLocalStorage)("gameBoardState" /* LocalStorageKeys.gameBoardStateKey */, gameBoardState.toJSON());
    var _a = gameBoardState.winnerInformation.statistics, countWin_x = _a.countWin_x, countWin_o = _a.countWin_o, countDraw = _a.countDraw;
    updateStatisticInformation(String(countWin_x), String(countWin_o), String(countDraw));
}
exports.handleResetStatistics = handleResetStatistics;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle-7a432553632fb76331e0.js.map