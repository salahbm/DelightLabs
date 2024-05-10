/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/styles/colors';
import { useRecoilState } from 'recoil';
import { settingsColorThemeStatusAtom } from '@/store/settings/atom';
import { useEffect } from 'react';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const [isNight, setIsNight] = useRecoilState(settingsColorThemeStatusAtom);
  const colorFromProps = props[theme];
  useEffect(() => {
    if (theme == 'light') {
      setIsNight(false);
    } else {
      setIsNight(true);
    }
  }, [theme]);
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
