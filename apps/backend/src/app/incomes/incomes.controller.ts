import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {IncomeDto} from '../schemas/income.schema';
import {AuthGuard} from '@nestjs/passport';
import {Income} from '@mnr-crm/shared-models';


@Controller('incomes')
export class IncomesController {
    constructor(
        @InjectModel(IncomeDto.name) private readonly incomesQuery: Model<IncomeDto>,
    ) {}

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

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getById(@Param() params): Promise<Income> {
        return this.incomesQuery.findOne({_id: params.id}).exec();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateById(@Param() params, @Body() request): Promise<Income> {
        return this.incomesQuery.findOneAndUpdate({_id: params.id}, request).exec();
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param() params) {
        return this.incomesQuery.deleteOne({_id: params.id});
    }
}
