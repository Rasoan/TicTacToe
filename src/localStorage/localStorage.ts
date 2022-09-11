'use strict';

export const enum LocalStorageKeys {
    playingFieldDimension = 'playingFieldDimension',
    winningStreakDimension = 'winningStreakDimension',
    gameBoardStateKey = 'gameBoardState',
}

export function setValueForLocalStorage(key: LocalStorageKeys, value: any) {
    localStorage.setItem(key, value);
}

export function getValueForLocalStorage(key: LocalStorageKeys) {
    return localStorage.getItem(key);
}