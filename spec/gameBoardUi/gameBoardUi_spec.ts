'use strict'

import {
   createCell,
   createCellHtmlElement,
   fillGameBoardHtmlElement, crossOutWinningLine, getGameBoardCellsArray,
   markCell,
} from "../../src/gameBoardUi/gameBoardUi";
import {
   CELL,
   CELL_MARK,
   CELL_MARK_O,
   CELL_MARK_X,
   CELL_VICTORY_LINE, CELL_VICTORY_LINE_DIAGONAL_LEFT, CELL_VICTORY_LINE_DIAGONAL_RIGHT,
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
} from "../../src/consts";
import {
   COORDINATE,
   ICoordinate,
   IWinnerInformation,
   ORIENTATION,
   PLAYER
} from "../../src/GameBoardState/declaration/GameBoardState";
import GameBoardState from "../../src/GameBoardState/GameBoardState";

describe('gameBoardUi', () => {
   const gameBoardHtmlElement = document.createElement('div');

   describe('createGameBoardUi', () => {
      it('Create new Game (move player X)', () => {
         const gameBoardState = new GameBoardState({ size: 5, firstPlayerWalks: PLAYER.X });

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_X))
             .toBeTruthy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.getAttribute(DISABLE))
             .toBeNull()
         ;
         expect(gameBoardHtmlElement.classList.contains(DISABLE))
             .toBeFalsy()
         ;
      });

      it('Create new Game (move player O)', () => {
         const gameBoardState = new GameBoardState({ size: 5, firstPlayerWalks: PLAYER.O });

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.getAttribute(DISABLE))
             .toBeNull()
         ;
         expect(gameBoardHtmlElement.classList.contains(DISABLE))
             .toBeFalsy()
         ;

         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_O))
             .toBeTruthy()
         ;
      });

      it('Create new Game (winner player O)', () => {
         const gameBoardState = new GameBoardState({ size: 3, firstPlayerWalks: PLAYER.O });

         gameBoardState.addMark({x: 1, y: 1});
         gameBoardState.addMark({x: 1, y: 2});

         gameBoardState.addMark({x: 2, y: 1});
         gameBoardState.addMark({x: 2, y: 2});

         gameBoardState.addMark({x: 3, y: 1});

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_O))
             .toBeTruthy()
         ;
         expect(gameBoardHtmlElement.getAttribute(DISABLE))
             .toBe(DISABLE)
         ;
         expect(gameBoardHtmlElement.classList.contains(DISABLE))
             .toBeTruthy()
         ;
      });

      it('Create new Game (winner player X)', () => {
         const gameBoardState = new GameBoardState({ size: 3, firstPlayerWalks: PLAYER.X });

         gameBoardState.addMark({x: 1, y: 1});
         gameBoardState.addMark({x: 1, y: 2});
         gameBoardState.addMark({x: 2, y: 1});
         gameBoardState.addMark({x: 2, y: 2});
         gameBoardState.addMark({x: 3, y: 1});

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.getAttribute(DISABLE))
             .toBe(DISABLE)
         ;
         expect(gameBoardHtmlElement.classList.contains(DISABLE))
             .toBeTruthy()
         ;

         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_X))
             .toBeTruthy()
         ;
      });

      it('Create new Game (winner draw)', () => {
         const gameBoardState = new GameBoardState({ size: 3, firstPlayerWalks: PLAYER.X });

         gameBoardState.addMark({x: 1, y: 1});
         gameBoardState.addMark({x: 1, y: 2});

         gameBoardState.addMark({x: 2, y: 1});
         gameBoardState.addMark({x: 2, y: 2});

         gameBoardState.addMark({x: 3, y: 2});
         gameBoardState.addMark({x: 3, y: 1});

         gameBoardState.addMark({x: 1, y: 3});
         gameBoardState.addMark({x: 2, y: 3});

         gameBoardState.addMark({x: 3, y: 3});

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(MOVE_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_O))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.classList.contains(WINNER_GAMER_X))
             .toBeFalsy()
         ;
         expect(gameBoardHtmlElement.getAttribute(DISABLE))
             .toBe(DISABLE)
         ;
         expect(gameBoardHtmlElement.classList.contains(DISABLE))
             .toBeTruthy()
         ;

         expect(gameBoardHtmlElement.classList.contains(DRAW))
             .toBeTruthy()
         ;
      });
   });

   describe('createGameBoardCells', () => {
      it('Create new Game', () => {
         const gameBoardState = new GameBoardState({size: 5, firstPlayerWalks: PLAYER.X});
         const {
            board,
            size,
            playerWalks,
            winnerInformation
         } = gameBoardState;
         const {
            winner,
         } = winnerInformation;
         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );
         const gameBoardRows = gameBoardHtmlElement.children as unknown as HTMLElement[];

         for (let y = 1; y <= size; y++) {
            for (let x = 1; x <= size; x++) {
               const currentCell = gameBoardRows[y - 1].children[x - 1] as HTMLElement;
               const currentCoordinateCell_X = currentCell.getAttribute(COORDINATE.X);
               const currentCoordinateCell_Y = currentCell.getAttribute(COORDINATE.Y);
               const cellAttribute = currentCell.getAttribute(CELL);



               const markHtmlElements = currentCell.children as unknown as HTMLElement[];

               // проверяем, что в массиве 2 отметки
               expect(markHtmlElements.length)
                   .toBe(2);

               // первым элементом в массиве находится отметка "Х"
               const mark_X = markHtmlElements[0];

               expect(mark_X.getAttribute(PLAYER_MARK))
                   .toBe(String(PLAYER.X));
               expect(mark_X.classList.contains(MARK_X))
                   .toBeTruthy();
               expect(mark_X.innerText)
                   .toBe(PLAYER.X);
               expect(mark_X.classList.contains(MARK_O))
                   .toBeFalsy();
               expect(mark_X.classList.contains(HIDDEN))
                   .toBeTruthy();

               // вторым элементом в массиве находится отметка "O"
               const mark_O = markHtmlElements[1];

               expect(mark_O.getAttribute(PLAYER_MARK))
                   .toBe(String(PLAYER.O));
               expect(mark_O.classList.contains(MARK_O))
                   .toBeTruthy();
               expect(mark_O.innerText)
                   .toBe(PLAYER.O);
               expect(mark_O.classList.contains(MARK_X))
                   .toBeFalsy();
               expect(mark_O.classList.contains(HIDDEN))
                   .toBeTruthy();


               expect(currentCoordinateCell_X)
                   .toBe(String(x))
               ;
               expect(currentCoordinateCell_Y)
                   .toBe(String(y))
               ;
               expect(currentCell.getAttribute(CELL_MARK))
                   .toBeNull()
               ;
               expect(cellAttribute)
                   .toBe(CELL)
               ;
            }
         }

         expect(gameBoardRows.length)
             .toBe(size);
         expect(gameBoardRows[0].children.length)
             .toBe(size);
      });

      it('Create continue Game', () => {
         const gameBoardState = new GameBoardState({size: 5, firstPlayerWalks: PLAYER.X});

         gameBoardState.addMark({ x: 1, y: 1 });
         gameBoardState.addMark({ x: 4, y: 5 });

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         const gameBoardRows = gameBoardHtmlElement.children as unknown as HTMLElement[];

         for (let y = 1; y <= gameBoardRows.length; y++) {
            for (let x = 1; x <= gameBoardRows.length; x++) {
               const currentCell = gameBoardRows[y - 1].children[x - 1] as HTMLElement;
               const currentCoordinateCell_X = currentCell.getAttribute(COORDINATE.X);
               const currentCoordinateCell_Y = currentCell.getAttribute(COORDINATE.Y);

               // проверили координаты
               expect(currentCoordinateCell_X).toBe(String(x));
               expect(currentCoordinateCell_Y).toBe(String(y));

               const markHtmlElements = currentCell.children as unknown as HTMLElement[];

               if (x === 1 && y === 1) {
                  expect(markHtmlElements.length)
                      .toBe(1);

                  const mark_X = markHtmlElements[0];

                  expect(mark_X.getAttribute(PLAYER_MARK))
                      .toBe(String(PLAYER.X));
                  expect(mark_X.classList.contains(MARK_X))
                      .toBeTruthy();
                  expect(mark_X.innerText)
                      .toBe(PLAYER.X);
                  expect(mark_X.classList.contains(MARK_O))
                      .toBeFalsy();
                  expect(mark_X.classList.contains(HIDDEN))
                      .toBeFalsy();

                  expect(currentCell.getAttribute(CELL_MARK))
                      .toBe(PLAYER.X)
                  ;

                  continue;
               }

               if (x === 4 && y === 5) {
                  expect(markHtmlElements.length)
                      .toBe(1);

                  const mark_O = markHtmlElements[0];

                  expect(mark_O.getAttribute(PLAYER_MARK))
                      .toBe(String(PLAYER.O));
                  expect(mark_O.classList.contains(MARK_O))
                      .toBeTruthy();
                  expect(mark_O.innerText)
                      .toBe(PLAYER.O);
                  expect(mark_O.classList.contains(MARK_X))
                      .toBeFalsy();
                  expect(mark_O.classList.contains(HIDDEN))
                      .toBeFalsy();

                  expect(currentCell.getAttribute(CELL_MARK))
                      .toBe(PLAYER.O)
                  ;

                  continue;
               }

               // проверяем, что в массиве 2 отметки
               expect(markHtmlElements.length)
                   .toBe(2);

               // первым элементом в массиве находится отметка "Х"
               const mark_X = markHtmlElements[0];

               expect(mark_X.getAttribute(PLAYER_MARK))
                   .toBe(String(PLAYER.X));
               expect(mark_X.classList.contains(MARK_X))
                   .toBeTruthy();
               expect(mark_X.innerText)
                   .toBe(PLAYER.X);
               expect(mark_X.classList.contains(MARK_O))
                   .toBeFalsy();
               expect(mark_X.classList.contains(HIDDEN))
                   .toBeTruthy();

               // вторым элементом в массиве находится отметка "O"
               const mark_O = markHtmlElements[1];

               expect(mark_O.getAttribute(PLAYER_MARK))
                   .toBe(String(PLAYER.O));
               expect(mark_O.classList.contains(MARK_O))
                   .toBeTruthy();
               expect(mark_O.innerText)
                   .toBe(PLAYER.O);
               expect(mark_O.classList.contains(MARK_X))
                   .toBeFalsy();
               expect(mark_O.classList.contains(HIDDEN))
                   .toBeTruthy();

               expect(currentCell.getAttribute(CELL_MARK))
                   .toBeNull()
               ;
            }
         }

         expect(gameBoardRows.length)
             .toBe(gameBoardState.size);
         expect(gameBoardRows[0].children.length)
             .toBe(gameBoardState.size);
      });
   });

   describe('Add mark for cell', () => {
      it('Mark X', () => {
         const cell = createCell({x: 1, y: 1});

         expect(cell.getAttribute(CELL_MARK))
             .toBeNull()
         ;
         expect(cell.classList.contains(CELL_MARK_X))
             .toBeFalsy()
         ;
         expect(cell.classList.contains(CELL_MARK_O))
             .toBeFalsy()
         ;

         markCell(cell, PLAYER.X);

         const cellMarks = [...cell?.children as unknown as HTMLElement[]];

         expect(cell.getAttribute(CELL_MARK))
             .toBe(PLAYER.X)
         ;
         expect(cell.classList.contains(CELL_MARK_X))
             .toBeTruthy()
         ;
         expect(cell.classList.contains(CELL_MARK_O))
             .toBeFalsy()
         ;

         expect(cellMarks.length)
             .toBe(1)
         ;

         const mark_X = cellMarks[0];

         expect(mark_X.getAttribute(PLAYER_MARK))
             .toBe(PLAYER.X)
         ;
         expect(mark_X.classList.contains(MARK_X))
             .toBeTruthy()
         ;
         expect(mark_X.innerText)
             .toBe(PLAYER.X)
         ;
         expect(mark_X.classList.contains(MARK_O))
             .toBeFalsy()
         ;
         expect(mark_X.classList.contains(HIDDEN))
             .toBeFalsy()
         ;
      });

      it('Mark O', () => {
         const cell = createCell({x: 1, y: 1});

         expect(cell.getAttribute(CELL_MARK))
             .toBeNull()
         ;
         expect(cell.classList.contains(CELL_MARK_X))
             .toBeFalsy()
         ;
         expect(cell.classList.contains(CELL_MARK_O))
             .toBeFalsy()
         ;

         markCell(cell, PLAYER.O);

         const cellMarks = [...cell?.children as unknown as HTMLElement[]];

         expect(cellMarks.length)
             .toBe(1)
         ;

         expect(cell.getAttribute(CELL_MARK))
             .toBe(PLAYER.O)
         ;
         expect(cell.classList.contains(CELL_MARK_O))
             .toBeTruthy()
         ;
         expect(cell.classList.contains(CELL_MARK_X))
             .toBeFalsy()
         ;


         expect(cellMarks.length)
             .toBe(1)
         ;

         const mark_O = cellMarks[0];

         expect(mark_O.getAttribute(PLAYER_MARK))
             .toBe(PLAYER.O)
         ;
         expect(mark_O.classList.contains(MARK_O))
             .toBeTruthy()
         ;
         expect(mark_O.innerText)
             .toBe(PLAYER.O)
         ;
         expect(mark_O.classList.contains(MARK_X))
             .toBeFalsy()
         ;
         expect(mark_O.classList.contains(HIDDEN))
             .toBeFalsy()
         ;
      });
   });

   describe('crossOutWinningLine', () => {
      it('crossOutWinningLine', () => {
         const gameBoardState = new GameBoardState({ size: 3, firstPlayerWalks: PLAYER.X });
         let winningLine: ICoordinate[] | void = void 0;
         let winnerDirectionLine: ORIENTATION | void = void 0;

         gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
            winningLine = winnerInformation.winningLine;
            winnerDirectionLine = winnerInformation.winnerDirectionLine;
         });

         gameBoardState.addMark({ x: 1, y: 1 });
         gameBoardState.addMark({ x: 2, y: 2 });

         gameBoardState.addMark({ x: 1, y: 2 });
         gameBoardState.addMark({ x: 2, y: 3 });

         gameBoardState.addMark({ x: 1, y: 3 });

         fillGameBoardHtmlElement(
             gameBoardHtmlElement,
             gameBoardState,
         );

         // @ts-ignore
         if (!winningLine|| !winnerDirectionLine) {
            throw new Error('winningLine || !winnerDirectionLine');
         }

         if (winningLine && winnerDirectionLine) {
            crossOutWinningLine(gameBoardHtmlElement, winningLine, winnerDirectionLine);
            const cellsArray = getGameBoardCellsArray(gameBoardHtmlElement);

            for (const cellsRows of cellsArray) {
               for (const cellHtmlElement of cellsRows) {
                  const coordinateCell_X = Number(cellHtmlElement.getAttribute(COORDINATE.X)) - 1;
                  const coordinateCell_Y = Number(cellHtmlElement.getAttribute(COORDINATE.Y)) - 1;

                  const isWinningCell = (winningLine as ICoordinate[]).find(({ y, x }: ICoordinate) => y === coordinateCell_Y && x === coordinateCell_X);

                  if (isWinningCell) {
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE))
                         .toBeTruthy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIRECTION_VERTICAL))
                         .toBeTruthy()
                     ;

                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIRECTION_HORIZONTAL))
                         .toBeFalsy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIAGONAL_RIGHT))
                         .toBeFalsy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIAGONAL_LEFT))
                         .toBeFalsy()
                     ;
                  }
                  else {
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE))
                         .toBeFalsy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIRECTION_HORIZONTAL))
                         .toBeFalsy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIRECTION_VERTICAL))
                         .toBeFalsy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIAGONAL_RIGHT))
                         .toBeFalsy()
                     ;
                     expect(cellHtmlElement.classList.contains(CELL_VICTORY_LINE_DIAGONAL_LEFT))
                         .toBeFalsy()
                     ;
                  }
               }
            }
         }
      });
   });
});
