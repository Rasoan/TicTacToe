'use strict';

import type {
    IGameBoardStateOptions,
    IWinnerInformation,
    ICoordinate,
} from "./declaration/GameBoardState";

import {
    _checkIsValidCoordinate,
    _checkIsCanMovie,
    _checkIsValidBoardFormat,
    _checkIsNotAlreadyMarkedCell,
    _getDefaultBordValues,
    _normalizeCoordinate,
    _togglePlayer,
    _getArrayOfCoordinatesMarksInLine, _playerToWinner,
} from "./gameBoardState_utils";

import {
    ORIENTATION,
    PLAYER,
    WINNER,
} from "./declaration/GameBoardState";

export default class GameBoardState {
    private _board: Array<PLAYER[]>;
    private _playerWalks: PLAYER.X | PLAYER.O = PLAYER.X;
    private _winnerInformation: IWinnerInformation;

    private readonly _winningStreak: number;
    private readonly _firstPlayerWalks: PLAYER.X | PLAYER.O = PLAYER.X;

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
            },
            winningStreak = 3,
            size = 3,
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

        if (winningStreak > this.numberOfMoves) {
            throw new Error('WinningStreak not valid!')
        }

        this._winningStreak = winningStreak;
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

    public addMark(coordinate: ICoordinate): void {
        const {
            _playerWalks,
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
            selectRow[x] = _playerWalks;
            board[y] = selectRow;

            const isVictory = this._checkForVictory({x, y});
            const isGameEndDraw = _checkIsCanMovie(this.countSteps, board.length * board.length);

            if (isVictory) {
                this._handleEndGame(this.winnerInformation);

                return;
            }

            if (!isGameEndDraw) {
                winnerInformation.winner = WINNER.DRAW;

                this._handleEndGame(this.winnerInformation);

                return;
            }

            this._playerWalks = _togglePlayer(_playerWalks);
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
            winnerInformation.winner = _playerToWinner(playerWalks);
            winnerInformation.winnerDirectionLine = ORIENTATION.VERTICAL;
            winnerInformation.winningLine = arrayOfCoordinatesMarksInLine;

            return true;
        }

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.HORIZONTAL,
            board,
            playerWalks,
        );
        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            winnerInformation.winner = _playerToWinner(playerWalks);
            winnerInformation.winnerDirectionLine = ORIENTATION.HORIZONTAL;
            winnerInformation.winningLine = arrayOfCoordinatesMarksInLine;

            return true;
        }

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.DIAGONAL_RIGHT,
            board,
            playerWalks,
        );
        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            winnerInformation.winner = _playerToWinner(playerWalks);
            winnerInformation.winnerDirectionLine = ORIENTATION.DIAGONAL_RIGHT;
            winnerInformation.winningLine = arrayOfCoordinatesMarksInLine;

            return true;
        }

        arrayOfCoordinatesMarksInLine = _getArrayOfCoordinatesMarksInLine(
            coordinate,
            ORIENTATION.DIAGONAL_LEFT,
            board,
            playerWalks,
        );

        if (arrayOfCoordinatesMarksInLine.length === winningStreak) {
            winnerInformation.winner = _playerToWinner(playerWalks);
            winnerInformation.winnerDirectionLine = ORIENTATION.DIAGONAL_LEFT;
            winnerInformation.winningLine = arrayOfCoordinatesMarksInLine;

            return true;
        }

        return false;
    }

    public restartGameBoard() {
        this._playerWalks = this._firstPlayerWalks;
        this._board = _getDefaultBordValues(this.size);
        this._winnerInformation = {
            winner: WINNER._UNKNOWN_,
            winnerDirectionLine: ORIENTATION._UNKNOWN_,
            winningLine: [],
        };
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
