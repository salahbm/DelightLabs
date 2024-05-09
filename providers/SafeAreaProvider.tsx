import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ReactNode, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Colors } from '@/styles/colors';

interface Props {
  children: ReactNode;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const SafeAreaRootProvider = ({ children }: Props) => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PoppinsRegular400: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium500: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold600: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold700: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView
        edges={['top']}
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
        }}
      >
        <StatusBar
          backgroundColor={
            colorScheme === 'light' ? Colors.light.background : Colors.dark.background
          }
          barStyle="light-content"
        />
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaRootProvider;
