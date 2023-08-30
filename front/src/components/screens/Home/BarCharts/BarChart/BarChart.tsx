/* eslint-disable @typescript-eslint/no-explicit-any */
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

type Props = {
  data: DataToChart
};

const options: any = {
  plugins: {
    legend: {
      labels: {
        generateLabels: (chart: ChartJS) => {
          const returnLabels = new Set(chart.data.datasets.map((dataset) => `${ dataset.label }---${ dataset.backgroundColor }`));
          return [ ...returnLabels ].map((item, datasetIndex, array) => ({
            datasetIndex: [ datasetIndex, (datasetIndex + array.length) ],
            text: chart.data.datasets[datasetIndex].label,
            hidden: chart.getDatasetMeta(datasetIndex).hidden,
            fillStyle: chart.data.datasets[datasetIndex].backgroundColor,
            strokeStyle: chart.data.datasets[datasetIndex].backgroundColor,
          }));
        },

      },
      onClick: (_event: any, legendItem: any, legend: any) => {
        const hidden = !legend.chart.getDatasetMeta(legendItem.datasetIndex[0]).hidden;
        legendItem.datasetIndex.forEach((i: number) => {
          // eslint-disable-next-line no-param-reassign
          legend.chart.getDatasetMeta(i).hidden = hidden;
        });
        legend.chart.update();
      },
    },
  },
  tooltips: {
    mode: 'x',
  },
  responsive: true,
};

const BarChart: React.FC<Props> = ({ data }) => <Bar className="bar-chart" options={ options } data={ data } />;

export default BarChart;
