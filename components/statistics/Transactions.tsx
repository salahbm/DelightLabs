import dayjs from 'dayjs';
import { StyleSheet, View } from 'react-native';

import { TRecentTransactions } from '@/hooks/statistics/useRecentTransactions';
import { Colors } from '@/styles/colors';
import { globals, Spacing } from '@/styles/globals';
import { capitalizeFirstLetter } from '@/utils/supporters';

import Loader from '../shared/Loader';
import { NoDataView } from '../shared/NoData';
import { ThemedText } from '../shared/ThemedText';

export const RecentTransactions = ({
  data,
  isLoading,
}: {
  data: TRecentTransactions[];
  isLoading: boolean;
}) => {
  return (
    <View style={{ minHeight: 200, overflow: 'scroll' }}>
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : data && data.length > 0 ? (
        data.map((item, index) => (
          <View key={index} style={{ ...globals.row, marginBottom: Spacing.s }}>
            <View style={styles.imgBox}>
              <ThemedText type="subtitle" style={{ color: Colors.light.white }}>
                {item?.name ? item?.name[0].toUpperCase() : 'D'}
              </ThemedText>
            </View>
            <View style={{ ...globals.rowBetween, flex: 1 }}>
              <View>
                <ThemedText>{item?.name}</ThemedText>
                <ThemedText type="body">{capitalizeFirstLetter(item?.type)}</ThemedText>
              </View>
              <View style={styles.amountBox}>
                <ThemedText type="defaultBold" style={{ color: Colors.light.primary }}>
                  {parseFloat(item?.amount) > 0 ? '+' + item?.amount : item?.amount}
                </ThemedText>
                <ThemedText type="body">{dayjs(item?.timestamp).format('H.MM A')}</ThemedText>
              </View>
            </View>
          </View>
        ))
      ) : (
        <NoDataView />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgBox: {
    ...globals.center,
    width: 51,
    height: 51,
    borderRadius: 8,
    backgroundColor: Colors.light.grey_background,
  },
  amountBox: {
    alignItems: 'flex-end',
  },
});
