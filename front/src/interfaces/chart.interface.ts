export interface Dataset {
  label: string,
  data: (number | null)[],
  borderColor: string,
};

export interface DataToChart {
  labels: string[];
  datasets: Dataset[];
};