'use strict';

import type {ICoordinate, IGameBoardStateOptions, IWinnerInformation,} from "./declaration/GameBoardState";
import {COORDINATE, IMarkInformation, ORIENTATION, PLAYER, WINNER,} from "./declaration/GameBoardState";

import {
    _checkIsCanMovie,
    _checkIsNotAlreadyMarkedCell,
    _checkIsValidBoardFormat,
    _checkIsValidCoordinate,
    _getArrayOfCoordinatesMarksInLine,
    _getDefaultBordValues,
    _normalizeCoordinate,
    _playerToWinner,
    _togglePlayer,
} from "./gameBoardState_utils";

export default class GameBoardState {
    private _board: Array<PLAYER[]>;
    private _playerWalks: PLAYER.X | PLAYER.O = PLAYER.X;
    private _winnerInformation: IWinnerInformation;

    private _winningStreak: number;
    private _firstPlayerWalks: PLAYER.X | PLAYER.O = PLAYER.X;

    private _handleEndGame = (winnerInformation: IWinnerInformation) => { console.error('Method handleEndGame is not defined!', winnerInformation) };

    public subscribeToEndGame(collback: (winnerInformation: IWinnerInformation) => void) {
        this._handleEndGame = collback;
    }

    constructor(options: IGameBoardStateOptions = {}) {
        const {
            board,
            playerWalks,
            winnerInformation = {
                winner: WINNER._UNKNOWN_,
                winnerDirectionLine: ORIENTATION._UNKNOWN_,
                winningLine: [],
                statistics: {
                    countDraw: 0,
                    countWin_o: 0,
                    countWin_x: 0,
                }
            },
            size = 3,
            winningStreak,
            firstPlayerWalks = PLAYER.X,
        } = options;

        if (board && playerWalks) {
            const isValidBoard = _checkIsValidBoardFormat(board);

            if (!isValidBoard) {
                throw new TypeError(`Board is not valid! {board: ${board}}`);
            }

            this._board = board;
            this._playerWalks = playerWalks;
        } else {
            this._board = _getDefaultBordValues(size);
            this._playerWalks = firstPlayerWalks;
        }

        this._winningStreak = winningStreak && winningStreak <= this.size ? winningStreak: this.size;
        this._firstPlayerWalks = firstPlayerWalks;
        this._winnerInformation = winnerInformation;
    }

    get board() {
        return this._board.slice();
    }

    get countSteps() {
        return this._board.flat().filter(cell => cell !== PLAYER._VOID_).length;
    }

    get playerWalks() {
        return this._playerWalks;
    }

    get winningStreak() {
        return this._winningStreak;
    }

    get winnerInformation(): IWinnerInformation {
        const { winningLine } = this._winnerInformation;

        return {
            ...this._winnerInformation,
            winningLine: winningLine ? [ ...winningLine ]: [],
        };
    }

    get firstPlayerWalks() {
        return this._firstPlayerWalks;
    }

    get size() {
        return this._board.length;
    }

    get numberOfMoves() {
        return this._board.length * this._board.length;
    }

    public addMark(coordinate: ICoordinate): IMarkInformation | void {
        const {
            _playerWalks: playerWalks,
            _board: board,
            _winnerInformation: winnerInformation,
        } = this;
        const {
            winner,
        } = winnerInformation;

        const isValidCoordinate = _checkIsValidCoordinate(coordinate, board.length);

        if (!isValidCoordinate) {
            const errorText = 'Coordinate not valid!';

            throw new Error(errorText);
        }

        const {x, y} = _normalizeCoordinate(coordinate);

        if (winner === WINNER.DRAW || winner === WINNER.PLAYER_O || winner === WINNER.PLAYER_X) {
            const errorText = 'They made a move, but the game is over and there is a winner!';

            throw new Error(errorText);
        }

        const isNotAlreadyMarkedCell = _checkIsNotAlreadyMarkedCell(this._board[y][x]);

        if (isNotAlreadyMarkedCell) {
            // todo: здесь костыль, какой-то не понятный баг с сетом значения в клеточку
            const selectRow = [...board[y]];
            selectRow[x] = playerWalks;
            board[y] = selectRow;

            const isVictory = this._checkForVictory({x, y});
            const isCanMovie = _checkIsCanMovie(this.countSteps, board.length * board.length);

            if (isVictory) {
                this._handleEndGame(this.winnerInformation);

                return;
            }

            if (!isCanMovie) {
                winnerInformation.winner = WINNER.DRAW;
                this.winnerInformation.statistics.countDraw++;

                this._handleEndGame(this.winnerInformation);

                return;
            }

            this._playerWalks = _togglePlayer(playerWalks);

            return {
                playerWalks,
            }
        }
        else {
            const errorText = 'Error! Already marked cell!!';

            throw new Error(errorText);
        }
    }

