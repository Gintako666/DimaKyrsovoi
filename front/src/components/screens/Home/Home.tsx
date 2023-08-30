import { FC, useEffect, useState } from 'react';

import Loader from '~/components/shared/Loader/Loader';

import useFetchData from '~/hooks/useFetchData';

import TransactionsService from '~/services/transactions.service';
import { DataToChart, PieChartData } from '~/interfaces/chart.interface';
import LastDays from './LastDays/LastDays';
import PieCharts from './PieCharts/PieCharts';
import { ICard } from './LastDays/card.interface';
import BarCharts from './BarCharts/BarCharts';

const Home: FC = () => {
  const [ dataFromServer, setDataFromServer ] = useState<{
    chartData: DataToChart,
    cards: ICard[],
    pieChartsData: {
      incomingData: PieChartData | null,
      outgoingData: PieChartData | null,
    }
  }>();
  const { getTransactionSummary } = TransactionsService;
  const {
    data,
    isLoading: transactionsLoading,
  } = useFetchData(getTransactionSummary);

  useEffect(() => {
    if (data) {
      const {
        monthlyData,
        incomingTotal,
        outgoingTotal,
        categoriesPerMonthOutgoing,
        categoriesPerMonthIncoming,
      } = data;

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
          incomingData: (incomingTotal && categoriesPerMonthIncoming) || null,
          outgoingData: (outgoingTotal && categoriesPerMonthOutgoing) || null,
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
      <BarCharts
        chartData={ dataFromServer.chartData }
      />
    </>
  );
};

export default Home;
