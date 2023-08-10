import { IFile } from './file.interface';
import { ICategory } from './category.interface';
import { DataToChart, PieChartData } from './chart.interface';

export interface ITransaction {
  id: number;
  date: string;
  name: string;
  bank: string;
  currency: string;
  category: ICategory;
  value: string;
  type: string;
  status: string;
  file: IFile;
}

export interface ITransactionSummary {
  categoriesPerMonthIncoming: PieChartData
  categoriesPerMonthOutgoing: PieChartData
  incomingTotal: number
  outgoingTotal: number
  monthlyData: DataToChart,
}
