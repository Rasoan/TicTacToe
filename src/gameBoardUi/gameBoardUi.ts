'use strict';

import {
    CELL,
    CELL_MARK,
    CELL_MARK_O,
    CELL_MARK_X,
    CELL_VICTORY_LINE,
    CELL_VICTORY_LINE_DIAGONAL_LEFT,
    CELL_VICTORY_LINE_DIAGONAL_RIGHT,
    CELL_VICTORY_LINE_DIRECTION_HORIZONTAL,
    CELL_VICTORY_LINE_DIRECTION_VERTICAL,
    DISABLE,
    DRAW,
    HIDDEN,
    MARK_O,
    MARK_X,
    MOVE_GAMER_O,
    MOVE_GAMER_X,
    PLAYER_MARK,
    WINNER_GAMER_O,
    WINNER_GAMER_X,
} from "../consts";
import {
    COORDINATE,
    ICoordinate,
    IWinnerInformation,
    ORIENTATION,
    PLAYER,
    WINNER
} from "../GameBoardState/declaration/GameBoardState";
import {GAME_BOARD_HTML_ELEMENT_ID} from "../constants/constants";
import GameBoardState from "../GameBoardState/GameBoardState";
import {LocalStorageKeys, setValueForLocalStorage} from "../localStorage/localStorage";

export function createMarkHtmlElement(mark: PLAYER.X | PLAYER.O, hiddenMark = true): HTMLElement {
    const markHtmlElement = document.createElement('span');

    markHtmlElement.setAttribute('class', `gameBoard__mark gameBoardMark`);

    switch (mark) {
        case PLAYER.X: {
            markHtmlElement.setAttribute(PLAYER_MARK, String(PLAYER.X));

            markHtmlElement.classList.add(MARK_X);

            markHtmlElement.innerText = PLAYER.X;

            break;
        }
        case PLAYER.O: {
            markHtmlElement.setAttribute(PLAYER_MARK, String(PLAYER.O));

            markHtmlElement.classList.add(MARK_O);

            markHtmlElement.innerText = PLAYER.O;

            break;
        }
        default: {
            markHtmlElement.classList.remove(CELL_MARK);
        }
    }

    if (hiddenMark) {
        markHtmlElement.classList.add(HIDDEN);
    }

    return markHtmlElement;
}

export function createCellHtmlElement(coordinate: ICoordinate, mark?: PLAYER): HTMLElement {
    const {x, y} = coordinate;
    const gameCell = document.createElement('div');

    gameCell.setAttribute('class', `gameBoard__cell gameBoardCell`);
    gameCell.setAttribute(COORDINATE.X, String(x));
    gameCell.setAttribute(COORDINATE.Y, String(y));
    gameCell.setAttribute(CELL, CELL);

    if (mark === PLAYER.X || mark === PLAYER.O) {
        _markCellHtmlElement(gameCell, mark);
    }

    return gameCell;
}

export function createCell(coordinate: ICoordinate, mark?: PLAYER) {
    const cellHtmlElement = createCellHtmlElement(coordinate, mark);

    if (mark === PLAYER.X || mark === PLAYER.O) {
        const markHtmlElement = createMarkHtmlElement(mark, false);

        cellHtmlElement.appendChild(markHtmlElement);

        return cellHtmlElement;
    }

    const markHtmlElement_X = createMarkHtmlElement(PLAYER.X, true);
    const markHtmlElement_O = createMarkHtmlElement(PLAYER.O, true);

    cellHtmlElement.appendChild(markHtmlElement_X);
    cellHtmlElement.appendChild(markHtmlElement_O);

    return cellHtmlElement;
}

export function createCellsArray(board: PLAYER[][]): HTMLElement[][] {
    const gameBoardTable = [];

    for (let y = 1; y <= board.length; y++) {
        const gameBoardRow = [];

        for(let x = 1; x <= board.length; x++) {
            let gameCell;
            const currentValueForCellGameBoardState = board[y - 1][x - 1];

            gameCell = createCell({x, y}, currentValueForCellGameBoardState)
            gameBoardRow.push(gameCell);
        }

        gameBoardTable.push(gameBoardRow);
    }

    return gameBoardTable;
}

