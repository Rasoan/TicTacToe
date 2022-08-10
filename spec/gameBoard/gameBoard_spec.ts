'use strict'

import {getGameBoardCells} from "../../src/gameBoard/gameBoard";

describe('gameBoard', () => {
   it('getGameBoard', () => {
      const SIZE_GAME_BOARD = 27;
      const gameBoardCells = getGameBoardCells(SIZE_GAME_BOARD);

      expect(gameBoardCells.length)
          .toBe(SIZE_GAME_BOARD);
      expect(gameBoardCells[0].length)
          .toBe(SIZE_GAME_BOARD);

      for(let y = 1; y <= SIZE_GAME_BOARD; y++) {
         for(let x = 1; x <= SIZE_GAME_BOARD; x++) {
            const currentX = (gameBoardCells[y - 1][x - 1] as HTMLElement).getAttribute('x');
            const currentY = (gameBoardCells[y - 1][x - 1] as HTMLElement).getAttribute('y');

            expect(currentX).toBe(String(x));
            expect(currentY).toBe(String(y));
         }
      }
   });
});