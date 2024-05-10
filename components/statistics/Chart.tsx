import { Alert, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/common/useColorScheme';
import { Colors } from '@/styles/colors';
import { Segment } from '../shared/Segment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { globals, Spacing, width } from '@/styles/globals';
import dayjs from 'dayjs';
import { TProps, useChart } from '@/hooks/statistics/useChart';
import { ThemedText } from '../shared/ThemedText';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

export const LineChartView = () => {
  const colorScheme = useColorScheme();
  const [isActive, setIsActive] = useState<TProps>('week');
  const { data, isLoading, error } = useChart({ range: isActive });

  const [positiveAmounts, setPositiveAmounts] = useState<lineDataItem[]>();
  const [negativeAmounts, setNegativeAmounts] = useState<lineDataItem[]>();
  const separateAmounts = useCallback(() => {
    if (!isLoading && data) {
      const parsedAmounts = data.map((item) => {
        const parsedValue = parseFloat(item.amount);
        if (isNaN(parsedValue)) {
          console.error('Error parsing amount:', item.amount);
          return { value: 0, timestamp: item.timestamp };
        }
        return { value: parsedValue, timestamp: item.timestamp };
      });

      const positive = parsedAmounts
        .filter((item) => item.value >= 0)
        .map((item) => ({ value: item.value, timestamp: item.timestamp }));

      const negative = parsedAmounts
        .filter((item) => item.value < 0)
        .map((item) => ({ value: Math.abs(item.value), timestamp: item.timestamp }));

      setNegativeAmounts(negative);
      setPositiveAmounts(positive);
    }
  }, [data, isLoading]);

  const today = new Date();
  const earliestDate = useMemo(() => {
    if (data && !isLoading && data.length > 0) {
      return new Date(
        data.reduce((minDate, item) => {
          const itemDate = new Date(item.timestamp);
          return itemDate < minDate ? itemDate : minDate;
        }, new Date(data[0].timestamp)),
      );
    }
    return null;
  }, [data, isLoading]);

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    } else {
      separateAmounts();
    }
  }, [data, isLoading]);

  return (
    <View>
      <View style={globals.rowBetween}>
        <Segment
          isActive={isActive}
          labels={['Week', 'Month']}
          setIsActive={setIsActive as () => void}
        />

        <ThemedText type="body" style={{ color: Colors.light.primary }}>
          {isActive === 'week'
            ? dayjs(earliestDate).format('MMM DD')
            : `${dayjs(earliestDate).format('MMM DD')}-${dayjs(today).format('MMM DD,YYYY')}`}
        </ThemedText>
      </View>
      <View style={styles.chartTypeBox}>
        <View style={styles.chartLabelBorder} />
        <ThemedText type="body" style={{ color: Colors.light.primary }}>
          Income
        </ThemedText>
        <View style={styles.chartLabelBorder2} />
        <ThemedText type="body" style={{ color: Colors.light.primary }}>
          Expense
        </ThemedText>
      </View>
      <View>
        <LineChart
          areaChart
          curved
          isAnimated
          animationDuration={1200}
          data={positiveAmounts}
          data2={negativeAmounts}
          height={250}
          showVerticalLines={false}
          initialSpacing={0}
          color1={Colors.light.primary}
          color2={Colors.light.green}
          hideAxesAndRules
          hideYAxisText
          hideDataPoints
          startFillColor1={Colors.light.primary}
          startFillColor2={Colors.light.green}
          startOpacity={0.5}
          endOpacity={0.3}
          showXAxisIndices={false}
          showYAxisIndices={false}
          spacing={25}
          thickness={2}
          stripColor={Colors.light.grey_background}
          pointerConfig={{
            pointerStripWidth: 1,
            pointer1Color: Colors.light.primary,
            pointer2Color: Colors.light.green,
            radius: 8,
            activatePointersOnLongPress: true,
            activatePointersDelay: 100,
            pointerLabelComponent: (items: lineDataItem[]) => {
              return (
                <View>
                  <View style={styles.pointerLabelBox}>
                    <ThemedText type="bodySemiBold" style={{ color: Colors.light.white }}>
                      +{items[0].value}
                    </ThemedText>
                    <ThemedText type="body" style={{ color: Colors.light.white }}>
                      {/* @ts-expect-error timestamp does not exist in the type but it is injected */}
                      {dayjs(items[0]?.timestamp).format('MMM DD, HH:mm')}
                    </ThemedText>
                    <View style={styles.triangle} />
                  </View>

                  <View style={styles.pointerLabelBoxExpense}>
                    <ThemedText type="bodySemiBold" style={{ color: Colors.light.white }}>
                      -{items[1].value}
                    </ThemedText>

                    <ThemedText type="body" style={{ color: Colors.light.white }}>
                      {/* @ts-expect-error timestamp does not exist in the type but it is injected  */}
                      {dayjs(items[0]?.timestamp).format('MMM DD, HH:mm')}
                    </ThemedText>
                    <View style={styles.triangleExpense} />
                  </View>
                </View>
              );
            },
          }}
        />
        {isActive === 'week' ? (
          <View style={globals.rowBetween}>
            <ThemedText style={{ color: Colors.light.grey_title }}>
              {dayjs(earliestDate).format('DD')}
            </ThemedText>
            <ThemedText style={{ color: Colors.light.grey_title }}>
              {dayjs(today).format('DD')}
            </ThemedText>
          </View>
        ) : (
          <View style={globals.rowBetween}>
            <ThemedText style={{ color: Colors.light.grey_title }}>
              {dayjs(earliestDate).format('MMM DD')}
            </ThemedText>
            <ThemedText style={{ color: Colors.light.grey_title }}>
              {dayjs(today).format('MMM DD')}
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartTypeBox: {
    ...globals.row,
    marginVertical: Spacing.l,
    marginLeft: Spacing.xxs,
  },
  chartLabelBorder: {
    width: 32,
    height: 5,
    backgroundColor: Colors.light.primary,
  },
  chartLabelBorder2: {
    width: 32,
    height: 5,
    backgroundColor: Colors.light.green,
  },
  pointerLabelBox: {
    height: 60,
    width: 90,
    backgroundColor: Colors.light.primary,
    borderRadius: 4,
    padding: Spacing.xxs,
    position: 'relative',
  },
  pointerLabelBoxExpense: {
    height: 60,
    width: 90,
    backgroundColor: Colors.light.green,
    borderRadius: 8,
    padding: Spacing.xxs,
    marginTop: Spacing.xs,
    position: 'relative',
  },
  triangle: {
    width: 7,
    height: 7,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 7,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.light.primary,
    borderLeftColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    bottom: -6,
    right: 0,
    left: '4.5%',
  },
  triangleExpense: {
    width: 7,
    height: 7,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 7,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.light.green,
    borderLeftColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    bottom: -6,
    right: 0,
    left: '4.5%',
  },
});
