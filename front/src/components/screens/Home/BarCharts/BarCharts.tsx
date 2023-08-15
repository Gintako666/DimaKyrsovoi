import React from 'react';
import { DataToChart } from '~/interfaces/chart.interface';
import BarChart from './BarChart/BarChart';

type Props = {
  chartData: DataToChart | null,
};

const BarCharts: React.FC<Props> = ({ chartData }) => (
  <section className="bar-charts">
    <div className="bar-charts__container">
      <div className="bar-charts__charts">
        {chartData && <BarChart data={ chartData } />}
      </div>
    </div>
  </section>
);

export default BarCharts;
