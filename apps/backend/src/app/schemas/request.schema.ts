import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {DEFAULT_SCHEMA_PARAMS} from './consts';
import {PayType, Request, RequestStatus} from '@mnr-crm/shared-models';
import {UserDto} from './user.schema';
import {dbNameMapper} from '../utils/db-name.util';
import {VendorDto} from './vendor.schema';
import {BuyerDto} from './buyer.schema';
import {ProductDto} from './product.schema';
import {VehicleDto} from './vehicle.schema';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class RequestDto extends Document implements Request {
    @Prop()
    autoId: number;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[UserDto.name] })
    responsible: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[VendorDto.name] })
    vendor: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[BuyerDto.name] })
    buyer: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[ProductDto.name] })
    product: string;

    @Prop()
    count: number;

    @Prop()
    weight: number;

    @Prop()
    price: number;

    @Prop({get: (price: number, count: number) => price * count})
    cost: number;

    @Prop({type: String})
    payType: PayType;

    @Prop({type: String})
    status: RequestStatus;

    @Prop()
    density: number;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[VehicleDto.name] })
    vehicle: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[UserDto.name] })
    driver: string;

    @Prop()
    date: Date;

    @Prop()
    createdAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(RequestDto);
