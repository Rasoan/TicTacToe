'use strict';

import {
    PLAYING_FIELD_DIMENSION_ID, RESET_STATISTICS_BUTTON_ID,
    RESTART_GAME_BUTTON_ID,
    ROOT_ID,
    START_GAME_BUTTON_ID,
    WINNING_STREAK_DIMENSION_ID,
} from "./src/constants/constants";
import {
    addListenerForChangeMaxWinStreak,
    addListenerForButtonStartGame,
    initializeSettingsFormFromLocalStorage, choiceRadioButtonFromFirstPlayerWalks,
} from "./src/Settings/Settings";
import {
    fillGameBoardHtmlElement,
    handleEndGame,
    handleReloadGame,
    onClickGameBoard,
} from "./src/gameBoardUi/gameBoardUi";

import './src/style.scss';
import {IWinnerInformation, PLAYER} from "./src/GameBoardState/declaration/GameBoardState";
import GameBoardState from "./src/GameBoardState/GameBoardState";
import {getValueForLocalStorage, LocalStorageKeys} from "./src/localStorage/localStorage";
import {handleResetStatistics, updateStatisticInformation} from "./src/statisticInfo/statisticInfo";

{
    const playingFieldDimension = document.getElementById(PLAYING_FIELD_DIMENSION_ID) as HTMLInputElement | null;
    const winningStreakDimension = document.getElementById(WINNING_STREAK_DIMENSION_ID) as HTMLInputElement | null;
    const buttonReloadGame = document.getElementById(RESTART_GAME_BUTTON_ID) as HTMLElement | null;
    const buttonStartGame = document.getElementById(START_GAME_BUTTON_ID) as HTMLElement | null;
    const buttonResetStatistics = document.getElementById(RESET_STATISTICS_BUTTON_ID) as HTMLElement | null;
    const rootElement = document.getElementById(ROOT_ID) as HTMLElement | null;

    let gameBoardHtmlElement = document.createElement('div');

    const gameBoardStateJSON = getValueForLocalStorage(LocalStorageKeys.gameBoardStateKey);

    let gameBoardState = gameBoardStateJSON
        ? GameBoardState.fromJSON(gameBoardStateJSON)
        : new GameBoardState({firstPlayerWalks: PLAYER.X, size: 3, winningStreak: 3})
    ;

    const {
        winnerInformation,
        firstPlayerWalks,
    } = gameBoardState;
    const {
        statistics,
    } = winnerInformation;
    const {
        countWin_x,
        countWin_o,
        countDraw,
    } = statistics;

    updateStatisticInformation(
        String(countWin_x),
        String(countWin_o),
        String(countDraw),
    );

    choiceRadioButtonFromFirstPlayerWalks(firstPlayerWalks);

    if (playingFieldDimension && winningStreakDimension) {
        initializeSettingsFormFromLocalStorage(
            playingFieldDimension,
            winningStreakDimension,
            gameBoardState,
        );
    } else {
        console.error('playingFieldDimension of winningStreakDimension is not defined!')
    }

    if (playingFieldDimension && winningStreakDimension) {
        addListenerForChangeMaxWinStreak(playingFieldDimension, winningStreakDimension);
    } else {
        console.error('playingFieldDimension or winningStreakDimension is not defined!');
    }

    if (buttonStartGame) {
        addListenerForButtonStartGame(
            buttonStartGame,
            gameBoardHtmlElement,
            gameBoardState,
        );
    } else {
        console.error('buttonStartGame is not defined!');
    }

    fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState);

    gameBoardHtmlElement.addEventListener('click', function (event) {
        onClickGameBoard.call(this, event, gameBoardState);
    });

    gameBoardState.subscribeToEndGame(
        (winnerInformation: IWinnerInformation) => handleEndGame(gameBoardHtmlElement, winnerInformation)
    );

    buttonReloadGame?.addEventListener('click', () => handleReloadGame(gameBoardHtmlElement, gameBoardState));
    buttonResetStatistics?.addEventListener('click', () => handleResetStatistics(gameBoardState));

    if (rootElement) {
        rootElement.appendChild(gameBoardHtmlElement);
    }
    else {
        console.error('rootElement is not defined!');
    }
}