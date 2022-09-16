import GameBoardState from "../GameBoardState/GameBoardState";
import { PLAYER } from "../GameBoardState/declaration/GameBoardState";
export declare function addListenerForChangeMaxWinStreak(playingFieldDimension: HTMLInputElement, winningStreakDimension: HTMLInputElement): void;
export declare function initializeSettingsFormFromLocalStorage(playingFieldDimension: HTMLInputElement, winningStreakDimension: HTMLInputElement, gameBoardState: GameBoardState): void;
export declare function addListenerForButtonStartGame(buttonStartGame: HTMLElement, gameBoardHtmlElement: HTMLElement, gameBoardState: GameBoardState): void;
export declare function choiceRadioButtonFromFirstPlayerWalks(player: PLAYER.X | PLAYER.O): void;
