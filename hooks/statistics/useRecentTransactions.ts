import { useQuery } from '@tanstack/react-query';
import chartData from '@/constants/chart_mock_data.json';

export interface TRecentTransactions {
  amount: string;
  name: string;
  timestamp: string;
  type: string;
}

export type TProps = 'all' | 'expense' | 'income';

const fetchRecentTransfers = async (range?: 'all' | 'income' | 'expense') => {
  // Filter the chartData based on the provided range
  let filteredData = chartData;

  if (range === 'income') {
    filteredData = chartData.filter((item) => parseFloat(item.amount) > 0);
  } else if (range === 'expense') {
    filteredData = chartData.filter((item) => parseFloat(item.amount) < 0);
  }

  return filteredData;
};

const useRecentTransactions = (options?: { range?: 'all' | 'income' | 'expense' }) => {
  const query = {
    queryKey: ['transfers', options?.range],
    queryFn: () => fetchRecentTransfers(options?.range),
  };

  return useQuery(query);
};

export { useRecentTransactions };
