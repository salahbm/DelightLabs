import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/common/useColorScheme';
import { Colors } from '@/styles/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const border = {
    borderBottomColor: Colors.light.primary,
    borderBottomWidth: 3,
    top: Platform.OS === 'ios' ? 15 : 7,
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'light' ? Colors.light.white : Colors.dark.tabBackground,
          borderTopWidth: 0,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabBarIcon name={'home'} color={color} />
              {focused && <View style={border} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabBarIcon name={'wallet'} color={color} />
              {focused && <View style={border} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabBarIcon name={'statistics'} color={color} />
              {focused && <View style={border} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabBarIcon name={'user'} color={color} />
              {focused && <View style={border} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
