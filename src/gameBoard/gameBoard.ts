'use strict';

import {
    GAME_CELL,
    GAME_CELL_MARKED_O,
    GAME_CELL_MARKED_X,
    GAMER_O,
    GAMER_PROPERTY_NAME,
    GAMER_X,
    HIDDEN,
    O,
    X, X_COORDINATE, Y_COORDINATE
} from "../consts";
import {PLAYER} from "./declaration/gameBoard";

export function getGameBoardCells(sizeBoard: number) {
    const gameBoardTable = [];

    for (let y = 1; y <= sizeBoard; y++) {
        const gameBoardRow = [];

        for(let x = 1; x <= sizeBoard; x++) {
            const gameCell = document.createElement('div');

            gameCell.setAttribute('class', GAME_CELL);
            gameCell.setAttribute(X_COORDINATE, String(x));
            gameCell.setAttribute(Y_COORDINATE, String(y));

            const cell_X = document.createElement('span');
            cell_X.setAttribute('class', `gameCell__marked gameCellMarked ${HIDDEN} ${GAME_CELL_MARKED_X}`);
            cell_X.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.X));
            cell_X.innerText = X;

            const cell_O = document.createElement('span');
            cell_O.setAttribute('class', `gameCell__marked gameCellMarked ${HIDDEN} ${GAME_CELL_MARKED_O}`);
            cell_O.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.O));
            cell_O.innerText = O;

            gameCell.appendChild(cell_X);
            gameCell.appendChild(cell_O);

            gameBoardRow.push(gameCell);
        }

        gameBoardTable.push(gameBoardRow);
    }

    return gameBoardTable;
}

export function toggleClassAndAttributeGameBoard(
    htmlElement: HTMLElement,
) {
    const isClassX = htmlElement.getAttribute(GAMER_PROPERTY_NAME) === String(PLAYER.X);
    const isClassY = htmlElement.getAttribute(GAMER_PROPERTY_NAME) === String(PLAYER.O);

    if (isClassX) {
        htmlElement.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.O));

        htmlElement.classList.remove(GAMER_X);
        htmlElement.classList.add(GAMER_O);
    }
    else if (isClassY) {
        htmlElement.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.X));

        htmlElement.classList.add(GAMER_X);
        htmlElement.classList.remove(GAMER_O);
    }
    else {
        console.error('No class found!');
    }
}

export function markCell(currentGameCell: HTMLElement, player: PLAYER) {
    const markHtmlElements = [...currentGameCell?.children as unknown as HTMLElement[]];

    for (const currentMarkHtmlElement of markHtmlElements) {
        const isMark_X = currentMarkHtmlElement.getAttribute(GAMER_PROPERTY_NAME) === String(PLAYER.X);
        const isMark_O = currentMarkHtmlElement.getAttribute(GAMER_PROPERTY_NAME) === String(PLAYER.O);
        
        switch (player) {
            case PLAYER.X: {
                if (isMark_X) {
                    currentMarkHtmlElement.classList.remove(HIDDEN);
                }
                else if (isMark_O) {
                    currentGameCell.removeChild(currentMarkHtmlElement);
                }

                break;
            }
            case PLAYER.O: {
                if (isMark_O) {
                    currentMarkHtmlElement.classList.remove(HIDDEN);
                }
                else if (isMark_X) {
                    currentGameCell.removeChild(currentMarkHtmlElement);
                }

                break;
            }
            default: {
                console.error('Unknown player moved!');
            }
        }
    }
}

export function getPlayerMoved(gameBoard: HTMLElement): PLAYER {
    return Number(gameBoard.getAttribute(GAMER_PROPERTY_NAME));
}