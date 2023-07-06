import { defineEndpoint } from '@directus/extensions-sdk';
import { Request, Response } from 'express';
import moment from 'moment';

async function calculateTotal(
  type: 'outgoing' | 'incoming',
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  transactionService: any,
) {   
   const query = {
      filter: {
        value:
        (type === 'incoming' && {_lt: 0}) ||
        (type === 'outgoing' && {_gt: 0}),

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
        ]
       
      },
    };

  const items = await transactionService.readByQuery(query);

  return items.reduce((sum: number, item) => item.value + sum, 0);
}

async function calculateMonthlyData(
  startDate: moment.Moment,
  endDate: moment.Moment, 
  transactionService: any
) {
  const monthlyData = [];

  let currentDate = moment(startDate);
  while (currentDate <= endDate) {
    const monthStart = currentDate.startOf('month').format('YYYY-MM-DDTHH:mm:ss');
    const monthEnd = currentDate.endOf('month').format('YYYY-MM-DDTHH:mm:ss');

    const incomingTotal = await calculateTotal('incoming', monthStart, monthEnd, transactionService);
    const outgoingTotal = await calculateTotal('outgoing', monthStart, monthEnd, transactionService);

    monthlyData.push({
      month: currentDate.format('MMMM YYYY'),
      incomingTotal,
      outgoingTotal
    });

    currentDate.add(1, 'month');
  }

  return monthlyData;
}

export default defineEndpoint(async (router, { services, getSchema }) => {
  const { ItemsService } = services;
  const schema = await getSchema();
  const transactionService = new ItemsService('transaction', {
    schema,
  });

	router.get('/', async (__req: Request, res:Response) => {
    const currentDate = moment().startOf('day').clone().add(1, 'day');
    const startDate = moment().subtract(31, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss');
    const startOfMonth = moment().startOf('month').subtract(11, 'months').startOf('day');

    const outgoingTotal = await calculateTotal('outgoing', startDate, currentDate, transactionService);
    const incomingTotal = await calculateTotal('incoming', startDate, currentDate, transactionService);
    const monthlyData = await calculateMonthlyData(startOfMonth, currentDate, transactionService);

    res.send({
      outgoingTotal,
      incomingTotal,
      monthlyData,
    })
  });
});
