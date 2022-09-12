'use strict';

import {
    PLAYING_FIELD_DIMENSION_ID, RELOAD_GAME_BUTTON_ID, ROOT_ID,
    SETTINGS_FORM_ID, START_GAME_BUTTON_ID,
    WINNING_STREAK_DIMENSION_ID,
} from "./src/constants/constants";
import {
    addListenerForChangeMaxWinStreak,
    addListenerForHtmlForm,
    initializeSettingsFormFromLocalStorage,
} from "./src/SettingsForm/SettingsForm";
import {
    fillGameBoardHtmlElement, handleEndGame, handleReloadGame, handleStartGame, onClickGameBoard
} from "./src/gameBoardUi/gameBoardUi";

import './src/style.scss';
import {IWinnerInformation, PLAYER} from "./src/GameBoardState/declaration/GameBoardState";
import GameBoardState from "./src/GameBoardState/GameBoardState";
import {getValueForLocalStorage, LocalStorageKeys} from "./src/localStorage/localStorage";

{
    const playingFieldDimension = document.getElementById(PLAYING_FIELD_DIMENSION_ID) as HTMLInputElement | null;
    const winningStreakDimension = document.getElementById(WINNING_STREAK_DIMENSION_ID) as HTMLInputElement | null;
    const settingsForm = document.getElementById(SETTINGS_FORM_ID) as HTMLFormElement | null;
    const buttonReloadGame = document.getElementById(RELOAD_GAME_BUTTON_ID) as HTMLElement | null;
    const rootElement = document.getElementById(ROOT_ID) as HTMLElement | null;

    let gameBoardHtmlElement = document.createElement('div');

    const gameBoardStateJSON = getValueForLocalStorage(LocalStorageKeys.gameBoardStateKey);

    let gameBoardState = gameBoardStateJSON
        ? GameBoardState.fromJSON(gameBoardStateJSON)
        : new GameBoardState({firstPlayerWalks: PLAYER.X, size: 3, winningStreak: 3})
    ;

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

    if (settingsForm) {
        addListenerForHtmlForm(
            settingsForm,
            gameBoardHtmlElement,
            gameBoardState,
        );
    } else {
        console.error('settingsForm is not defined!');
    }

    fillGameBoardHtmlElement(gameBoardHtmlElement, gameBoardState);

    gameBoardHtmlElement.addEventListener('click', function (event) {
        onClickGameBoard.call(this, event, gameBoardState);
    });

    gameBoardState.subscribeToEndGame(
        (winnerInformation: IWinnerInformation) => handleEndGame(gameBoardHtmlElement, winnerInformation)
    );

    buttonReloadGame?.addEventListener('click', () => handleReloadGame(gameBoardHtmlElement, gameBoardState));

    if (rootElement) {
        rootElement.appendChild(gameBoardHtmlElement);
    }
    else {
        console.error('rootElement is not defined!');
    }
}