import {Body, Controller, Get, Post} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RequestDto} from '../schemas/request.schema';
import {Request} from '@mnr-crm/shared-models';


@Controller('request')
export class RequestController {
    constructor(@InjectModel(RequestDto.name) private readonly requestQuery: Model<RequestDto>) {}

    @Post('create')
    async create(@Body() request: Request) {
        const req = new this.requestQuery(request);

        await req.save();

        return req;

        // return this.requestQuery.aggregate([ { $lookup : { from : "users", localField : "responsible", foreignField: "_id", as : "userInfo" } } ])
        // return this.requestQuery.find().populate('responsible', null);

        // return req.populate('responsible', null);
    }

    @Get('all')
    getAll() {
        return this.requestQuery.find();
    }
}
