import { defineEndpoint } from '@directus/extensions-sdk';
import { Request, Response } from 'express';
import moment from 'moment';
import {Category} from '../../interfaces/Category';

async function calculateTotal(
  type: 'outgoing' | 'incoming' | 'all',
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  transactionService: any,
  additionalFilters: Record<string, Record<string, number | string>> = {},
) {   


  const query = {
    filter: {
      ...(type !== 'all' && {value:
      (type === 'incoming' && {_lt: 0}) ||
      (type === 'outgoing' && {_gt: 0})}),
      
      ...additionalFilters,

      _and: [
        {
          date: {
            _gt: startDate,
          } 
        },
        {
          date: {
            _lt: endDate,
          }
        }
      ],
      
      
    },
  };

  const items = await transactionService.readByQuery(query);
  return items.reduce((sum: number, item) => +item.value + sum, 0);
}

async function calculateMonthlyData(
  startDate: moment.Moment,
  endDate: moment.Moment, 
  transactionService: any,
  categoryService: any,
) {
  const categorys: Category[] = await categoryService.readByQuery({});
  const returnData = [];

  for (let category of categorys) {
    const {id: categoryId , name, color} = category
    const monthlyData = [];
    let currentDate = moment(startDate).add(1, 'month');
    const newEndDate = endDate.add(1, 'month')

    while (currentDate <= newEndDate) {
      const monthStart = currentDate.startOf('month').format('YYYY-MM-DDTHH:mm:ss');
      const monthEnd = currentDate.endOf('month').format('YYYY-MM-DDTHH:mm:ss');

      const allValues = await calculateTotal(
        'all', 
        monthStart, 
        monthEnd, 
        transactionService, 
        {category: {_eq: categoryId}}
      );

      monthlyData.push(allValues);

      currentDate.add(1, 'month');
    }

    returnData.push({
      label: name,
      borderColor: color,
      data: monthlyData,
    })
  }

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
    const monthlyData = await calculateMonthlyData(startOfMonth, currentDate, transactionService, categoryService);

    res.send({
      outgoingTotal,
      incomingTotal,
      monthlyData,
    })
  });
});
