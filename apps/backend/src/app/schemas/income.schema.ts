import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Income } from '@mnr-crm/shared-models';
import {DEFAULT_SCHEMA_PARAMS} from './consts';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class IncomeDto extends Document implements Income {
    @Prop()
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
    type: string;

    @Prop()
    date: Date;
}

export const IncomeSchema = SchemaFactory.createForClass(IncomeDto);
