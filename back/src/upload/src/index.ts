/* eslint-disable import/no-relative-packages */
/* eslint-disable import/no-extraneous-dependencies */
import { defineEndpoint } from '@directus/extensions-sdk';
import { Request, Response } from 'express';
import multer from 'multer';
import * as xlsx from 'xlsx';
import fs from 'fs';
import moment from 'moment';
import { StatusType, Transaction } from '../../interfaces/Transaction';
import { File } from '../../interfaces/File';

const format = 'YYYY-MM-DDTHH:mm:ss';
const upload = multer({ dest: 'uploads/' });
const statusType: Record<string, StatusType> = {
  Abgeschlossen: 'Paid',
  Ausstehend: 'Pending',
  Abgelehnt: 'Rejected',
};
const millisecondsInDay = 24 * 60 * 60 * 1000;
const startDate = new Date('1899-12-31');

interface TransactionFromFile {
  Datum: number | string | string,
  Uhrzeit: string,
  Name: string,
  Typ: string
  Netto: string
  Status: string
  Betrag: number
  Buchungsdatum: number
  Währung: string
  Partnername: string

}

const settings = [
  // CSV
  {
    columns: [ 'Name', 'Typ', 'Währung', 'Netto', 'Status', 'Datum', 'Uhrzeit' ],
    startRow: 1,
    mapParser: (item: TransactionFromFile, file: File): Transaction => {
      let date: string | Date = moment(`${ item.Datum } ${ item.Uhrzeit }`, 'DD.MM.YYYY HH:mm:ss').format(format);

      if (date === 'Invalid date') {
        date = new Date(startDate.getTime() + (+item.Datum - 1) * millisecondsInDay);
      }

      return ({
        name: item.Name,
        type: item.Typ,
        currency: item['Währung'],
        value: +(`${ item.Netto }`.replace(/\./g, '')) / 100,
        status: statusType[item.Status as 'Abgelehnt' | 'Abgeschlossen' | 'Ausstehend'] || null,
        bank: null,
        category: null,
        date,
        file,
      });
    },
  },

  // xlsx
  {
    columns: [ 'Buchungsdatum', 'Betrag', 'Währung' ],
    startRow: 3,
    mapParser: (item: TransactionFromFile, file: File): Transaction => {
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
        file,
      };
    },
  },

  // numbers 1
  {
    columns: [ 'Betrag', 'Partnername', 'Währung', 'Buchungsdatum' ],
    startRow: 4,
    mapParser: (item: TransactionFromFile, file: File): Transaction => ({
      name: item.Partnername,
      type: null,
      currency: item['Währung'],
      value: item.Betrag,
      status: null,
      bank: null,
      category: null,
      date: item.Buchungsdatum,
      file,
    }),

  },
  // numbers 2
  {
    columns: [ 'Betrag', 'Datum' ],
    startRow: 7,
    mapParser: (item: TransactionFromFile, file: File): Transaction => {
      const dateParts = `${ item.Datum }`.split('/').reverse().map((datePart) => +datePart);
      dateParts[1] = parseInt(`${ dateParts[1] }`, 10) - 1;
      dateParts[2] = parseInt(`${ dateParts[2] }`, 10) + 1;
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
        file,
      });
    },
  },
];

export default defineEndpoint(async (router, { services, getSchema }) => {
  router.post('/', upload.single('file'), async (req: Request, res:Response) => {
    const { file } = req;
    const { fileName } = req.body;
    const { ItemsService } = services;
    const schema = await getSchema();

    if (!file) {
      res.status(400).send('Файл не найден');
      return;
    }

    try {
      const fileFromReq = fs.readFileSync(file.path);
      const workbook = xlsx.read(fileFromReq);
      const worksheet = workbook.Sheets[workbook.SheetNames[0] as string] as xlsx.WorkSheet;
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

      const transactions: TransactionFromFile[] = xlsx.utils.sheet_to_json(
        worksheet,
        { range: correctSetting.startRow - 1 },
      );

      const transactionService = new ItemsService('transaction', {
        schema,
      });

      const fileService = new ItemsService('file', {
        schema,
      });

      const newFile = await fileService.createOne({
        name: fileName,
      });

      const items = await transactionService.createMany(
        transactions.map((item) => correctSetting.mapParser(item, newFile)),
      );
      res.status(201).send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});
