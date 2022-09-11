'use strict';

import {
    LocalStorageKeys,
    getValueForLocalStorage,
    setValueForLocalStorage,
} from "../localStorage/localStorage";

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
) {
    const playingFieldDimensionValue = getValueForLocalStorage(LocalStorageKeys.playingFieldDimension);
    const winningStreakDimensionValue = getValueForLocalStorage(LocalStorageKeys.winningStreakDimension);

    playingFieldDimension.setAttribute('value', String(playingFieldDimensionValue));
    winningStreakDimension.setAttribute('value', String(winningStreakDimensionValue));
    winningStreakDimension.setAttribute('max', String(playingFieldDimensionValue));
}

function _setSettingsInLocalStorage(
    playingFieldDimension: HTMLInputElement,
    winningStreakDimension: HTMLInputElement,
): void {
    const playingFieldDimensionValue = playingFieldDimension?.value;
    const winningStreakDimensionValue = winningStreakDimension?.value;

    setValueForLocalStorage(
        LocalStorageKeys.playingFieldDimension,
        playingFieldDimensionValue,
    );

    setValueForLocalStorage(
        LocalStorageKeys.winningStreakDimension,
        winningStreakDimensionValue,
    );
}

export function addListenerForStartGame(
    settingsForm: HTMLElement,
    playingFieldDimension: HTMLInputElement,
    winningStreakDimension: HTMLInputElement,
): void {
    settingsForm.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();

        _setSettingsInLocalStorage(playingFieldDimension, winningStreakDimension);
    });
}