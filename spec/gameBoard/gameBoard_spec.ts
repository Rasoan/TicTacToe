'use strict'

import {getGameBoardCells, markCell, toggleClassAndAttributeGameBoard} from "../../src/gameBoard/gameBoard";
import {GAME_BOARD_ID} from "../../src/constants/constants";
import {
   GAME_CELL_MARKED_O,
   GAME_CELL_MARKED_X,
   GAMER_O,
   PLAYER_WALKS,
   GAMER_X,
   HIDDEN, CELL_MARK, PLAYER_MARK,
} from "../../src/consts";
import {COORDINATE, PLAYER, PLAYER_TEXT} from "../../src/gameBoard/declaration/gameBoard";

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
            const currentCoordinateCell_X = currentCell.getAttribute(COORDINATE.X);
            const currentCoordinateCell_Y = currentCell.getAttribute(COORDINATE.Y);

            // проверили координаты
            expect(currentCoordinateCell_X).toBe(String(x));
            expect(currentCoordinateCell_Y).toBe(String(y));

            const markHtmlElements = currentCell.children as unknown as HTMLElement[];

            // проверяем, что в массиве 2 отметки
            expect(markHtmlElements.length)
                .toBe(2);

            // первым элементом в массиве находится отметка "Х"
            const mark_X = markHtmlElements[0];

            expect(mark_X.getAttribute(PLAYER_MARK))
                .toBe(String(PLAYER.X));
            expect(mark_X.classList.contains(GAME_CELL_MARKED_X))
                .toBeTruthy();
            expect(mark_X.innerText)
                .toBe(PLAYER_TEXT.X);
            expect(mark_X.classList.contains(GAME_CELL_MARKED_O))
                .toBeFalsy();
            expect(mark_X.classList.contains(HIDDEN))
                .toBeTruthy();

            // вторым элементом в массиве находится отметка "O"
            const mark_O = markHtmlElements[1];

            expect(mark_O.getAttribute(PLAYER_MARK))
                .toBe(String(PLAYER.O));
            expect(mark_O.classList.contains(GAME_CELL_MARKED_O))
                .toBeTruthy();
            expect(mark_O.innerText)
                .toBe(PLAYER_TEXT.O);
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
      gameBoard.setAttribute(PLAYER_WALKS, String(PLAYER.X));

      expect(gameBoard.getAttribute(PLAYER_WALKS))
          .toBe(String(PLAYER.X));
      expect(gameBoard.classList.contains(GAMER_X))
          .toBeTruthy();

      toggleClassAndAttributeGameBoard(gameBoard);

      expect(gameBoard.getAttribute(PLAYER_WALKS))
          .toBe(String(PLAYER.O));
      expect(gameBoard.classList.contains(GAMER_O))
          .toBeTruthy();

      toggleClassAndAttributeGameBoard(gameBoard);

      expect(gameBoard.getAttribute(PLAYER_WALKS))
          .toBe(String(PLAYER.X));
      expect(gameBoard.classList.contains(GAMER_X))
          .toBeTruthy();
   });

   it('markCell', () => {
      let gameCell = document.createElement('div');

      gameCell.setAttribute('class', 'gameCell');

      const mark_X = document.createElement('span');
      mark_X.setAttribute('class', `gameCell__marked gameCellMarked ${HIDDEN} ${GAME_CELL_MARKED_X}`);
      mark_X.setAttribute(PLAYER_MARK, String(PLAYER.X));
      mark_X.innerText = PLAYER_TEXT.X;

      const mark_O = document.createElement('span');
      mark_O.setAttribute('class', `gameCell__marked gameCellMarked ${HIDDEN} ${GAME_CELL_MARKED_O}`);
      mark_O.setAttribute(PLAYER_MARK, String(PLAYER.O));
      mark_O.innerText = PLAYER_TEXT.O;

      gameCell.appendChild(mark_X);
      gameCell.appendChild(mark_O);

      markCell(gameCell, PLAYER.X);

      expect(gameCell.getAttribute(CELL_MARK))
          .toBe(String(PLAYER.X));
      expect(gameCell.classList.contains(CELL_MARK))
          .toBeTruthy();

      let markHtmlElements = gameCell.children as unknown as HTMLElement[];

      // проверяем, что отметка только одна в клетке осталась, так как мы уже сделали ход в этой клетке
      expect(markHtmlElements.length)
          .toBe(1);
      // так как в массиве осталась только одна отметка, то берём нулевой (он же единственный) элемент в массиве и проверяем его
      // что это крестик, а не нолик, так как ходил игрок "Х"
      expect(markHtmlElements[0].getAttribute(PLAYER_MARK))
          .toBe(String(PLAYER.X));
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_X))
          .toBeTruthy();
      expect(markHtmlElements[0].innerText)
          .toBe(PLAYER_TEXT.X);
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

      expect(gameCell.getAttribute(CELL_MARK))
          .toBe(String(PLAYER.O));
      expect(gameCell.classList.contains(CELL_MARK))
          .toBeTruthy();

      markHtmlElements = gameCell.children as unknown as HTMLElement[];

      // проверяем, что отметка только одна в клетке осталась, так как мы уже сделали ход в этой клетке
      expect(markHtmlElements.length)
          .toBe(1);
      // так как в массиве осталась только одна отметка, то берём нулевой (он же единственный) элемент в массиве и проверяем его
      // что это нолик, а не крестик, так как ходил игрок "O"
      expect(markHtmlElements[0].getAttribute(PLAYER_MARK))
          .toBe(String(PLAYER.O));
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_O))
          .toBeTruthy();
      expect(markHtmlElements[0].innerText)
          .toBe(PLAYER_TEXT.O);
      expect(markHtmlElements[0].classList.contains(GAME_CELL_MARKED_X))
          .toBeFalsy();
      expect(markHtmlElements[0].classList.contains(HIDDEN))
          .toBeFalsy();
   });
});