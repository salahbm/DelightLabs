import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const globals = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.grey_background,
    marginVertical: 10,
  },
});
