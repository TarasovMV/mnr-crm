import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Vehicle} from '@mnr-crm/shared-models';
import {DEFAULT_SCHEMA_PARAMS} from './consts';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class VehicleDto extends Document implements Vehicle {
    @Prop()
    brand: string;

    @Prop()
    model: string;

    @Prop()
    number: string;

    @Prop()
    trail: string;

    @Prop()
    trailNumber: string;
}

export const VehicleSchema = SchemaFactory.createForClass(VehicleDto);
