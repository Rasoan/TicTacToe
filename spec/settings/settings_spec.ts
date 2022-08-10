'use strict';

import {PLAYING_FIELD_DIMENSION_ID, WINNING_STREAK_DIMENSION_ID} from "../../src/constants/constants";
import {
   addListenerForChangeMaxWinStreak,
   addListenerForStartGame,
   initializeSettingsFormFromLocalStorage
} from "../../src/settingsForm/settingsForm";
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

   it('initializeSettingsFormFromLocalStorage', () => {
      const playingFieldDimension = document.createElement('input') as HTMLInputElement;
      const winningStreakDimension = document.createElement('input') as HTMLInputElement;

      expect(playingFieldDimension.getAttribute('value'))
          .not.toBe('7');
      expect(winningStreakDimension.getAttribute('value'))
          .not.toBe('5');

      setValueForLocalStorage({key: LocalStorageKeys.playingFieldDimension, value: '7'});
      setValueForLocalStorage({key: LocalStorageKeys.winningStreakDimension, value: '5'});


      expect(playingFieldDimension.getAttribute('value'))
          .not.toBe('7');
      expect(winningStreakDimension.getAttribute('value'))
          .not.toBe('5');

      initializeSettingsFormFromLocalStorage(playingFieldDimension, winningStreakDimension);

      expect(playingFieldDimension.getAttribute('value'))
          .toBe('7');
      expect(winningStreakDimension.getAttribute('value'))
          .toBe('5');
      expect(winningStreakDimension.getAttribute('max'))
          .toBe('7');
   });

   it('addListenerForStartGame', () => {
      setValueForLocalStorage({ key: LocalStorageKeys.playingFieldDimension, value: null });
      setValueForLocalStorage({ key: LocalStorageKeys.winningStreakDimension, value: null });

      const playingFieldDimension = document.createElement('input') as HTMLInputElement;
      const winningStreakDimension = document.createElement('input') as HTMLInputElement;
      const settingsForm = document.createElement('form') as HTMLFormElement;

      playingFieldDimension.value = '9';
      winningStreakDimension.value = '7';

      addListenerForStartGame(settingsForm, playingFieldDimension, winningStreakDimension);

      let playingFieldDimensionValue = getValueForLocalStorage(LocalStorageKeys.playingFieldDimension);
      let winningStreakDimensionValue = getValueForLocalStorage(LocalStorageKeys.winningStreakDimension);

      expect(playingFieldDimensionValue)
          .not.toBe('9')
      ;
      expect(winningStreakDimensionValue)
          .not.toBe('7')
      ;

      const eventSubmit = new Event('submit');
      settingsForm.dispatchEvent(eventSubmit);

      playingFieldDimensionValue = getValueForLocalStorage(LocalStorageKeys.playingFieldDimension);
      winningStreakDimensionValue = getValueForLocalStorage(LocalStorageKeys.winningStreakDimension);

      expect(playingFieldDimensionValue)
          .toBe('9')
      ;
      expect(winningStreakDimensionValue)
          .toBe('7')
      ;
   });
});