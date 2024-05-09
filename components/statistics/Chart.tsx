import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useColorScheme } from '@/hooks/common/useColorScheme';
import { Colors } from '@/styles/colors';
import { Segment } from '../shared/Segment';
import { useState } from 'react';
import { globals, width } from '@/styles/globals';
import dayjs from 'dayjs';
import { useChartTransferData } from '@/hooks/useChart/useChart';

type TProps = {
  data: any;
};

export const LineChartView = ({ data: labelData }: TProps) => {
  // console.log(`labelData:`, labelData);
  const colorScheme = useColorScheme();
  const [isActive, setIsActive] = useState('week');
  const { data, isLoading, error } = useChartTransferData({ range: 'week' });

  if (isLoading) {
    return <Text>Loading transfers...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const data1 = Array.from({ length: 12 }, () => Math.random() * 250);
  const data2 = Array.from({ length: 12 }, () => Math.random() * 75);
  //   function dateObjectIntoArray(obj: Record<string, string>): string[] {
  //     const dataArray: string[] = [];
  //     for (const [key, value] of Object.entries(obj)) {
  //       dataArray.push(`${key}`);
  //     }
  //     return dataArray;
  //   }

  //   function priceObjectIntoArray(obj: Record<string, string>): number[] {
  //     const dataArray: number[] = [];
  //     for (const value of Object.values(obj)) {
  //       // Pad the string with trailing zeros
  //       const paddedValue = value.padEnd(value.indexOf('.') + 5, '0');
  //       // Convert the padded string to a floating-point number
  //       const floatValue = parseFloat(paddedValue);
  //       // Push the number into the dataArray
  //       dataArray.push(floatValue);
  //     }
  //     return dataArray;
  //   }

  //   const convertDates = dateObjectIntoArray(labelData).map((date) => dayjs(date).format('MM/DD'));
  //   const minimizeFullMonth = (datesArray: string[]) => {
  //     const length = datesArray.length;
  //     if (length > 6) {
  //       const sixDaysOutOfMonth: string[] = [];
  //       const interval = Math.floor(length / 5); // Calculate interval between selected days

  //       // Start from the last day and select days at intervals until we have 6 days
  //       for (let i = length - 1; i >= 0 && sixDaysOutOfMonth.length < 6; i -= interval) {
  //         sixDaysOutOfMonth.push(datesArray[i]);
  //       }

  //       return sixDaysOutOfMonth.reverse(); // Reverse the array to maintain the order
  //     } else {
  //       return datesArray;
  //     }
  //   };

  //   const filterConvertDates = useCallback(() => {
  //     return convertDates.length > 7
  //       ? minimizeFullMonth(convertDates).reverse()
  //       : convertDates.reverse();
  //   }, [convertDates]);

  //   const reverseDataset = useCallback(() => {
  //     return priceObjectIntoArray(labelData).reverse();
  //   }, [labelData]);
  //   useEffect(() => {
  //     filterConvertDates();
  //     reverseDataset();
  //   }, []);
  return (
    <View>
      <View style={globals.rowBetween}>
        <Segment isActive={isActive} labels={['Week', 'Month']} setIsActive={setIsActive} />
        <Text style={{ color: 'white' }}>{dayjs('2019-01-25').format('DD/MM/YYYY')}</Text>
      </View>
      <LineChart
        data={{
          labels: ['Jan', 'July'],
          datasets: [
            {
              data: data1,
              color: () => Colors.light.primary,
              strokeWidth: 2,
              withScrollableDot: true,
            },
            {
              data: data2,
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
          //   fillShadowGradientFrom: 'rgba(91, 218, 164, 1)',
          //   fillShadowGradientTo: 'rgba(91, 218, 164, 1)',
        }}
        style={{ marginVertical: 10, marginLeft: -25 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
