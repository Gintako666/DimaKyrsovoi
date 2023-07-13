export interface Dataset {
  label: string,
  data: (number | null)[],
  borderColor: string,
}

export interface DataToChart {
  labels: string[];
  datasets: Dataset[];
}

export interface PieChartData {
  labels: string[],
  datasets: [
    {
      label?: string,
      data: number[],
      backgroundColor: string[],
      borderColor?: string[],
      borderWidth?: number,
    },
  ],
}
