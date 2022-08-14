'use strict'

import {getGameBoardCells, markCell, toggleClassAndAttributeGameBoard} from "../../src/gameBoard/gameBoard";
import {GAME_BOARD_ID} from "../../src/constants/constants";
import {
   GAME_CELL_MARKED_O,
   GAME_CELL_MARKED_X,
   GAMER_O,
   GAMER_PROPERTY_NAME,
   GAMER_X,
   HIDDEN, O,
   X, X_COORDINATE, Y_COORDINATE
} from "../../src/consts";
import {PLAYER} from "../../src/gameBoard/declaration/gameBoard";

describe('gameBoard', () => {
   it('getGameBoard', () => {
      const SIZE_GAME_BOARD = 27;
      const gameBoardCells = getGameBoardCells(SIZE_GAME_BOARD);

      // проверили сетку
      expect(gameBoardCells.length)
          .toBe(SIZE_GAME_BOARD);
      expect(gameBoardCells[0].length)
          .toBe(SIZE_GAME_BOARD);

      for(let y = 1; y <= SIZE_GAME_BOARD; y++) {
         for(let x = 1; x <= SIZE_GAME_BOARD; x++) {
            const currentCell = gameBoardCells[y - 1][x - 1] as HTMLElement;
            const currentCoordinateCell_X = currentCell.getAttribute(X_COORDINATE);
            const currentCoordinateCell_Y = currentCell.getAttribute(Y_COORDINATE);

            // проверили координаты
            expect(currentCoordinateCell_X).toBe(String(x));
            expect(currentCoordinateCell_Y).toBe(String(y));

            const markHtmlElements = currentCell.children as unknown as HTMLElement[];

            // проверяем, что в массиве 2 отметки
            expect(markHtmlElements.length)
                .toBe(2);

            // первым элементом в массиве находится отметка "Х"
            const mark_X = markHtmlElements[0];

            expect(mark_X.getAttribute(GAMER_PROPERTY_NAME))
                .toBe(String(PLAYER.X));
            expect(mark_X.classList.contains(GAME_CELL_MARKED_X))
                .toBeTruthy();
            expect(mark_X.innerText)
                .toBe(X);
            expect(mark_X.classList.contains(GAME_CELL_MARKED_O))
                .toBeFalsy();
            expect(mark_X.classList.contains(HIDDEN))
                .toBeTruthy();

            // вторым элементом в массиве находится отметка "O"
            const mark_O = markHtmlElements[1];

            expect(mark_O.getAttribute(GAMER_PROPERTY_NAME))
                .toBe(String(PLAYER.O));
            expect(mark_O.classList.contains(GAME_CELL_MARKED_O))
                .toBeTruthy();
            expect(mark_O.innerText)
                .toBe(O);
            expect(mark_O.classList.contains(GAME_CELL_MARKED_X))
                .toBeFalsy();
            expect(mark_O.classList.contains(HIDDEN))
                .toBeTruthy();
         }
      }
   });

   it('toggleClassAndAttributeGameBoard', () => {
      const gameBoard = document.createElement('div');

      gameBoard.setAttribute('id', GAME_BOARD_ID);
      gameBoard.setAttribute('class', `gameBoard gameBoardTable ${GAMER_X}`);
      gameBoard.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.X));

      expect(gameBoard.getAttribute(GAMER_PROPERTY_NAME))
          .toBe(String(PLAYER.X));
      expect(gameBoard.classList.contains(GAMER_X))
          .toBeTruthy();

      toggleClassAndAttributeGameBoard(gameBoard);

      expect(gameBoard.getAttribute(GAMER_PROPERTY_NAME))
          .toBe(String(PLAYER.O));
      expect(gameBoard.classList.contains(GAMER_O))
          .toBeTruthy();

      toggleClassAndAttributeGameBoard(gameBoard);

      expect(gameBoard.getAttribute(GAMER_PROPERTY_NAME))
          .toBe(String(PLAYER.X));
      expect(gameBoard.classList.contains(GAMER_X))
          .toBeTruthy();
   });

   it('markCell', () => {
      let gameCell = document.createElement('div');

      gameCell.setAttribute('class', 'gameCell');

      const mark_X = document.createElement('span');
      mark_X.setAttribute('class', `gameCell__marked gameCellMarked ${HIDDEN} ${GAME_CELL_MARKED_X}`);
      mark_X.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.X));
      mark_X.innerText = X;

      const mark_O = document.createElement('span');
      mark_O.setAttribute('class', `gameCell__marked gameCellMarked ${HIDDEN} ${GAME_CELL_MARKED_O}`);
      mark_O.setAttribute(GAMER_PROPERTY_NAME, String(PLAYER.O));
      mark_O.innerText = O;

      gameCell.appendChild(mark_X);
      gameCell.appendChild(mark_O);

      markCell(gameCell, PLAYER.X);

      let markHtmlElements = gameCell.children as unknown as HTMLElement[];

      // проверяем, что отметка только одна в клетке осталась, так как мы уже сделали ход в этой клетке
      expect(markHtmlElements.length)
          .toBe(1);
      // так как в массиве осталась только одна отметка, то берём нулевой (он же единственный) элемент в массиве и проверяем его
      // что это крестик, а не нолик, так как ходил игрок "Х"
      expect(markHtmlElements[0].getAttribute(GAMER_PROPERTY_NAME))
          .toBe(String(PLAYER.X));
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_X))
          .toBeTruthy();
      expect(markHtmlElements[0].innerText)
          .toBe(X);
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_O))
          .toBeFalsy();
      expect(markHtmlElements[0].classList.contains(HIDDEN))
          .toBeFalsy();
      
      /* ---------------------------------------------------------- */

      gameCell = document.createElement('div');

      gameCell.setAttribute('class', 'gameCell');

      gameCell.appendChild(mark_X);
      gameCell.appendChild(mark_O);

      markCell(gameCell, PLAYER.O);

      markHtmlElements = gameCell.children as unknown as HTMLElement[];

      // проверяем, что отметка только одна в клетке осталась, так как мы уже сделали ход в этой клетке
      expect(markHtmlElements.length)
          .toBe(1);
      // так как в массиве осталась только одна отметка, то берём нулевой (он же единственный) элемент в массиве и проверяем его
      // что это нолик, а не крестик, так как ходил игрок "O"
      expect(markHtmlElements[0].getAttribute(GAMER_PROPERTY_NAME))
          .toBe(String(PLAYER.O));
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_O))
          .toBeTruthy();
      expect(markHtmlElements[0].innerText)
          .toBe(O);
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_X))
          .toBeFalsy();
      expect(markHtmlElements[0].classList.contains(HIDDEN))
          .toBeFalsy();
   });
});