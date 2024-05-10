import { atom } from 'recoil';
import { localStorageEffect } from '../effect';

export const settingsColorThemeStatusAtom = atom({
  key: 'settingsColorThemeStatusAtom',
  default: false,
  effects: [localStorageEffect<boolean>('color-mode')],
});
