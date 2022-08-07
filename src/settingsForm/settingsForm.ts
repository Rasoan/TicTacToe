'use strict';

import {
    LocalStorageKeys,
    getValueForLocalStorage,
    setValueForLocalStorage,
} from "../localStorage/localStorage";

export function addListenerForChangeMaxWinStreak(
    playingFieldDimension: HTMLElement | null,
    winningStreakDimension: HTMLElement | null,
): void {
    if (playingFieldDimension) {
        playingFieldDimension.addEventListener('change', (event: Event) => {
            const playingFieldDimensionValue: string = (event?.target as HTMLInputElement).value;

            if (winningStreakDimension) {
                winningStreakDimension.setAttribute('max', playingFieldDimensionValue);
            }
            else {
                console.error('winningStreakDimension is not defined!');
            }
        });
    }
    else {
        console.error('playingFieldDimension is not defined!');
    }
}

export function initializeSettingsFormFromLocalStorage(
    playingFieldDimension: HTMLInputElement | null,
    winningStreakDimension: HTMLInputElement | null,
) {
    const playingFieldDimensionValue = getValueForLocalStorage(LocalStorageKeys.playingFieldDimension);
    const winningStreakDimensionValue = getValueForLocalStorage(LocalStorageKeys.winningStreakDimension);

    if (playingFieldDimension && playingFieldDimensionValue) {
        playingFieldDimension.setAttribute('value', String(playingFieldDimensionValue));
    }

    if (winningStreakDimension && winningStreakDimensionValue) {
        winningStreakDimension.setAttribute('value', String(winningStreakDimensionValue));
    }

    if (winningStreakDimension && playingFieldDimension) {
        winningStreakDimension.setAttribute('max', String(playingFieldDimensionValue));
    }
}

function _setSettingsInLocalStorage(
    playingFieldDimension: HTMLInputElement | null,
    winningStreakDimension: HTMLInputElement | null,
): void {
    const playingFieldDimensionValue = playingFieldDimension?.value;
    const winningStreakDimensionValue = winningStreakDimension?.value;

    if (playingFieldDimensionValue) {
        setValueForLocalStorage(
            {
                key: LocalStorageKeys.playingFieldDimension,
                value: playingFieldDimensionValue,
            },
        );
    }
    else {
        console.error('playingFieldDimension is not defined!');
    }

    if (winningStreakDimensionValue) {
        setValueForLocalStorage(
            {
                key: LocalStorageKeys.winningStreakDimension,
                value: winningStreakDimensionValue,
            },
        );
    }
    else {
        console.error('winningStreakDimension is not defined!');
    }
}

export function addListenerForStartGame(
    settingsForm: HTMLElement | null,
    playingFieldDimension: HTMLInputElement | null,
    winningStreakDimension: HTMLInputElement | null,
): void {
    if (settingsForm) {
        settingsForm.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault();

            _setSettingsInLocalStorage(playingFieldDimension, winningStreakDimension);
        });
    }
}
