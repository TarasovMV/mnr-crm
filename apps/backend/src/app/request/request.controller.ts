import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    StreamableFile,
    UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestDto } from '../schemas/request.schema';
import {
    Buyer,
    PayType,
    Product,
    Request,
    RequestStatus,
    User,
    Vehicle,
    Vendor,
} from '@mnr-crm/shared-models';
import { AuthGuard } from '@nestjs/passport';
import * as path from 'path';
import * as Excel from 'exceljs';

@Controller('request')
export class RequestController {
    constructor(
        @InjectModel(RequestDto.name)
        private readonly requestQuery: Model<RequestDto>
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() request: Request) {
        const req = new this.requestQuery(request);

        await req.save();

        return req;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    getAll() {
        return this.requestQuery.find();
    }

    @Get('ttn/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/xlsx')
    @Header('Content-Disposition', 'attachment; filename=ttn.xlsx')
    async createTTN(@Param() params) {
        const COUNTER = 'Тининенко А.Н.';

        const cellMapper = {
            incId: 'B1',
            buyer: 'B2',
            vendor: 'B3',
            vendor_okpo: 'B4',
            buyer_okpo: 'B5',
            date_day: 'B6',
            date_month: 'B7',
            date_year: 'B8',
            product_code: 'B9',
            product: 'B10',
            count: 'B11',
            density: 'B12',
            weight: 'B13',
            address: 'B14',
            driver: 'B15',
            vehicle_brand: 'B16',
            vehicle_number: 'B17',
            vehicle_trail: 'B18',
            vehicle_trail_number: 'B19',
            counter: 'B20',
            temperature: 'B21',
            plomb: 'B22',
        };

        const request = (
            await this.requestQuery
                .findOne({ _id: params.id })
                .populate('buyer')
                .populate('vendor')
                .populate('product')
                .populate('driver')
                .populate('vehicle')
                .exec()
        ).toObject();

        const filename = path.join(__dirname, 'assets', 'ttn-template.xlsx');

        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filename);

        const main = workbook.worksheets[0];
        const tpl = workbook.worksheets[1];

        main.eachRow((row) =>
            row.eachCell((cell) => {
                if (!cell.formula) return;
                cell.model.result = undefined;
            })
        );

        const setValue = (cell, value, worksheet = tpl) =>
            (worksheet.getCell(cell).value = value ?? ' ');
        const companyStringify = (company: Buyer | Vendor) =>
            `${company.name}, ИНН ${company.inn}, ${company.address}`;

        setValue(cellMapper.incId, request.incId);
        setValue(
            cellMapper.buyer,
            companyStringify(request.buyer as unknown as Buyer)
        );
        setValue(
            cellMapper.vendor,
            companyStringify(request.vendor as unknown as Vendor)
        );
        setValue(
            cellMapper.vendor_okpo,
            (request.vendor as unknown as Vendor).okpo
        );
        setValue(
            cellMapper.buyer_okpo,
            (request.buyer as unknown as Buyer).okpo
        );
        setValue(cellMapper.date_day, new Date(request.date).getDate());
        setValue(cellMapper.date_month, new Date(request.date).getMonth() + 1);
        setValue(cellMapper.date_year, new Date(request.date).getFullYear());
        setValue(
            cellMapper.product_code,
            (request.product as unknown as Product).code
        );
        setValue(
            cellMapper.product,
            (request.product as unknown as Product).name
        );
        setValue(cellMapper.count, request.count);
        setValue(cellMapper.density, request.density);
        setValue(cellMapper.weight, request.weight);
        setValue(cellMapper.address, request.address);
        setValue(cellMapper.driver, (request.driver as unknown as User)?.fio);
        setValue(
            cellMapper.vehicle_brand,
            (request.vehicle as unknown as Vehicle).brand
        );
        setValue(
            cellMapper.vehicle_number,
            (request.vehicle as unknown as Vehicle).number
        );
        setValue(
            cellMapper.vehicle_trail,
            (request.vehicle as unknown as Vehicle).trail
        );
        setValue(
            cellMapper.vehicle_trail_number,
            (request.vehicle as unknown as Vehicle).trailNumber
        );
        setValue(cellMapper.counter, COUNTER);
        setValue(cellMapper.temperature, request.temperature);
        setValue(cellMapper.plomb, request.plomb);

        main.getRow(44).addPageBreak();

        workbook.calcProperties.fullCalcOnLoad = true;

        const buffer = (await workbook.xlsx.writeBuffer()) as Uint8Array;

        return new StreamableFile(buffer);
    }

    @Get('report')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/xlsx')
    @Header('Content-Disposition', 'attachment; filename=report.xlsx')
    async createReport() {
        const payTypeMapper: { [key in PayType]: string } = {
            [PayType.Cash]: 'Наличный',
            [PayType.Cashless]: 'Безналичный',
        };

        const statusMapper: { [key in RequestStatus]: string } = {
            [RequestStatus.Framed]: 'Оформлена',
            [RequestStatus.Appointed]: 'Назначена',
            [RequestStatus.InTransit]: 'В пути',
            [RequestStatus.Executed]: 'Исполнена',
            [RequestStatus.Canceled]: 'Отменена',
        };

        const requests = (
            await this.requestQuery
                .find({})
                .populate('buyer')
                .populate('vendor')
                .populate('product')
                .populate('driver')
                .populate('responsible')
                .populate('vehicle')
                .exec()
        ).map((x) => x.toObject());

        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Отчет');

        const header = [
            'Номер ТТН',
            'Статус заявки',
            'Покупатель',
            'Продавец',
            'Водитель',
            'Ответственный',
            'Товар',
            'Объем',
            'Плотность',
            'Масса',
            'Цена',
            'Стоимость',
            'Транспорт',
            'Телефон',
            'Температура',
            'Пломба',
            'Оплата',
            'Адрес доставки',
            'Дата поставки',
            'Дата создания',
        ];

        header.forEach((h, idx) => {
            const cell = sheet.getRow(1).getCell(idx + 1);
            cell.value = h;
            cell.style = { font: { bold: true } };
        });

        requests.forEach((i, idx) => {
            const row = sheet.getRow(idx + 2);

            [
                i.incId,
                statusMapper[i.status] ?? 'Оформлена',
                i.buyer?.name,
                i.vendor?.name,
                i.driver?.fio,
                i.responsible?.fio,
                i.product?.shortName,
                i.count,
                i.density,
                i.weight,
                i.price,
                i.cost,
                i.vehicle?.number,
                i.phone,
                i.temperature,
                i.plomb,
                payTypeMapper[i.payType] ?? '',
                i.address,
                i.date?.toLocaleDateString('ru-RU') ?? '',
                i.createdAt?.toLocaleDateString('ru-RU') ?? '',
            ].forEach((value, idx) => (row.getCell(idx + 1).value = value));
        });

        sheet.columns.forEach(function (column, i) {
            if (i !== 0) {
                let maxLength = 14;
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
    getById(@Param() params) {
        return this.requestQuery.findOne({ _id: params.id });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateById(@Param() params, @Body() request) {
        return this.requestQuery.findOneAndUpdate({ _id: params.id }, request);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('copy/:id')
    async copyById(@Param() params) {
        let req = await this.requestQuery.findOne({ _id: params.id }).exec();
        req = JSON.parse(JSON.stringify(req));

        delete req.id;
        delete req._id;
        delete req.incId;

        const copy = new this.requestQuery(req);

        await copy.save();

        return copy;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param() params) {
        return this.requestQuery.deleteOne({ _id: params.id });
    }
}
