export declare const enum LocalStorageKeys {
    playingFieldDimension = "playingFieldDimension",
    winningStreakDimension = "winningStreakDimension",
    gameBoardStateKey = "gameBoardState"
}
export declare function setValueForLocalStorage(key: LocalStorageKeys, value: any): void;
export declare function getValueForLocalStorage(key: LocalStorageKeys): string | null;
