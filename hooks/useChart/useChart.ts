import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import chartData from '@/constants/chart_mock_data.json';

interface Transfer {
  amount: string;
  name: string;
  timestamp: string;
  type: string;
}

// Convert the JSON data to an array of Transfer objects (assuming your JSON data is valid)
const chartDataArray: Transfer[] = JSON.parse(JSON.stringify(chartData));

const filterByDateRange = async (data: Transfer[], startDate: string, endDate: string) => {
  const startDateObj = dayjs(startDate, 'YYYY-MM-DD').toDate();
  const endDateObj = dayjs(endDate, 'YYYY-MM-DD').toDate();

  return data.filter((transfer) => {
    const transferDate = dayjs(transfer.timestamp, 'YYYY-MM-DD').toDate();
    return transferDate >= startDateObj && transferDate <= endDateObj;
  });
};

const fetchTransfers = async (range?: 'week' | 'month' | 'all') => {
  const today = new Date();

  let startDate: string;
  let endDate: string;

  switch (range) {
    case 'week':
      startDate = dayjs(today).subtract(7, 'days').format('YYYY-MM-DD');
      endDate = dayjs(today).format('YYYY-MM-DD');
      break;
    case 'month':
      startDate = dayjs(today).startOf('month').format('YYYY-MM-DD');
      endDate = dayjs(today).format('YYYY-MM-DD');
      break;
    case 'all':
      startDate = dayjs(today).subtract(12, 'months').startOf('month').format('YYYY-MM-DD');
      endDate = dayjs(today).format('YYYY-MM-DD');
      break;
    default:
      return [];
  }

  // Filter the entire chartData based on the calculated date range
  const filteredData = await filterByDateRange(chartDataArray, startDate, endDate);

  return filteredData;
};

const useChartTransferData = (options?: { range?: 'week' | 'month' | 'all' }) => {
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
    queryFn: () => fetchTransfers(options?.range),
  };

  return useQuery(query);
};

export { useChartTransferData };
