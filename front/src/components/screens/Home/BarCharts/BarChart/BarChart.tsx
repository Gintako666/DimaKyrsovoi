import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DataToChart } from '~/interfaces/chart.interface';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

type Props = {
  data: DataToChart
};

const BarChart: React.FC<Props> = ({ data }) => (
  <Bar className="bar-chart" options={ options } data={ data } />
);

export default BarChart;
