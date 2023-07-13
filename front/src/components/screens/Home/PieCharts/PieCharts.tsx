import React from 'react';
import { PieChartData } from '~/interfaces/chart.interface';
import PieChart from './PieChart/PieChart';

type Props = {
  outgoingData: PieChartData,
  incomingData: PieChartData,
};

const PieCharts: React.FC<Props> = ({ outgoingData, incomingData }) => (
  <section className="pie-charts">
    <div className="pie-charts__container">
      <div className="pie-charts__charts">
        {incomingData && <PieChart data={ incomingData } />}
        {incomingData && <PieChart data={ outgoingData } />}
      </div>
    </div>
  </section>
);

export default PieCharts;
