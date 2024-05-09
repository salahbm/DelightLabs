import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/styles/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            colorScheme === 'light' ? Colors.light.background : Colors.dark.tabBackground,
          borderTopWidth: 0,
        },
      }}
      sceneContainerStyle={{
        backgroundColor:
          colorScheme === 'light' ? Colors.light.background : Colors.dark.tabBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name={'home'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon name={'wallet'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon name={'statistics'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon name={'user'} color={color} />,
        }}
      />
    </Tabs>
  );
}
