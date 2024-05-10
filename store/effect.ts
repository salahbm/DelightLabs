import AsyncStorage from '@react-native-async-storage/async-storage';
import { AtomEffect } from 'recoil';

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const loadData = async () => {
      try {
        const prevValue = await AsyncStorage.getItem(key);
        if (prevValue !== null) {
          setSelf(JSON.parse(prevValue));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();

    onSet((newValue, _, isReset) => {
      const saveData = async () => {
        try {
          if (isReset) {
            await AsyncStorage.removeItem(key);
            return;
          }
          await AsyncStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
          console.error('Error saving data to AsyncStorage:', error);
        }
      };
      saveData();
    });
  };
