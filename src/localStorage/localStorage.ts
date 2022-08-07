'use strict';

export const enum LocalStorageKeys {
    playingFieldDimension = 'playingFieldDimension',
    winningStreakDimension = 'winningStreakDimension',
}

export function setValueForLocalStorage(data: { key: LocalStorageKeys, value: any }) {
    const {key, value} = data;

    localStorage.setItem(key, value);
}

export function getValueForLocalStorage(key: LocalStorageKeys) {
    return localStorage.getItem(key);
}