import { Image } from 'react-native';

import { home, statistics, user, wallet } from '@/assets/icons';

export function TabBarIcon({ name, color, ...rest }: { name: string; color: string }) {
  let iconSource;
  switch (name) {
    case 'home':
      iconSource = home;
      break;
    case 'wallet':
      iconSource = wallet;
      break;
    case 'statistics':
      iconSource = statistics;
      break;
    case 'user':
      iconSource = user;
      break;
    default:
      iconSource = home;
      break;
  }

  return (
    <Image
      source={iconSource}
      style={{ marginBottom: -3, tintColor: color, width: 24, height: 24, objectFit: 'contain' }}
      {...rest}
    />
  );
}
