import React from 'react';
import { DataToChart } from '~/interfaces/chart.interface';
import BarChart from './BarChart/BarChart';

type Props = {
  chartData: DataToChart;
};

const Chart: React.FC<Props> = ({ chartData }) => (
  <section className="chart">
    <div className="chart__container">
      <h3 className="chart__title">Chart</h3>
      {chartData && <BarChart data={ chartData } />}
    </div>
  </section>
);

export default Chart;
