import { Image, ScrollView, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/shared/ThemedView';
import { ThemedText } from '@/components/shared/ThemedText';
import { bell, bell_on } from '@/assets/icons';
import { LineChartView } from '@/components/statistics/Chart';

export default function Statistics() {
  let isNotifications = false;
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerBox}>
        <ThemedText type="defaultSemiBold">Transactions</ThemedText>
        <Image source={isNotifications ? bell_on : bell} style={styles.notifyImg} alt="NOTIFY" />
      </ThemedView>
      <LineChartView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  headerBox: {
    marginVertical: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  notifyImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
