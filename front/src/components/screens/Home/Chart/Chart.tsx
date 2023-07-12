import React from 'react';
import { DataToChart } from '~/interfaces/chart.interface';
import { LineChart } from './LineChart/LineChart';

type Props = {
  chartData: DataToChart;
};

const Chart: React.FC<Props> = ({ chartData }) => (
  <section className="chart">
    <div className="chart__container">
      <h3 className="chart__title">Chart</h3>
      {chartData && <LineChart data={ chartData } />}
    </div>
  </section>
);

export default Chart;
