import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import chartData from '@/constants/chart_mock_data.json';

export interface TChartData {
  amount: string;
  name: string;
  timestamp: string;
  type: string;
}

export type TProps = 'week' | 'month';

// Convert the JSON data to an array of TChartData objects (assuming your JSON data is valid)
const chartDataArray: TChartData[] = JSON.parse(JSON.stringify(chartData));

const filterByDateRange = async (data: TChartData[], startDate: string, endDate: string) => {
  const startDateObj = dayjs(startDate, 'YYYY-MM-DD').toDate();
  const endDateObj = dayjs(endDate, 'YYYY-MM-DD').toDate();

  return data.filter((transfer) => {
    const transferDate = dayjs(transfer.timestamp, 'YYYY-MM-DD').toDate();
    return transferDate >= startDateObj && transferDate <= endDateObj;
  });
};

const fetchChartData = async (range?: 'week' | 'month') => {
  const today = new Date();

  let startDate: string;
  let endDate: string;

  switch (range) {
    case 'week':
      startDate = dayjs(today).subtract(7, 'days').format('YYYY-MM-DD');
      endDate = dayjs(today).format('YYYY-MM-DD');
      break;
    case 'month':
      startDate = dayjs(today).subtract(30, 'days').format('YYYY-MM-DD');
      endDate = dayjs(today).format('YYYY-MM-DD');
      break;
    default:
      return [];
  }

  // Filter the entire chartData based on the calculated date range
  const filteredData = await filterByDateRange(chartDataArray, startDate, endDate);

  return filteredData;
};

const useChart = (options?: { range?: 'week' | 'month' }) => {
  const today = new Date();

  let startDate: string | undefined;
  let endDate: string | undefined;

  if (options?.range) {
    switch (options.range) {
      case 'week':
        startDate = dayjs(today).subtract(7, 'days').format('YYYY-MM-DD');
        break;
      case 'month':
        startDate = dayjs(today).startOf('month').format('YYYY-MM-DD');
        break;
    }
  }

  endDate = dayjs(today).format('YYYY-MM-DD');

  //******* WORKING WITH REAL DATA AND BACK END useInfiniteQuery can be used to optimize fetch data from DB  *******//

  const query = {
    queryKey: ['chartData', options?.range],
    queryFn: () => fetchChartData(options?.range),
  };

  return useQuery(query);
};

export { useChart };
