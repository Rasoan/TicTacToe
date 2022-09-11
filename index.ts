'use strict';

import {
    PLAYING_FIELD_DIMENSION_ID,
    ROOT_ID,
    SETTINGS_FORM_ID,
    WINNING_STREAK_DIMENSION_ID,
} from "./src/constants/constants";
import {
    addListenerForChangeMaxWinStreak,
    addListenerForStartGame,
    initializeSettingsFormFromLocalStorage,
} from "./src/SettingsForm/SettingsForm";
import {
    createGameBoardHtmlElement, handleEndGame, onClickGameBoard
} from "./src/gameBoardUi/gameBoardUi";

import './src/style.scss';
import {PLAYER} from "./src/GameBoardState/declaration/GameBoardState";
import GameBoardState from "./src/GameBoardState/GameBoardState";
import {getValueForLocalStorage, LocalStorageKeys} from "./src/localStorage/localStorage";

{
    const rootElement = document.getElementById(ROOT_ID) as HTMLElement | null;
    const playingFieldDimension = document.getElementById(PLAYING_FIELD_DIMENSION_ID) as HTMLInputElement | null;
    const winningStreakDimension = document.getElementById(WINNING_STREAK_DIMENSION_ID) as HTMLInputElement | null;
    const settingsForm = document.getElementById(SETTINGS_FORM_ID) as HTMLFormElement | null;

    if (playingFieldDimension && winningStreakDimension) {
        initializeSettingsFormFromLocalStorage(playingFieldDimension, winningStreakDimension);
    } else {
        console.error('playingFieldDimension of winningStreakDimension is not defined!')
    }

    if (playingFieldDimension && winningStreakDimension) {
        addListenerForChangeMaxWinStreak(playingFieldDimension, winningStreakDimension);
    } else {
        console.error('playingFieldDimension or winningStreakDimension is not defined!');
    }

    if (settingsForm && playingFieldDimension && winningStreakDimension) {
        addListenerForStartGame(
            settingsForm,
            playingFieldDimension,
            winningStreakDimension,
        );
    } else {
        console.error('settingsForm or playingFieldDimension or winningStreakDimension is not defined!');
    }

    const gameBoardStateJSON = getValueForLocalStorage(LocalStorageKeys.gameBoardStateKey);

    let gameBoardState = gameBoardStateJSON
        ? GameBoardState.fromJSON(gameBoardStateJSON)
        : new GameBoardState({firstPlayerWalks: PLAYER.X, size: 3, winningStreak: 3})
    ;

    const gameBoard = createGameBoardHtmlElement(gameBoardState);

    gameBoard.addEventListener('click', function (event) {
        onClickGameBoard.call(this, event, gameBoardState);
    });

    gameBoardState.subscribeToEndGame(handleEndGame);

    if (rootElement) {
        rootElement.appendChild(gameBoard);
    }
    else {
        console.error('rootElement is not defined!');
    }
}