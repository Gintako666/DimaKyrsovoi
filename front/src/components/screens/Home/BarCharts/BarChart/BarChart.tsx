import React, { useMemo } from 'react';
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

const BarChart: React.FC<Props> = ({ data }) => {
  const options = useMemo(() => ({
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
        onClick: (event, legendItem, legend) => {
          const hidden = !legend.chart.getDatasetMeta(legendItem.datasetIndex[0]).hidden;
          legendItem.datasetIndex.forEach((i: number) => {
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
  }), [ data ]);

  return <Bar className="bar-chart" options={ options } data={ data } />;
};

export default BarChart;