export function fillGameBoardHtmlElement(
    gameBoardHtmlElement: HTMLElement,
    gameBoardState: GameBoardState,
) {
    const {
        winnerInformation,
        board,
        playerWalks,
    } = gameBoardState;
    const {
        winner,
        winnerDirectionLine,
        winningLine,
    } = winnerInformation;

    const isEndGame = winner === WINNER.PLAYER_X || winner === WINNER.PLAYER_O || winner === WINNER.DRAW;
    const isWinGame =  winner === WINNER.PLAYER_X || winner === WINNER.PLAYER_O;

    if (gameBoardHtmlElement) {
        _resetGameBoardHtmlElement(gameBoardHtmlElement);
    }

    const gameBoardCellsArray = createCellsArray(board);

    gameBoardHtmlElement.setAttribute('id', GAME_BOARD_HTML_ELEMENT_ID);
    gameBoardHtmlElement.setAttribute('class', `gameBoard`);

    if (isEndGame) {
        setWinnerForGameBoard(gameBoardHtmlElement, winner);
    }
    else {
        togglePlayerWalksForGameBoard(gameBoardHtmlElement, playerWalks);
    }

    for (const currentRow of gameBoardCellsArray) {
        const gameBoardRow = document.createElement('div');

        gameBoardRow.setAttribute('class', 'gameBoard__row');

        for (const currentCell of currentRow) {
            gameBoardRow.appendChild(currentCell);
        }

        gameBoardHtmlElement.appendChild(gameBoardRow);
    }

    if (isWinGame && winningLine && winnerDirectionLine) {
        crossOutWinningLine(
            gameBoardHtmlElement,
            winningLine,
            winnerDirectionLine,
        );
    }
}

export function markCell(cell: HTMLElement, player: PLAYER.X | PLAYER.O) {
    const cellMarks = [...cell?.children as unknown as HTMLElement[]];

    if (checkCellHtmlElementHasMark(cell)) {
        throw new Error('Cell is marked!');
    }

    for (const currentMarkHtmlElement of cellMarks) {
        const isMark_X = checkWhoseMarkHtmlElement(currentMarkHtmlElement, PLAYER.X);
        const isMark_O = checkWhoseMarkHtmlElement(currentMarkHtmlElement, PLAYER.O);
        
        switch (player) {
            case PLAYER.X: {
                if (isMark_X) {
                    currentMarkHtmlElement.classList.remove(HIDDEN);
                }
                else if (isMark_O) {
                    cell.removeChild(currentMarkHtmlElement);
                }

                break;
            }
            case PLAYER.O: {
                if (isMark_X) {
                    cell.removeChild(currentMarkHtmlElement);
                }
                else if (isMark_O) {
                    currentMarkHtmlElement.classList.remove(HIDDEN);
                }

                break;
            }
        }
    }

    _markCellHtmlElement(cell, player);
}

export function togglePlayerWalksForGameBoard(gameBoard: HTMLElement, playerWalks: PLAYER.X | PLAYER.O): void {
    switch(playerWalks) {
        case PLAYER.X: {
            gameBoard.classList.add(MOVE_GAMER_X);
            gameBoard.classList.remove(MOVE_GAMER_O);

            break;
        }
        case PLAYER.O: {
            gameBoard.classList.add(MOVE_GAMER_O);
            gameBoard.classList.remove(MOVE_GAMER_X);

            break;
        }
    }
}

