import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '@mnr-crm/shared-models';
import {DEFAULT_SCHEMA_PARAMS} from './consts';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class ProductDto extends Document implements Product {
    @Prop()
    name: string;

    @Prop()
    shortName: string;

    @Prop()
    code: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDto);
