import { Image, StyleSheet, Switch } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/shared/ParallaxScrollView';
import { ThemedText } from '@/components/shared/ThemedText';
import { ThemedView } from '@/components/shared/ThemedView';
import { globals } from '@/styles/globals';
import { useRecoilState } from 'recoil';
import { settingsColorThemeStatusAtom } from '@/store/settings/atom';
import { Colors } from '@/styles/colors';

export default function HomeScreen() {
  const [isNight, setIsNight] = useRecoilState(settingsColorThemeStatusAtom);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/logo.jpeg')} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Notice:</ThemedText>
        <ThemedText type="subtitle">This is Test App for Delight Labs</ThemedText>
        <ThemedText>Please navigate to the 3rd Tab to test the app...</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Notice 2:</ThemedText>
        <ThemedText>If you have Night Mode On Please turn it off to see the design</ThemedText>
      </ThemedView>
      <ThemedView style={globals.rowBetween}>
        <ThemedText type="default">Theme:</ThemedText>
        <ThemedView style={globals.row}>
          <ThemedText type="bodySemiBold">Light</ThemedText>
          <Switch
            onChange={() => setIsNight(!isNight)}
            value={isNight}
            thumbColor={Colors.light.primary}
          />

          <ThemedText type="bodySemiBold">Dark</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 278,
    width: 390,
    bottom: 0,
    left: 0,
    position: 'absolute',
    objectFit: 'cover',
  },
});
