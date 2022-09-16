'use strict';

import {
    STATISTICS_COUNT_VALUE_DRAW,
    STATISTICS_COUNT_VALUE_WIN_O,
    STATISTICS_COUNT_VALUE_WIN_X
} from "../constants/constants";
import GameBoardState from "../GameBoardState/GameBoardState";
import {LocalStorageKeys, setValueForLocalStorage} from "../localStorage/localStorage";

export function updateStatisticInformation(
    countWinGame_x: string,
    countWinGame_o: string,
    countDrawGame: string,
) {
    const countWinOHtmlElement = document.getElementById(STATISTICS_COUNT_VALUE_WIN_O) as HTMLElement | null;
    const countWinXHtmlElement = document.getElementById(STATISTICS_COUNT_VALUE_WIN_X) as HTMLElement | null;
    const countDrawHtmlElement = document.getElementById(STATISTICS_COUNT_VALUE_DRAW) as HTMLElement | null;

    if (!countWinOHtmlElement || !countWinXHtmlElement || !countDrawHtmlElement) {
        throw new Error('countWinOHtmlElement || countWinXHtmlElement || countDrawHtmlElement is not defined!');
    }

    countWinOHtmlElement.innerText = countWinGame_o;
    countWinXHtmlElement.innerText = countWinGame_x;
    countDrawHtmlElement.innerText = countDrawGame;
}

export function handleResetStatistics(gameBoardState: GameBoardState) {
    gameBoardState.resetStatistics();

    setValueForLocalStorage(LocalStorageKeys.gameBoardStateKey, gameBoardState.toJSON());

    const {
        countWin_x,
        countWin_o,
        countDraw,
    } = gameBoardState.winnerInformation.statistics;

    updateStatisticInformation(
        String(countWin_x),
        String(countWin_o),
        String(countDraw),
    );
}