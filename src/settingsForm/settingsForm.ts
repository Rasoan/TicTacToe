'use strict';

import {
    LocalStorageKeys,
    getValueForLocalStorage,
    setValueForLocalStorage,
} from "../localStorage/localStorage";
import {PLAYING_FIELD_DIMENSION_ID, WINNING_STREAK_DIMENSION_ID} from "../constants/constants";
import GameBoardState from "../GameBoardState/GameBoardState";
import {fillGameBoardHtmlElement, handleStartGame} from "../gameBoardUi/gameBoardUi";
import {PLAYER} from "../GameBoardState/declaration/GameBoardState";

export function addListenerForChangeMaxWinStreak(
    playingFieldDimension: HTMLInputElement,
    winningStreakDimension: HTMLInputElement,
): void {
    playingFieldDimension.addEventListener('change', (event: Event) => {
        const playingFieldDimensionValue: string = (event.target as HTMLInputElement).value;

        winningStreakDimension.setAttribute('max', playingFieldDimensionValue);
    });
}

export function initializeSettingsFormFromLocalStorage(
    playingFieldDimension: HTMLInputElement,
    winningStreakDimension: HTMLInputElement,
    gameBoardState: GameBoardState,
) {
    const {
        size: playingFieldDimensionValue,
        winningStreak: winningStreakDimensionValue,
    } = gameBoardState;

    playingFieldDimension.setAttribute('value', String(playingFieldDimensionValue));
    winningStreakDimension.setAttribute('value', String(winningStreakDimensionValue));
    winningStreakDimension.setAttribute('max', String(playingFieldDimensionValue));
}


export function addListenerForHtmlForm(
    settingsForm: HTMLElement,
    gameBoardHtmlElement: HTMLElement,
    gameBoardState: GameBoardState,
): void {
    settingsForm.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();

        const playingFieldDimension = document.getElementById(PLAYING_FIELD_DIMENSION_ID) as HTMLInputElement | null;
        const winningStreakDimension = document.getElementById(WINNING_STREAK_DIMENSION_ID) as HTMLInputElement | null;

        if (!playingFieldDimension || !winningStreakDimension) {
            throw new Error('playingFieldDimension || winningStreakDimension is not defined');
        }

        const size = Number(playingFieldDimension.value);
        const winningStreak = Number(winningStreakDimension.value);

        gameBoardState.start({
            size,
            winningStreak,
        });

        handleStartGame(gameBoardHtmlElement, gameBoardState)
    });
}