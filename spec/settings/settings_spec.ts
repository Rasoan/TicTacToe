'use strict';

import {PLAYING_FIELD_DIMENSION_ID, WINNING_STREAK_DIMENSION_ID} from "../../src/constants/constants";
import {
   addListenerForChangeMaxWinStreak,
   addListenerForButtonStartGame,
   initializeSettingsFormFromLocalStorage
} from "../../src/settings/settings";
import {getValueForLocalStorage, LocalStorageKeys, setValueForLocalStorage} from "../../src/localStorage/localStorage";

describe('settingsForm', () => {
   it('addListenerForChangeMaxWinStreak', () => {
      const changeEvent = new Event('change');

      const playingFieldDimension = document.createElement('input') as HTMLInputElement;
      playingFieldDimension.setAttribute('id', PLAYING_FIELD_DIMENSION_ID);
      playingFieldDimension.setAttribute('type', 'number');
      playingFieldDimension.setAttribute('min', '3');
      playingFieldDimension.setAttribute('max', '55');
      playingFieldDimension.setAttribute('value', '3');
      playingFieldDimension.setAttribute('step', '2');

      const winningStreakDimension = document.createElement('input') as HTMLInputElement;
      winningStreakDimension.setAttribute('id', WINNING_STREAK_DIMENSION_ID);
      winningStreakDimension.setAttribute('type', 'number');
      winningStreakDimension.setAttribute('min', '3');
      winningStreakDimension.setAttribute('max', '3');
      winningStreakDimension.setAttribute('value', '2');
      winningStreakDimension.setAttribute('step', '1');

      expect(playingFieldDimension.getAttribute('value'))
          .toBe(winningStreakDimension.getAttribute('max'))
      ;

      playingFieldDimension.setAttribute('value', '33');
      playingFieldDimension.dispatchEvent(changeEvent);

      expect(playingFieldDimension.getAttribute('value'))
          .not.toBe(winningStreakDimension.getAttribute('max'))
      ;

      addListenerForChangeMaxWinStreak(playingFieldDimension, winningStreakDimension);

      playingFieldDimension.setAttribute('value', '35');
      playingFieldDimension.dispatchEvent(changeEvent);

      expect(playingFieldDimension.getAttribute('value'))
          .toBe(winningStreakDimension.getAttribute('max'));
   });
});