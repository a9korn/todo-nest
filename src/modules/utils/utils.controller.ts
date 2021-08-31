import { Body, Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { TestValidateDto } from './dto/test-validate.dto';

@Controller('utils')
export class UtilsController {
  constructor(private utilsService: UtilsService) {}

  @Get('test-validate')
  async testValidate(@Body() data: TestValidateDto) {
    return this.utilsService.testValidate(data);
  }

  @Get('template')
  async template() {
    const Handlebars = require("handlebars");
    Handlebars.registerHelper('money_format', (amount, currency) => {
      if (typeof currency !== 'string') return amount;

      const formatter = getFormatterForCurrency(currency);
      return formatter.format(amount);
    });
    const template = Handlebars.compile("Name: {{name}}, amount: {{money_format amount 'USD'}}");

    return template({ name: "Nils", amount: 1200300 });
  }
}

export const getFormatterForCurrency = (currency: string) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  });
};
