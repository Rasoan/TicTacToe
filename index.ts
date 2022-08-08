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
import {getGameBoard} from "./src/gameBoard/gameBoard";

{
    const rootElement = document.getElementById(ROOT_ID) as HTMLElement | null;
    const playingFieldDimension = document.getElementById(PLAYING_FIELD_DIMENSION_ID) as HTMLInputElement | null;
    const winningStreakDimension = document.getElementById(WINNING_STREAK_DIMENSION_ID) as HTMLInputElement | null;
    const settingsForm = document.getElementById(SETTINGS_FORM_ID) as HTMLFormElement | null;


    initializeSettingsFormFromLocalStorage(playingFieldDimension, winningStreakDimension);

    addListenerForChangeMaxWinStreak(playingFieldDimension, winningStreakDimension);

    addListenerForStartGame(
        settingsForm,
        playingFieldDimension,
        winningStreakDimension,
    );

    const gameBoard = getGameBoard(3);

    if (rootElement) {
        rootElement.appendChild(gameBoard);
    }
}