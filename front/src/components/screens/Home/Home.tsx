import { FC, useEffect, useState } from 'react';

import Loader from '~/components/shared/Loader/Loader';

import useFetchData from '~/hooks/useFetchData';

import TransactionsService from '~/services/transactions.service';
import { DataToChart, PieChartData } from '~/interfaces/chart.interface';
import { ITransactionSummary } from '~/interfaces/transaction.interface';
import LastDays from './LastDays/LastDays';
import Chart from './Chart/Chart';
import PieCharts from './PieCharts/PieCharts';
import { ICard } from './LastDays/card.interface';

const Home: FC = () => {
  const [ dataFromServer, setDataFromServer ] = useState<{
    chartData: DataToChart,
    cards: ICard[],
    pieChartsData: {
      incomingData: PieChartData,
      outgoingData: PieChartData,
    }
  }>();
  const { getTransactionSummary } = TransactionsService;
  const {
    data,
    isLoading: transactionsLoading,
  } = useFetchData<{ data: ITransactionSummary }>(getTransactionSummary);

  useEffect(() => {
    if (data) {
      const {
        monthlyData,
        incomingTotal,
        outgoingTotal,
        categoriesPerMonthOutgoing,
        categoriesPerMonthIncoming,
      } = data.data;

      setDataFromServer({
        chartData: monthlyData,
        cards: [
          {
            name: 'Incoming',
            number: incomingTotal,
          },
          {
            name: 'Outgoing',
            number: outgoingTotal,
          },
        ],
        pieChartsData: {
          incomingData: categoriesPerMonthIncoming,
          outgoingData: categoriesPerMonthOutgoing,
        },
      });
    }
  }, [ data ]);

  if (transactionsLoading || !dataFromServer) {
    return <Loader />;
  }

  return (
    <>
      <LastDays cards={ dataFromServer.cards } />
      <PieCharts
        incomingData={ dataFromServer.pieChartsData.incomingData }
        outgoingData={ dataFromServer.pieChartsData.outgoingData }
      />
      <Chart chartData={ dataFromServer.chartData } />
    </>
  );
};

export default Home;