export function setWinnerForGameBoard(
    gameBoard: HTMLElement,
    winner: WINNER.PLAYER_X | WINNER.PLAYER_O | WINNER.DRAW,
): void {
    gameBoard.setAttribute(DISABLE, DISABLE);
    gameBoard.classList.add(DISABLE);

    switch(winner) {
        case WINNER.PLAYER_X: {
            gameBoard.classList.add(WINNER_GAMER_X);

            break;
        }
        case WINNER.PLAYER_O: {
            gameBoard.classList.add(WINNER_GAMER_O);

            break;
        }
        case WINNER.DRAW: {
            gameBoard.classList.add(DRAW);

            break;
        }
    }
}

export function getClickedCell(clickedChild: HTMLElement): HTMLElement | null {
    const clickedCell = clickedChild.closest(`[${CELL}=${CELL}]`);

    if (!clickedCell) {
        return null;
    }

    return clickedCell as HTMLElement;
}

export function getCoordinateForClickedCell(clickedCell: HTMLElement): ICoordinate {
    const x = clickedCell.getAttribute(COORDINATE.X);
    const y = clickedCell.getAttribute(COORDINATE.Y);

    if (!x || !y) {
        throw new Error('Coordinate is not valid!');
    }

    return {
        x: Number(x),
        y: Number(y),
    };
}

export function checkCellHtmlElementHasMark(cell: HTMLElement, player?: PLAYER): boolean {
    const mark = cell.getAttribute(CELL_MARK);

    switch (player) {
        case PLAYER.X: {
            return mark === PLAYER.X;
        }
        case PLAYER.O: {
            return mark === PLAYER.O;
        }
        default: {
            return mark === PLAYER.X || mark === PLAYER.O;
        }
    }
}

export function checkWhoseMarkHtmlElement(markHtmlElement: HTMLElement, player: PLAYER.X | PLAYER.O): boolean {
    const playerMarkAttribute = markHtmlElement.getAttribute(PLAYER_MARK);

    switch (player) {
        case PLAYER.X: {
            return playerMarkAttribute === PLAYER.X;
        }
        case PLAYER.O: {
            return playerMarkAttribute === PLAYER.O;
        }
    }
}

export function onClickGameBoard(this: HTMLElement, event: MouseEvent, gameBoardState: GameBoardState) {
    const gameBoardHtmlElement = this;
    let isDisable = gameBoardHtmlElement.getAttribute(DISABLE);
    const currentGameCell = getClickedCell(event.target as HTMLElement);

    if (!currentGameCell || isDisable) {
        return;
    }

    const isMarkedCell = checkCellHtmlElementHasMark(currentGameCell);
    const coordinate = getCoordinateForClickedCell(currentGameCell);

    if (isMarkedCell) {
        return;
    }

    const playerWalks = gameBoardState.playerWalks;

    markCell(currentGameCell, playerWalks);

    gameBoardState.addMark(coordinate);

    // получим этот аттрибут ещё раз, он после победы добавляется
    isDisable = gameBoardHtmlElement.getAttribute(DISABLE);

    if (!isDisable) {
        togglePlayerWalksForGameBoard(this, gameBoardState.playerWalks);
    }

    setValueForLocalStorage(LocalStorageKeys.gameBoardStateKey, gameBoardState.toJSON());
}

function _markCellHtmlElement(cell: HTMLElement, player: PLAYER.X | PLAYER.O): void {
    cell.classList.add(CELL_MARK);

    switch (player) {
        case PLAYER.X: {
            cell.setAttribute(CELL_MARK, String(PLAYER.X));
            cell.classList.add(CELL_MARK_X);

            break;
        }
        case PLAYER.O: {
            cell.setAttribute(CELL_MARK, String(PLAYER.O));
            cell.classList.add(CELL_MARK_O);

            break;
        }
    }
}

