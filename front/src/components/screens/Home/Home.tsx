import { FC, useEffect, useState } from 'react';
import { DataToChart, PieChartData } from '~/interfaces/chart.interface';
import axiosInstance from '~/services/axiosInstance';
import Loader from '~/components/shared/Loader/Loader';
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
  useEffect(() => {
    function getMonthYearArray() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const monthYearArray = [];

      for (let i = 0; i < 12; i += 1) {
        const year = currentYear + Math.floor((currentMonth - i) / 12);
        const month = (currentMonth - i + 12) % 12;
        const monthName = new Date(year, month).toLocaleString('en-us', { month: 'long' });
        const formattedMonthYear = `${ monthName } ${ year }`;

        monthYearArray.push(formattedMonthYear);
      }

      return monthYearArray;
    }

    async function requestToServer() {
      const { data } = await axiosInstance.get('/transaction_summary');
      const {
        monthlyData,
        incomingTotal,
        outgoingTotal,
        categoriesPerMonthOutgoing,
        categoriesPerMonthIncoming,
      } = data;
      setDataFromServer({
        chartData: {
          labels: getMonthYearArray().reverse(),
          datasets: monthlyData,
        },
        cards: [
          {
            name: 'Income',
            number: incomingTotal,
          },
          {
            name: 'Outcome',
            number: outgoingTotal,
          },
        ],
        pieChartsData: {
          incomingData: categoriesPerMonthIncoming,
          outgoingData: categoriesPerMonthOutgoing,
        },
      });
    }

    requestToServer();
  }, []);

  if (!dataFromServer) {
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
