import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {IncomeDto, IncomeSchema} from '../schemas/income.schema';
import {IncomesController} from './incomes.controller';
import {HttpModule} from '@nestjs/axios';


@Module({
    controllers: [IncomesController],
    imports: [
        HttpModule,
        MongooseModule.forFeature([{ name: IncomeDto.name, schema: IncomeSchema }]),
    ],
})
export class IncomesModule {}
