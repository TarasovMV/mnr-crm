import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Vendor} from '@mnr-crm/shared-models';
import {DEFAULT_SCHEMA_PARAMS} from './consts';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class VendorDto extends Document implements Vendor {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    inn: string;

    @Prop()
    kpp: string;

    @Prop()
    ogrn: string;

    @Prop()
    okpo: string;

    @Prop()
    phone: string;
}

export const VendorSchema = SchemaFactory.createForClass(VendorDto);
