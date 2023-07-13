/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-relative-packages */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineEndpoint } from '@directus/extensions-sdk';
import { Request, Response } from 'express';
import moment from 'moment';
import { Category } from '../../interfaces/Category';
import { Transaction } from '../../interfaces/Transaction';

interface PieDataset {
  labels: string[],
  datasets:{
    label: string | null,
    data: number[],
    backgroundColor: string[],
  }[],
}

export interface Dataset {
  label: string,
  data: (number | null)[],
  borderColor: string,
}

const dateFormat = 'YYYY-MM-DDTHH:mm:ss';

async function getCategorys(categoryService: any): Promise<Category[]> {
  const categorys: Category[] = await categoryService.readByQuery({});
  return categorys;
}

async function getTransactions(transactionService: any, query: any): Promise<Transaction[]> {
  const transactios: Transaction[] = await transactionService.readByQuery(query);
  return transactios;
}

async function calculateTotal(
  type: 'outgoing' | 'incoming' | 'all',
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  transactionService: any,
  additionalFilters: Record<string, Record<string, number | string>> = {},
) {
  const query = {
    filter: {
      ...(type !== 'all' && {
        value:
      (type === 'incoming' && { _gt: 0 })
      || (type === 'outgoing' && { _lt: 0 }),
      }),

      ...additionalFilters,

      _and: [
        {
          date: {
            _gt: startDate,
          },
        },
        {
          date: {
            _lt: endDate,
          },
        },
      ],
    },
  };

  const items: Transaction[] = await getTransactions(transactionService, query);
  return items.reduce((sum: number, item) => +item.value + sum, 0);
}

async function calculateMonthlyData(
  startDate: moment.Moment,
  endDate: moment.Moment,
  transactionService: any,
  categoryService: any,
) {
  const categorys = await getCategorys(categoryService);
  const returnData: Dataset[] = [];

  for (const category of categorys) {
    const { id: categoryId, name, color } = category;
    const monthlyData = [];
    const currentDate = moment(startDate).add(1, 'month');
    const newEndDate = endDate.add(1, 'month');

    while (currentDate <= newEndDate) {
      const monthStart = currentDate.startOf('month').format(dateFormat);
      const monthEnd = currentDate.endOf('month').format(dateFormat);

      const allValues = await calculateTotal(
        'all',
        monthStart,
        monthEnd,
        transactionService,
        { category: { _eq: categoryId } },
      );

      monthlyData.push(allValues);

      currentDate.add(1, 'month');
    }

    returnData.push({
      label: name,
      borderColor: color,
      data: monthlyData,
    });
  }

  return returnData;
}

async function calculationCategoriesPerMonth(type: 'outgoing' | 'incoming', transactionService: any, categoryService: any) {
  const categorys = await getCategorys(categoryService);
  const returnData: PieDataset = {
    labels: categorys.map((category) => category.name),
    datasets: [],
  };
  const curentDate = moment().hour(23).minute(59).second(59);
  const DatesForLastMonth = [ curentDate.format(dateFormat) ];

  for (let i = 0; i < 30; i += 1) {
    DatesForLastMonth.unshift(curentDate.add(-1, 'day').format(dateFormat));
  }

  const data: number[] = [];
  const backgroundColor: string[] = [];

  for (const category of categorys) {
    const { id: categoryId, color } = category;
    const startDate = moment().add(-30, 'day').format(dateFormat);
    const endDate = moment().format(dateFormat);

    const transactionsInCategoryPerMonth = await getTransactions(
      transactionService,
      {
        filter: {
          category: { _eq: categoryId },
          value:
            (type === 'incoming' && { _gt: 0 })
            || (type === 'outgoing' && { _lt: 0 }),

          _and: [
            {
              date: {
                _gt: startDate,
              },
            },
            {
              date: {
                _lt: endDate,
              },
            },
          ],
        },
      },
    );

    const sumValue = transactionsInCategoryPerMonth.reduce((sum, item) => sum + +item.value, 0);
    data.push(sumValue);
    backgroundColor.push(color);
  }

  returnData.datasets.push({
    label: null,
    data,
    backgroundColor,
  });

  return returnData;
}

export default defineEndpoint(async (router, { services, getSchema }) => {
  router.get('/', async (__req: Request, res:Response) => {
    const currentDate = moment().startOf('day').clone().add(1, 'day');
    const startDate = moment().subtract(31, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss');
    const startOfMonth = moment().startOf('month').subtract(12, 'months').startOf('day');
    const { ItemsService } = services;

    const schema = await getSchema();

    const transactionService = new ItemsService('transaction', {
      schema,
    });

    const categoryService = new ItemsService('category', {
      schema,
    });

    const outgoingTotal = await calculateTotal('outgoing', startDate, currentDate, transactionService);
    const incomingTotal = await calculateTotal('incoming', startDate, currentDate, transactionService);
    const monthlyData = await calculateMonthlyData(
      startOfMonth,
      currentDate,
      transactionService,
      categoryService,
    );
    const categoriesPerMonthOutgoing = await calculationCategoriesPerMonth(
      'outgoing',
      transactionService,
      categoryService,
    );
    const categoriesPerMonthIncoming = await calculationCategoriesPerMonth(
      'incoming',
      transactionService,
      categoryService,
    );

    res.send({
      outgoingTotal,
      incomingTotal,
      monthlyData,
      categoriesPerMonthOutgoing,
      categoriesPerMonthIncoming,
    });
  });
});
