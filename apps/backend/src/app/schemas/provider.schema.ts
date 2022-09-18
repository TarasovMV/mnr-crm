import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Provider} from '@mnr-crm/shared-models';
import {DEFAULT_SCHEMA_PARAMS} from './consts';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class ProviderDto extends Document implements Provider {
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

export const ProviderSchema = SchemaFactory.createForClass(ProviderDto);
