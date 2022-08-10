'use strict';

export function getGameBoardCells(sizeBoard: number) {
    const gameBoardTable = [];

    for (let y = 1; y <= sizeBoard; y++) {
        const gameBoardRow = [];

        for(let x = 1; x <= sizeBoard; x++) {
            const gameCell = document.createElement('div');

            gameCell.setAttribute('class', 'gameCell');
            gameCell.setAttribute('y', String(y));
            gameCell.setAttribute('x', String(x));

            gameBoardRow.push(gameCell);
        }

        gameBoardTable.push(gameBoardRow);
    }

    return gameBoardTable;
}