import React from 'react';
import { DataToChart } from '~/interfaces/chart.interface';
import BarChart from './BarChart/BarChart';

type Props = {
  earningsData: DataToChart | null,
  lossesData: DataToChart | null,
};

const BarCharts: React.FC<Props> = ({ earningsData, lossesData }) => (
  <section className="bar-charts">
    <div className="bar-charts__container">
      <div className="bar-charts__charts">
        {lossesData && <BarChart data={ lossesData } />}
        {earningsData && <BarChart data={ earningsData } />}
      </div>
    </div>
  </section>
);

export default BarCharts;
