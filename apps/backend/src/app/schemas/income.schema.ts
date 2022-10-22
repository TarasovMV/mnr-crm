import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Income, IncomeType } from '@mnr-crm/shared-models';
import { DEFAULT_SCHEMA_PARAMS } from './consts';
import { dbNameMapper } from '../utils/db-name.util';
import { BuyerDto } from './buyer.schema';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class IncomeDto extends Document implements Income {
    @Prop({ type: Types.ObjectId, ref: dbNameMapper[BuyerDto.name] })
    company: string;

    @Prop()
    fuel: string;

    @Prop()
    count: number;

    @Prop()
    density: number;

    @Prop()
    temperature: number;

    @Prop()
    weight: number;

    @Prop()
    driver: string;

    @Prop({ type: String, default: IncomeType.Income.toString() })
    type: IncomeType;

    @Prop()
    date: Date;
}

export const IncomeSchema = SchemaFactory.createForClass(IncomeDto);
