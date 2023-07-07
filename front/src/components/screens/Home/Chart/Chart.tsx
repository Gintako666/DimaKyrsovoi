import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataToChart } from '~/interfaces/chart.interface';
import { LineChart } from './LineChart/LineChart';

const Chart = () => {
  const [ chartData, setChartData ] = useState<DataToChart>();
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

    async function test() {
      const data = await axios.get('http://127.0.0.1:3010/transaction_summary');

      setChartData({
        labels: getMonthYearArray().reverse(),
        datasets: data.data.monthlyData,
      });
    }

    test();
  }, []);
  return (
    <section className="chart">
      <div className="chart__container">
        <h3 className="chart__title">Chart</h3>
        {chartData && <LineChart data={ chartData } />}
      </div>
    </section>
  );
};

export default Chart;
