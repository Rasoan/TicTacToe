'use strict';

import {
    FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME,
    PLAYING_FIELD_DIMENSION_ID,
    WINNING_STREAK_DIMENSION_ID
} from "../constants/constants";
import GameBoardState from "../GameBoardState/GameBoardState";
import {handleStartGame} from "../gameBoardUi/gameBoardUi";
import {PLAYER} from "../GameBoardState/declaration/GameBoardState";

export function addListenerForChangeMaxWinStreak(
    playingFieldDimension: HTMLInputElement,
    winningStreakDimension: HTMLInputElement,
): void {
    playingFieldDimension.addEventListener('change', (event: Event) => {
        const playingFieldDimensionValue: string = (event.target as HTMLInputElement).value;
        const winningStreakDimensionValue = winningStreakDimension.value;

        winningStreakDimension.setAttribute('max', playingFieldDimensionValue);

        if (Number(playingFieldDimensionValue) < Number(winningStreakDimensionValue)) {
            winningStreakDimension.value = playingFieldDimensionValue;
        }
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


export function addListenerForButtonStartGame(
    buttonStartGame: HTMLElement,
    gameBoardHtmlElement: HTMLElement,
    gameBoardState: GameBoardState,
): void {
    buttonStartGame.addEventListener('click', (event: MouseEvent) => {
        const playingFieldDimension = document.getElementById(PLAYING_FIELD_DIMENSION_ID) as HTMLInputElement | null;
        const winningStreakDimension = document.getElementById(WINNING_STREAK_DIMENSION_ID) as HTMLInputElement | null;
        const firstPlayerWalksRadioButton = document.querySelector(`input[name=${FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME}]:checked`) as HTMLInputElement | null;

        if (!playingFieldDimension || !winningStreakDimension || !firstPlayerWalksRadioButton) {
            throw new Error('playingFieldDimension || winningStreakDimension || firstPlayerWalksRadioButton is not defined');
        }

        const size = Number(playingFieldDimension.value);
        const winningStreak = Number(winningStreakDimension.value);
        const firstPlayerWalks = firstPlayerWalksRadioButton.value;

        if (firstPlayerWalks !== PLAYER.X && firstPlayerWalks !== PLAYER.O) {
            throw new Error("No valid firstPlayerWalks value!");
        }

        gameBoardState.start({
            size,
            winningStreak,
            firstPlayerWalks,
        });

        handleStartGame(gameBoardHtmlElement, gameBoardState)
    });
}

export function choiceRadioButtonFromFirstPlayerWalks(player: PLAYER.X | PLAYER.O) {
    const radioButtons = document.querySelectorAll(`input[name=${FIRST_PLAYER_WALKS_RADIO_BUTTON_NAME}]`) as unknown as HTMLInputElement[];

    for (const radioButton of radioButtons) {
        radioButton.checked = radioButton.value === player;
    }
}