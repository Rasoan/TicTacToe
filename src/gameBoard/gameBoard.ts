import {GAME_BOARD_ID} from "../constants/constants";

export function getGameBoard(
    sizeBoard: number,
) {
    let gameBoard = document.getElementById(GAME_BOARD_ID) as HTMLElement | null;

    if (gameBoard) {
        gameBoard.remove();
    }

    gameBoard = document.createElement('div');

    gameBoard.setAttribute('id', GAME_BOARD_ID);
    gameBoard.setAttribute('class', 'gameBoard');

    for (let y = 1; y <= sizeBoard; y++) {
        for(let x = 1; x <= sizeBoard; x++) {
            const gameCell = document.createElement('div');

            gameCell.setAttribute('class', 'gameCell');
            gameCell.setAttribute('y', String(y));
            gameCell.setAttribute('x', String(x));

            gameBoard.appendChild(gameCell);
        }
    }

    return gameBoard;
}