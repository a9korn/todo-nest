import { Injectable } from '@nestjs/common';
import { TestValidateDto } from './dto/test-validate.dto';

@Injectable()
export class UtilsService {
  constructor() {
  }

  arrayGroupBy(key, array) {
    return array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }

  groupBy(array, f) {
    const groups = {};
    array.forEach((o) => {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  }


  testValidate(data: TestValidateDto) {
    const invoices = [
      {
        id: 1,
        invoice_no: 'no1',
        amount: 1001,
        seller: 's1',
        payer: 'p1',
      },
      {
        id: 2,
        invoice_no: 'no2',
        amount: 1002,
        seller: 's2',
        payer: 'p1',
      },
      {
        id: 3,
        invoice_no: 'no3',
        amount: 1003,
        seller: 's1',
        payer: 'p2',
      },
      {
        id: 4,
        invoice_no: 'no4',
        amount: 1004,
        seller: 's1',
        payer: 'p1',
      },
    ];

    const [{ seller, id }] = invoices;
    console.log(seller, id);

    const newInvoices = this.arrayGroupBy('seller', invoices);
    const newInvoices1 = this.groupBy(invoices, (item) => {
      return [item.seller, item.payer];
    });

    // Object.keys(newInvoices).forEach(item=>{
    //   console.log('items: ', newInvoices[item].map(el=>({invoice_no: el.invoice_no, amount: el.amount})));
    // })

    return { newInvoices, newInvoices1 };
  }
}

