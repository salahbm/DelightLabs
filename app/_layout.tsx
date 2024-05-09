import { Stack } from 'expo-router';
import 'react-native-reanimated';
import RootProvider from '@/providers';

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </RootProvider>
  );
}
// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
{
  /* </ThemeProvider> */
}
