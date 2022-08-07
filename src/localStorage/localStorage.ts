'use strict';

export const enum LocalStorage {
    playingFieldDimension = 'playingFieldDimension',
    winningStreakDimension = 'winningStreakDimension',
}

export function setValueForLocalStorage(data: { key: LocalStorage, value: any }) {
    const {key, value} = data;

    localStorage.setItem(key, value);
}

export function getValueForLocalStorage(key: LocalStorage) {
    return localStorage.getItem(key);
}