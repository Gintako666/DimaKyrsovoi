import React from 'react';
import { Pie } from 'react-chartjs-2';
import { PieChartData } from '~/interfaces/chart.interface';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';

type Props = {
  data: PieChartData
};

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<Props> = ({ data }) => (
  <Pie
    className="pie-chart"
    data={ data }
  />
);

export default PieChart;
