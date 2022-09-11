'use strict'

import GameBoardState from "../../src/GameBoardState/GameBoardState";
import type {IMarkInformation, IWinnerInformation} from "../../src/GameBoardState/declaration/GameBoardState";
import {ORIENTATION, PLAYER, WINNER} from "../../src/GameBoardState/declaration/GameBoardState";

describe('GameBoardState', () => {
    describe('constructor', () => {
        it('default initialize board', () => {
            let gameBoardState = new GameBoardState();

            expect(gameBoardState.countSteps)
                .toBe(0)
            ;
            expect(gameBoardState.playerWalks)
                .toBe(PLAYER.X)
            ;
            expect(gameBoardState.winningStreak)
                .toBe(3)
            ;
            expect(gameBoardState.winnerInformation)
                .toEqual({
                    winner: WINNER._UNKNOWN_,
                    winnerDirectionLine: ORIENTATION._UNKNOWN_,
                    winningLine: [],
                })
            ;
            expect(gameBoardState.size)
                .toBe(3)
            ;
            expect(gameBoardState.numberOfMoves)
                .toBe(9)
            ;

            for (const currentRow of gameBoardState.board) {
                expect(currentRow.length)
                    .toBe(3)
                ;

                for (const currentCell of currentRow) {
                    expect(currentCell)
                        .toBe(PLAYER._VOID_)
                    ;
                }
            }
        });

        it('initialize', () => {
            const expectBoard = [
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER.X, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.O, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ] as Array<PLAYER[]>;

            let gameBoardState = new GameBoardState({
                board: expectBoard,
                playerWalks: PLAYER.X,
            });

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(gameBoardState.countSteps)
                .toBe(2)
            ;
            expect(gameBoardState.playerWalks)
                .toBe(PLAYER.X)
            ;
            expect(gameBoardState.winningStreak)
                .toBe(5)
            ;
            expect(gameBoardState.winnerInformation)
                .toEqual({
                    winner: WINNER._UNKNOWN_,
                    winnerDirectionLine: ORIENTATION._UNKNOWN_,
                    winningLine: [],
                })
            ;
            expect(gameBoardState.size)
                .toBe(5)
            ;
            expect(gameBoardState.numberOfMoves)
                .toBe(25)
            ;
        });

        it('initialize with error', () => {
            let error: TypeError | void = void 0;
            const expectBoard = [
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, '123', PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.O,],
            ] as Array<PLAYER[]>;

            try {
                new GameBoardState({
                    board: expectBoard,
                    playerWalks: PLAYER.X,
                });
            } catch (ex) {
                error = ex as TypeError;
            }

            expect(error)
                .toBeDefined()
            ;
        });
    });

    describe('toJSON/fromJSON', () => {
        it('toJSON', () => {
            const expectBoard = [
                [PLAYER.O, PLAYER.X,      PLAYER.O],
                [PLAYER.O, PLAYER.X,      PLAYER.X],
                [PLAYER.O, PLAYER._VOID_, PLAYER._VOID_,],
            ] as Array<PLAYER[]>;
            const expectWinnerInformation = {
                winner: WINNER.PLAYER_O,
                winnerDirectionLine: ORIENTATION.VERTICAL,
                winningLine: [
                    {x: 0, y: 0},
                    {x: 0, y: 1},
                    {x: 0, y: 2},
                ],
            };

            const gameBoardState = new GameBoardState({
                firstPlayerWalks: PLAYER.O,
            });

            gameBoardState.addMark({x: 1, y: 1,});
            gameBoardState.addMark({x: 2, y: 1,});

            gameBoardState.addMark({x: 1, y: 2,});
            gameBoardState.addMark({x: 2, y: 2,});

            gameBoardState.addMark({x: 3, y: 1,});
            gameBoardState.addMark({x: 3, y: 2,});

            gameBoardState.addMark({x: 1, y: 3,});

            const gameBoardStateJSON = gameBoardState.toJSON();

            const expectGameBoardStateJSON = `{"board":${JSON.stringify(expectBoard)},"playerWalks":"${PLAYER.O}","winnerInformation":${JSON.stringify(expectWinnerInformation)},"winningStreak":${3},"firstPlayerWalks":"${PLAYER.O}"}`;

            expect(gameBoardStateJSON)
                .toEqual(expectGameBoardStateJSON);
        });

        it('fromJSON', () => {
            const expectBoard = [
                [PLAYER.X, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER.O, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.X,],
            ] as Array<PLAYER[]>;
            const expectWinnerInformation = {
                winner: WINNER._UNKNOWN_,
                winnerDirectionLine: ORIENTATION._UNKNOWN_,
                winningLine: [],
            };

            let gameBoardState = new GameBoardState();

            gameBoardState.addMark({x: 1, y: 1,});
            gameBoardState.addMark({x: 2, y: 2,});
            gameBoardState.addMark({x: 3, y: 3,});

            const expectFirstPlayerWalks = PLAYER.X;
            const expectPlayerWalks = PLAYER.O;
            const expectWinningStreak = 3;

            const expectGameBoardStateJSON = `{"board":${JSON.stringify(expectBoard)},"playerWalks":"${expectPlayerWalks}","winnerInformation":${JSON.stringify(expectWinnerInformation)},"winningStreak":${expectWinningStreak},"firstPlayerWalks":"${expectFirstPlayerWalks}"}`;

            gameBoardState = GameBoardState.fromJSON(expectGameBoardStateJSON);

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(gameBoardState.playerWalks)
                .toBe(expectPlayerWalks)
            ;
            expect(gameBoardState.firstPlayerWalks)
                .toBe(expectFirstPlayerWalks)
            ;
            expect(gameBoardState.winningStreak)
                .toBe(expectWinningStreak)
            ;
            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation);
        });
    });

    describe('addMark', () => {
        it('Valid mark', () => {
            let expectMarkInformation: IMarkInformation | void;
            let toBeMarkInformation: IMarkInformation | void;
            let expectBoard = [
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];
            const gameBoardState = new GameBoardState();

            expect(gameBoardState.board)
                .toEqual(expectBoard);

            expectMarkInformation = {
                playerWalks: PLAYER.X,
            };
            toBeMarkInformation = gameBoardState.addMark({x: 1, y: 1});
            expectBoard = [
                [PLAYER.X, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(toBeMarkInformation)
                .toEqual(expectMarkInformation)
            ;

            expectMarkInformation = {
                playerWalks: PLAYER.O,
            };
            toBeMarkInformation = gameBoardState.addMark({x: 3, y: 2});
            expectBoard = [
                [PLAYER.X, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.O],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(toBeMarkInformation)
                .toEqual(expectMarkInformation)
            ;

            expectMarkInformation = {
                playerWalks: PLAYER.X,
            };
            toBeMarkInformation = gameBoardState.addMark({x: 3, y: 3});

            expectBoard = [
                [PLAYER.X, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.O],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.X],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(toBeMarkInformation)
                .toEqual(expectMarkInformation)
            ;

            expectMarkInformation = {
                playerWalks: PLAYER.O,
            };
            toBeMarkInformation = gameBoardState.addMark({x: 2, y: 2});
            expectBoard = [
                [PLAYER.X, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER.O, PLAYER.O],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.X],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(toBeMarkInformation)
                .toEqual(expectMarkInformation)
            ;
        });

        it('Starts the game default player', () => {
            const gameBoardState = new GameBoardState();

            gameBoardState.addMark({x: 1, y: 1});

            const expectBoard = [
                [PLAYER.X, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
        });

        it('Starts the game player X', () => {
            const gameBoardState = new GameBoardState({firstPlayerWalks: PLAYER.X});

            gameBoardState.addMark({x: 3, y: 3});

            const expectBoard = [
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.X],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
        });

        it('Starts the game player O', () => {
            const gameBoardState = new GameBoardState({firstPlayerWalks: PLAYER.O});

            gameBoardState.addMark({x: 2, y: 3});

            const expectBoard = [
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER.O, PLAYER._VOID_],
            ];

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
        });
    });

    describe('winning combination', () => {
        it('Vertical combination (winner X, steps direction up)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 3,
                firstPlayerWalks: PLAYER.O,
                winningStreak: 3,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 1, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 1});

            const expectBoard = [
                [PLAYER.O,      PLAYER.X, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER.X, PLAYER.O],
                [PLAYER._VOID_, PLAYER.X, PLAYER.O],
            ];

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_X,
                winnerDirectionLine: ORIENTATION.VERTICAL,
                winningLine: [
                    {x: 1, y: 0},
                    {x: 1, y: 1},
                    {x: 1, y: 2},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('Vertical combination (winner O, steps direction down)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                firstPlayerWalks: PLAYER.O,
                winningStreak: 3,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 1, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 3});

            const expectBoard = [
                [PLAYER.O,      PLAYER.X,      PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER.O,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER.O,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ]

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_O,
                winnerDirectionLine: ORIENTATION.VERTICAL,
                winningLine: [
                    {x: 0, y: 0},
                    {x: 0, y: 1},
                    {x: 0, y: 2},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;
            expect(toBeError)
                .toBeUndefined()
            ;

        });

        it('horizontal combination (winner X, steps direction right)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                winningStreak: 5,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 1, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 1, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 2, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 3, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 4, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 1});

            const expectBoard = [
                [PLAYER.X, PLAYER.X, PLAYER.X, PLAYER.X, PLAYER.X],
                [PLAYER.O, PLAYER.O, PLAYER.O, PLAYER.O, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_X,
                winnerDirectionLine: ORIENTATION.HORIZONTAL,
                winningLine: [
                    {x: 0, y: 0},
                    {x: 1, y: 0},
                    {x: 2, y: 0},
                    {x: 3, y: 0},
                    {x: 4, y: 0},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('horizontal combination (winner O, steps direction left)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                winningStreak: 5,
                firstPlayerWalks: PLAYER.O,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 5, y: 4});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 1, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 4});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 5, y: 5});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 4});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 2, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 4});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 3, y: 3});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 4});

            const expectBoard = [
                [PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER.O,      PLAYER.O,      PLAYER.O,      PLAYER.O,      PLAYER.O],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X],
            ]

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_O,
                winnerDirectionLine: ORIENTATION.HORIZONTAL,
                winningLine: [
                    {x: 0, y: 3},
                    {x: 1, y: 3},
                    {x: 2, y: 3},
                    {x: 3, y: 3},
                    {x: 4, y: 3},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('diagonal (winner O, direction up right)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                firstPlayerWalks: PLAYER.O,
                winningStreak: 3,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 3, y: 3});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 1, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 1, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 1});

            const expectBoard = [
                [PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.O],
                [PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER.O,      PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.O,      PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_O,
                winnerDirectionLine: ORIENTATION.DIAGONAL_RIGHT,
                winningLine: [
                    {x: 4, y: 0},
                    {x: 3, y: 1},
                    {x: 2, y: 2},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('diagonal (winner O, direction down right)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                firstPlayerWalks: PLAYER.O,
                winningStreak: 3,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 5, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 2});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 3});

            const expectBoard = [
                [PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.O],
                [PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER.O, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.O,      PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_O,
                winnerDirectionLine: ORIENTATION.DIAGONAL_RIGHT,
                winningLine: [
                    {x: 4, y: 0},
                    {x: 3, y: 1},
                    {x: 2, y: 2},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('diagonal (winner X, direction up left)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 11,
                winningStreak: 4,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 7, y: 7});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 1, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 6, y: 6});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 2, y: 1});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 5});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            gameBoardState.addMark({x: 1, y: 11});
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 4});

            const expectBoard = [
                [PLAYER.O,      PLAYER.O,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER.O,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ];

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_X,
                winnerDirectionLine: ORIENTATION.DIAGONAL_LEFT,
                winningLine: [
                    {x: 3, y: 3},
                    {x: 4, y: 4},
                    {x: 5, y: 5},
                    {x: 6, y: 6},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('diagonal (winner X, direction down left)', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                firstPlayerWalks: PLAYER.X,
                winningStreak: 5,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 1, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 4});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 5});

            const expectBoard = [
                [PLAYER.X,      PLAYER.O,      PLAYER.O,      PLAYER.O, PLAYER.O],
                [PLAYER._VOID_, PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER.X,      PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER.X],
            ]

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.PLAYER_X,
                winnerDirectionLine: ORIENTATION.DIAGONAL_LEFT,
                winningLine: [
                    {x: 0, y: 0},
                    {x: 1, y: 1},
                    {x: 2, y: 2},
                    {x: 3, y: 3},
                    {x: 4, y: 4},
                ],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;

            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });

        it('Draw', () => {
            let toBeWinnerInformation = {} as IWinnerInformation;
            let toBeError = void 0;

            const gameBoardState = new GameBoardState({
                size: 5,
                firstPlayerWalks: PLAYER.O,
                winningStreak: 5,
            });

            gameBoardState.subscribeToEndGame((winnerInformation: IWinnerInformation) => {
                toBeWinnerInformation = winnerInformation;
            });

            gameBoardState.addMark({x: 1, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 5});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 1, y: 4});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 4});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 2, y: 5});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 4});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 3, y: 5});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;


            gameBoardState.addMark({x: 4, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 4});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 4, y: 5});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;


            gameBoardState.addMark({x: 5, y: 1});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 2});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 3});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 4});

            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;

            gameBoardState.addMark({x: 5, y: 5});

            const expectBoard = [
                [PLAYER.X, PLAYER.X, PLAYER.O, PLAYER.X, PLAYER.O],
                [PLAYER.O, PLAYER.O, PLAYER.X, PLAYER.O, PLAYER.X],
                [PLAYER.O, PLAYER.X, PLAYER.O, PLAYER.X, PLAYER.O],
                [PLAYER.O, PLAYER.O, PLAYER.X, PLAYER.O, PLAYER.X],
                [PLAYER.X, PLAYER.X, PLAYER.O, PLAYER.X, PLAYER.O]
            ];

            let expectWinnerInformation: IWinnerInformation = {
                winner: WINNER.DRAW,
                winnerDirectionLine: ORIENTATION._UNKNOWN_,
                winningLine: [],
            };

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(expectWinnerInformation)
                .toEqual(toBeWinnerInformation)
            ;

            expect(gameBoardState.winnerInformation)
                .toEqual(expectWinnerInformation)
            ;

            expect(toBeError)
                .toBeUndefined()
            ;
        });
    });

    describe('Restart game', () => {
        it('Restart game', () => {
            const expectPlayerWalks = PLAYER.O;
            const expectFirstPlayerWalks = PLAYER.O;
            const expectWinningStreak = 5;
            const expectWinner = WINNER._UNKNOWN_;
            const expectCountSteps = 0;
            const expectSize = 5;
            const expectNumberOfMoves = 25;

            const expectBoard = [
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
            ] as Array<PLAYER[]>;

            let gameBoardState = new GameBoardState({
                firstPlayerWalks: PLAYER.O,
                size: 5,
                winningStreak: 5,
            });

            gameBoardState.addMark({x: 1, y: 1,});
            gameBoardState.addMark({x: 2, y: 1,});
            gameBoardState.addMark({x: 3, y: 1,});
            gameBoardState.addMark({x: 4, y: 1,});
            gameBoardState.addMark({x: 5, y: 1,});

            gameBoardState.addMark({x: 1, y: 2,});
            gameBoardState.addMark({x: 2, y: 2,});
            gameBoardState.addMark({x: 3, y: 2,});
            gameBoardState.addMark({x: 4, y: 2,});

            gameBoardState.restartGameBoard();

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(gameBoardState.playerWalks)
                .toBe(expectPlayerWalks)
            ;
            expect(gameBoardState.firstPlayerWalks)
                .toBe(expectFirstPlayerWalks)
            ;
            expect(gameBoardState.winningStreak)
                .toBe(expectWinningStreak)
            ;
            expect(gameBoardState.winnerInformation.winner)
                .toBe(expectWinner)
            ;
            expect(gameBoardState.countSteps)
                .toBe(expectCountSteps)
            ;
            expect(gameBoardState.size)
                .toBe(expectSize)
            ;
            expect(gameBoardState.numberOfMoves)
                .toBe(expectNumberOfMoves)
            ;
        });
    });

    describe('Continued the game after reloading the page', () => {
        it('Continue game', () => {
            let gameBoardState = new GameBoardState({
                firstPlayerWalks: PLAYER.O,
            });

            gameBoardState.addMark({x: 1, y: 1,});
            gameBoardState.addMark({x: 2, y: 1,});
            gameBoardState.addMark({x: 3, y: 1,});

            const gameBoardStateJSON = gameBoardState.toJSON();

            gameBoardState = GameBoardState.fromJSON(gameBoardStateJSON);

            gameBoardState.addMark({x: 1, y: 3,});
            gameBoardState.addMark({x: 2, y: 3,});
            gameBoardState.addMark({x: 3, y: 3,});

            const expectBoard = [
                [PLAYER.O, PLAYER.X, PLAYER.O],
                [PLAYER._VOID_, PLAYER._VOID_, PLAYER._VOID_],
                [PLAYER.X, PLAYER.O, PLAYER.X,],
            ] as Array<PLAYER[]>;

            expect(gameBoardState.board)
                .toEqual(expectBoard)
            ;
            expect(gameBoardState.countSteps)
                .toBe(6)
            ;
            expect(gameBoardState.playerWalks)
                .toBe(PLAYER.O)
            ;
            expect(gameBoardState.winningStreak)
                .toBe(3)
            ;
            expect(gameBoardState.winnerInformation.winner)
                .toBe(WINNER._UNKNOWN_)
            ;
            expect(gameBoardState.size)
                .toBe(3)
            ;
            expect(gameBoardState.numberOfMoves)
                .toBe(9)
            ;
        });
    });

    describe('Handle move subscriber (error property)', () => {
        it('Put a not valid mark', () => {
            const gameBoardState = new GameBoardState({size: 3, winningStreak: 3});

            let toBeError = void 0;

            gameBoardState.addMark({x: 1, y: 1});
            expect(toBeError)
                .toBeUndefined()
            ;

            {
                try {
                    gameBoardState.addMark({x: 1, y: 1});
                } catch (err: any) {
                    toBeError = err;
                }

                expect(toBeError)
                    .toBeDefined()
                ;

                toBeError = void 0;
            }

            {
                try {
                    gameBoardState.addMark({x: -1, y: 100});
                } catch (err: any) {
                    toBeError = err;
                }

                expect(toBeError)
                    .toBeDefined()
                ;

                toBeError = void 0;
            }

            {
                try {
                    gameBoardState.addMark({x: 33, y: 34});
                } catch (err: any) {
                    toBeError = err;
                }

                expect(toBeError)
                    .toBeDefined()
                ;

                toBeError = void 0;
            }

            {
                try {
                    gameBoardState.addMark({x: 34, y: 33});
                } catch (err: any) {
                    toBeError = err;
                }

                expect(toBeError)
                    .toBeDefined()
                ;

                toBeError = void 0;
            }


            {
                try {
                    gameBoardState.addMark({x: 0, y: 0});
                } catch (err: any) {
                    toBeError = err;
                }

                expect(toBeError)
                    .toBeDefined()
                ;

                toBeError = void 0;
            }

            {
                try {
                    gameBoardState.addMark({x: -1, y: 25});
                } catch (err: any) {
                    toBeError = err;
                }

                expect(toBeError)
                    .toBeDefined()
                ;
            }
        });
    })
});
