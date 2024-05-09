import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/shared/ThemedText';
import { bell, bell_on } from '@/assets/icons';
import { LineChartView } from '@/components/statistics/Chart';
import chartData from '@/constants/chart_data.json';
import { Spacing } from '@/styles/globals';

export default function Statistics() {
  let isNotifications = false;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBox}>
        <ThemedText type="defaultSemiBold">Transactions</ThemedText>
        <Image source={isNotifications ? bell_on : bell} style={styles.notifyImg} alt="NOTIFY" />
      </View>
      <LineChartView data={chartData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.l },
  headerBox: {
    marginVertical: Spacing.l,
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
