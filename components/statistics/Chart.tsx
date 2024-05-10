import { Alert, Animated, Dimensions, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { useColorScheme } from '@/hooks/common/useColorScheme';
import { Colors } from '@/styles/colors';
import { Segment } from '../shared/Segment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { globals, width } from '@/styles/globals';
import dayjs from 'dayjs';
import { TChartData, TProps, useChart } from '@/hooks/useChart/useChart';
import { ThemedText } from '../shared/ThemedText';
type DatesState = [string, string];

export const LineChartView = () => {
  const colorScheme = useColorScheme();
  const [isActive, setIsActive] = useState<TProps>('week');
  const { data, isLoading, error } = useChart({ range: isActive });

  const [positiveAmounts, setPositiveAmounts] = useState<number[]>([]);
  const [negativeAmounts, setNegativeAmounts] = useState<number[]>([]);
  const [dates, setDates] = useState<Date[]>([]);

  const separateAmounts = useCallback(() => {
    if (!isLoading && data) {
      const positive = data
        .filter((item) => parseFloat(item.amount) >= 0)
        .map((item) => parseFloat(item.amount));
      const negative = data
        .filter((item) => parseFloat(item.amount) < 0)
        .map((item) => parseFloat(item.amount));
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

  const [progressTime, setProgressTime] = useState(0);

  // Define a initial value for chart
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    } else {
      separateAmounts();

      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      // Define animation for chart
      Animated.timing(animationValue, {
        toValue: 0.95, // Value to graph
        duration: 1500, // Duration for animation
        useNativeDriver: true,
      }).start();

      // Listen the animation variable and update chart variable
      animationValue.addListener(({ value }) => {
        setProgressTime(value);
      });
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
          {dayjs(earliestDate).format('MMM DD')}-{dayjs(today).format('MMM DD,YYYY')}
        </ThemedText>
      </View>
      <LineChart
        data={{
          labels: ['Jan', 'July'],
          datasets: [
            {
              data:
                positiveAmounts.length > 0
                  ? positiveAmounts.map((amount) => amount * progressTime)
                  : [],
              color: () => Colors.light.primary,
              strokeWidth: 2,
              withScrollableDot: true,
            },
            {
              data: negativeAmounts.map((amount) => amount * progressTime),
              color: () => 'rgba(91, 218, 164, 1)',
              strokeWidth: 2,
              withScrollableDot: true,
              withDots: true,
            },
          ],
        }}
        fromZero
        transparent
        bezier
        withDots
        width={width.width}
        withHorizontalLabels={false}
        height={220}
        withVerticalLines={false}
        withInnerLines={false}
        chartConfig={{
          backgroundColor: Colors.light.background,
          strokeWidth: 3,
          decimalPlaces: 0,
          color: () => Colors.light.primary,
          count: 1,
          propsForDots: { r: 0 },
          propsForBackgroundLines: {
            stroke: 'transparent',
            strokeDasharray: [0, 0],
          },
          // fillShadowGradientFrom: 'rgba(91, 218, 164, 1)',
          // fillShadowGradientTo: 'rgba(91, 218, 164, 1)',
        }}
        style={{ marginVertical: 10, marginLeft: -55 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
