import {
    Body,
    Controller,
    Delete,
    Get, Header,
    HttpCode, HttpStatus,
    Param,
    Post,
    Put,
    StreamableFile,
    UseGuards
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RequestDto} from '../schemas/request.schema';
import {Buyer, Product, Request, User, Vehicle, Vendor} from '@mnr-crm/shared-models';
import {AuthGuard} from '@nestjs/passport';
import JsExcelTemplate from "js-excel-template/nodejs/nodejs";
import JsExcelTemplateType from 'js-excel-template';
import * as path from 'path';


@Controller('request')
export class RequestController {
    constructor(@InjectModel(RequestDto.name) private readonly requestQuery: Model<RequestDto>) {}

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

        const request = (await this.requestQuery.findOne({_id: params.id})
            .populate('buyer')
            .populate('vendor')
            .populate('product')
            .populate('driver')
            .populate('vehicle')
            .exec()).toObject();

        const template: JsExcelTemplateType = await JsExcelTemplate.fromFile(path.join(__dirname, 'assets', 'ttn-template.xlsx'));

        const companyStringify = (company: Buyer | Vendor) => `${company.name}, ИНН ${company.inn}, ${company.address}`;

        template.set('incId', request.incId);
        template.set('buyer', companyStringify(request.buyer as unknown as Buyer));
        template.set('vendor', companyStringify(request.vendor as unknown as Vendor));
        template.set('vendor_okpo', (request.vendor as unknown as Vendor).okpo);
        template.set('buyer_okpo', (request.buyer as unknown as Buyer).okpo);
        template.set('date_day', new Date(request.date).getDate());
        template.set('date_month', new Date(request.date).getMonth() + 1);
        template.set('date_year', new Date(request.date).getFullYear());
        template.set('product_code', (request.product as unknown as Product).code);
        template.set('product', (request.product as unknown as Product).name);
        template.set('count', request.count);
        template.set('density', request.density);
        template.set('weight', request.weight);
        template.set('address', request.address);
        template.set('driver', (request.driver as unknown as User).fio);
        template.set('vehicle_brand', (request.vehicle as unknown as Vehicle).brand);
        template.set('vehicle_number', (request.vehicle as unknown as Vehicle).number);
        template.set('vehicle_trail', (request.vehicle as unknown as Vehicle).trail);
        template.set('vehicle_trail_number', (request.vehicle as unknown as Vehicle).trailNumber);
        template.set('counter', (request.vehicle as unknown as Vehicle).trail);

        template.set('temperature', request.temperature);
        template.set('counter', COUNTER);
        template.set('plomb', request.plomb);

        const buffer = await template.toBuffer();

        return new StreamableFile(buffer);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getById(@Param() params) {
        return this.requestQuery.findOne({_id: params.id});
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateById(@Param() params, @Body() request) {
        return this.requestQuery.findOneAndUpdate({_id: params.id}, request);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('copy/:id')
    async copyById(@Param() params) {
        let req = await this.requestQuery.findOne({_id: params.id}).exec();
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
        return this.requestQuery.deleteOne({_id: params.id});
    }
}
