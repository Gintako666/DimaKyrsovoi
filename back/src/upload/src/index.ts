/* eslint-disable import/no-extraneous-dependencies */
import { defineEndpoint } from '@directus/extensions-sdk';
import { Request, Response } from 'express';
import multer from 'multer';
import * as xlsx from 'xlsx';
import fs from 'fs';
import moment from 'moment';

const format = 'YYYY-MM-DDTHH:mm:ss';
const upload = multer({ dest: 'uploads/' });
const statusType = {
  Abgeschlossen: 'Paid',
  Ausstehend: 'Pending',
  Abgelehnt: 'Rejected',
};
const millisecondsInDay = 24 * 60 * 60 * 1000;
const startDate = new Date('1899-12-31');

interface Transaction {
  name: string | null,
  type: string | null,
  currency: string,
  value: number,
  status: 'Paid' | 'Pending' | 'Rejected' | null,
  bank: string | null,
  category: string | null,
  date: string,
}

const settings = [
  // CSV
  {
    columns: [ 'Name', 'Typ', 'Währung', 'Netto', 'Status', 'Datum', 'Uhrzeit' ],
    startRow: 1,
    mapParser: (item): Transaction => {
      let date: string | Date = moment(`${ item.Datum } ${ item.Uhrzeit }`, 'DD.MM.YYYY HH:mm:ss').format(format);

      if (date === 'Invalid date') {
        date = new Date(startDate.getTime() + (item.Datum - 1) * millisecondsInDay);
      }

      return ({
        name: item.Name,
        type: item.Typ,
        currency: item['Währung'],
        value: parseFloat(`${ item.Netto }`.replace(/./, '').replace(',', '.')),
        status: statusType[item.Status as 'Abgelehnt' | 'Abgeschlossen' | 'Ausstehend'],
        bank: null,
        category: null,
        date,
      });
    },
  },

  // xlsx
  {
    columns: [ 'Buchungsdatum', 'Betrag', 'Währung' ],
    startRow: 3,
    mapParser: (item): Transaction => {
      const date = new Date(startDate.getTime() + (item.Buchungsdatum - 1) * millisecondsInDay);
      return {
        name: null,
        type: null,
        currency: item['Währung'],
        value: item.Betrag,
        status: null,
        bank: null,
        category: null,
        date,
      };
    },
  },

  // numbers 1
  {
    columns: [ 'Betrag', 'Partnername', 'Währung', 'Buchungsdatum' ],
    startRow: 4,
    mapParser: (item): Transaction => ({
      name: null,
      type: null,
      currency: item['Währung'],
      value: item.Betrag,
      status: null,
      bank: item.Partnername,
      category: null,
      date: item.Buchungsdatum,
    }),

  },
  // numbers 2
  {
    columns: [ 'Betrag', 'Datum' ],
    startRow: 7,
    mapParser: (item): Transaction => {
      const dateParts = item.Datum.split('/').reverse();
      dateParts[1] = parseInt(dateParts[1], 10) - 1;
      dateParts[2] = parseInt(dateParts[2], 10) + 1;
      const date = new Date(...dateParts);

      return ({
        name: null,
        type: null,
        currency: null,
        value: item.Betrag,
        status: null,
        bank: null,
        category: null,
        date,
      });
    },
  },
];

export default defineEndpoint(async (router, { services, getSchema }) => {
  const { ItemsService } = services;
  const schema = await getSchema();

  router.post('/', upload.single('file'), async (req: Request, res:Response) => {
    const { file } = req;

    if (!file) {
      res.status(400).send('Файл не найден');
      return;
    }

    try {
      const fileFromReq = fs.readFileSync(file.path);
      const workbook = xlsx.read(fileFromReq);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_csv(worksheet);
      const rows = data.split('\n').map((row) => row.split(','));

      const correctSetting = settings.find((setting) => {
        let flag = true;
        setting.columns.forEach((column) => {
          if (!rows[setting.startRow - 1]?.includes(column)) {
            flag = false;
          }
        });

        return flag;
      });

      if (!correctSetting) {
        res.sendStatus(402);
        return;
      }

      const transactions = xlsx.utils.sheet_to_json(
        worksheet,
        { range: correctSetting.startRow - 1 },
      ).map(correctSetting.mapParser);

      const transactionService = new ItemsService('transaction', {
        schema,
      });

      const items = await transactionService.createMany(transactions);
      res.status(201).send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});