    private _checkForVictory(coordinate: ICoordinate): boolean {
        const {
            _winningStreak: winningStreak,
            _playerWalks: playerWalks,
            _board: board,
            _winnerInformation: winnerInformation,
        } = this;

        let arrayOfCoordinatesMarksInLine: ICoordinate[];

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.VERTICAL,
            board,
            playerWalks,
        );
        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            this._fillWinnerInformation(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.VERTICAL,
            );

            return true;
        }

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.HORIZONTAL,
            board,
            playerWalks,
        );
        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            this._fillWinnerInformation(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.HORIZONTAL,
            );

            return true;
        }

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.DIAGONAL_RIGHT,
            board,
            playerWalks,
        );
        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            this._fillWinnerInformation(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.DIAGONAL_RIGHT,
            );

            return true;
        }

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.DIAGONAL_LEFT,
            board,
            playerWalks,
        );

        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            this._fillWinnerInformation(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.DIAGONAL_LEFT,
            );

            return true;
        }

        return false;
    }

    private _fillWinnerInformation(
        arrayOfCoordinatesMarksInLine: ICoordinate[],
        orientation: ORIENTATION,
    ) {
        const {
            playerWalks,
            _winnerInformation: winnerInformation,
        } = this;

        winnerInformation.winner = _playerToWinner(playerWalks);
        winnerInformation.winnerDirectionLine = orientation;
        winnerInformation.winningLine = arrayOfCoordinatesMarksInLine;

        if (playerWalks === PLAYER.X) {
            winnerInformation.statistics.countWin_x++;
        } else if (playerWalks === PLAYER.O) {
            winnerInformation.statistics.countWin_o++;
        }
    }

    public restartGame() {
        this._playerWalks = this._firstPlayerWalks;
        this._board = _getDefaultBordValues(this.size);
        this._winnerInformation = {
            ...this.winnerInformation,
            winner: WINNER._UNKNOWN_,
            winnerDirectionLine: ORIENTATION._UNKNOWN_,
            winningLine: [],
        };
    }

    public start(options: IGameBoardStateOptions = {}) {
        const {
            board,
            playerWalks,
            winnerInformation = {
                winner: WINNER._UNKNOWN_,
                winnerDirectionLine: ORIENTATION._UNKNOWN_,
                winningLine: [],
            },
            size = 3,
            winningStreak,
            firstPlayerWalks = PLAYER.X,
        } = options;

        if (board && playerWalks) {
            const isValidBoard = _checkIsValidBoardFormat(board);

            if (!isValidBoard) {
                throw new TypeError(`Board is not valid! {board: ${board}}`);
            }

            this._board = board;
            this._playerWalks = playerWalks;
        } else {
            this._board = _getDefaultBordValues(size);
            this._playerWalks = firstPlayerWalks;
        }

        this._winningStreak = winningStreak && winningStreak <= this.size ? winningStreak: this.size;
        this._firstPlayerWalks = firstPlayerWalks;
        this._winnerInformation = {
            ...this._winnerInformation,
            ...winnerInformation,
        };
    }

    public resetStatistics() {
        this._winnerInformation.statistics.countWin_o = 0;
        this._winnerInformation.statistics.countWin_x = 0;
        this._winnerInformation.statistics.countDraw = 0;
    }

    public toJSON(): string {
        const {
            board,
            playerWalks,
            winnerInformation,
            winningStreak,
            firstPlayerWalks,
        } = this;

        return JSON.stringify({
            board,
            playerWalks,
            winnerInformation,
            winningStreak,
            firstPlayerWalks,
        });
    }

    static fromJSON(gameBoardStateJSON: string): GameBoardState {
        const gameBoardStateFields = JSON.parse(gameBoardStateJSON);

        return new GameBoardState(gameBoardStateFields);
    }
}