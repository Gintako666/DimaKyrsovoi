import { FC, useEffect, useState } from 'react';
import { DataToChart, PieChartData } from '~/interfaces/chart.interface';
import Loader from '~/components/shared/Loader/Loader';
import useFetchData from '~/hooks/useFetchData';
import useDirectusApi from '~/hooks/useDirectusApi';
import LastDays from './LastDays/LastDays';
import Chart from './Chart/Chart';
import { ICard } from './LastDays/card.interface';
import PieCharts from './PieCharts/PieCharts';

const Home: FC = () => {
  const [ dataFromServer, setDataFromServer ] = useState<{
    chartData: DataToChart,
    cards: ICard[],
    pieChartsData: {
      incomingData: PieChartData,
      outgoingData: PieChartData,
    }
  }>();
  const { getTransactionSummary } = useDirectusApi();

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
