import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/shared/ThemedText';
import { bell, bell_on } from '@/assets/icons';
import { LineChartView } from '@/components/statistics/Chart';
import { Spacing } from '@/styles/globals';
import { useEffect, useState } from 'react';
import { SegmentOutlined } from '@/components/shared/SegmentOutlined';
import { RecentTransactions } from '@/components/statistics/Transactions';
import { TProps, useRecentTransactions } from '@/hooks/statistics/useRecentTransactions';

export default function Statistics() {
  let isNotifications = false;
  const [isActive, setIsActive] = useState<TProps>('all');
  const { data, isLoading, error } = useRecentTransactions({ range: isActive });

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    }
  }, [isLoading, isActive]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBox}>
        <ThemedText type="defaultSemiBold">Transactions</ThemedText>
        <Image source={isNotifications ? bell_on : bell} style={styles.notifyImg} alt="NOTIFY" />
      </View>
      <LineChartView />
      <ThemedText type="bodyMSemiBold" style={{ marginVertical: Spacing.l }}>
        Recent Transactions
      </ThemedText>
      <SegmentOutlined
        isActive={isActive}
        labels={['All', 'Expense', 'Income']}
        setIsActive={setIsActive as () => void}
        containerStyle={{ marginBottom: Spacing.l }}
      />
      {data && <RecentTransactions isLoading={isLoading} data={data} />}
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