export function handleEndGame(gameBoardHtmlElement: HTMLElement, winnerInformation: IWinnerInformation) {
    const {
        winner,
        winnerDirectionLine,
        winningLine,
    } = winnerInformation;

    if (!gameBoardHtmlElement) {
        throw new Error('gameBoardHtmlElement is not found!');
    }

    gameBoardHtmlElement.setAttribute(DISABLE, DISABLE);

    gameBoardHtmlElement.classList.remove(MOVE_GAMER_O);
    gameBoardHtmlElement.classList.remove(MOVE_GAMER_X);
    gameBoardHtmlElement.classList.add(DISABLE);

    switch(winner) {
        case WINNER.PLAYER_X: {
            gameBoardHtmlElement.classList.add(WINNER_GAMER_X);

            break;
        }
        case WINNER.PLAYER_O: {
            gameBoardHtmlElement.classList.add(WINNER_GAMER_O);

            break;
        }
        case WINNER.DRAW: {
            gameBoardHtmlElement.classList.add(DRAW);

            break;
        }
        default: {
            throw new Error('Winner is not defined!')
        }
    }

    if ((winner !== WINNER.DRAW) &&  winningLine && winnerDirectionLine) {
        crossOutWinningLine(gameBoardHtmlElement, winningLine, winnerDirectionLine);
    }
}

export function crossOutWinningLine(
    board: HTMLElement,
    winningLineCoordinatesArray: ICoordinate[],
    orientation: ORIENTATION,
    ) {
    const cellsBoard = getGameBoardCellsArray(board);

    for (const coordinate of winningLineCoordinatesArray) {
        const { x, y } = coordinate;
        const cellHtmlElement = cellsBoard[y][x];

        addWinningMarkForCell(cellHtmlElement, orientation)
    }
}

function addWinningMarkForCell(
    cell: HTMLElement,
    orientation: ORIENTATION,
) {
    cell.classList.add(CELL_VICTORY_LINE);

    switch(orientation) {
        case ORIENTATION.VERTICAL: {
            cell.classList.add(CELL_VICTORY_LINE_DIRECTION_VERTICAL);

            break;
        }
        case ORIENTATION.HORIZONTAL: {
            cell.classList.add(CELL_VICTORY_LINE_DIRECTION_HORIZONTAL);

            break;
        }
        case ORIENTATION.DIAGONAL_LEFT: {
            cell.classList.add(CELL_VICTORY_LINE_DIAGONAL_LEFT);

            break;
        }
        case ORIENTATION.DIAGONAL_RIGHT: {
            cell.classList.add(CELL_VICTORY_LINE_DIAGONAL_RIGHT);

            break;
        }
        default: {
            console.error('Unknown orientation!');
        }
    }
}

export function getGameBoardCellsArray(board: HTMLElement) {
    const rowsBoard = [ ...board.children as unknown as HTMLElement[] ];

    return rowsBoard.map((rowHtmlElement: HTMLElement) => {
        return [ ...rowHtmlElement.children as unknown as HTMLElement[] ];
    });
}

export function handleReloadGame(
    gameBoardHtmlElement: HTMLElement,
    gameBoardState: GameBoardState,
) {
    gameBoardState.resetGame();

    fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState);

    setValueForLocalStorage(LocalStorageKeys.gameBoardStateKey, gameBoardState.toJSON());
}

export function handleStartGame(
    gameBoardHtmlElement: HTMLElement,
    options: {
        size?: number,
        firstPlayerWalks?: PLAYER.X | PLAYER.O,
        winningStreak?: number,
    }
) {
    const {
        size = 3,
        winningStreak = 3,
        firstPlayerWalks = PLAYER.X,
    } = options;

    const gameBoardState = new GameBoardState({
        size,
        firstPlayerWalks,
        winningStreak,
    });

    _resetGameBoardHtmlElement(gameBoardHtmlElement);

    gameBoardState.resetGame();

    fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState);

    setValueForLocalStorage(LocalStorageKeys.gameBoardStateKey, gameBoardState.toJSON());

    return gameBoardState;
}

function _resetGameBoardHtmlElement(gameBoard: HTMLElement) {
    gameBoard.innerHTML = '';

    while (gameBoard.attributes.length > 0) {
        gameBoard.removeAttribute(gameBoard.attributes[0].name);
    }
}