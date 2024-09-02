import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PayType, Request, RequestStatus } from '@mnr-crm/shared-models';
import { UserDto } from './user.schema';
import { dbNameMapper } from '../utils/db-name.util';
import { VendorDto } from './vendor.schema';
import { BuyerDto } from './buyer.schema';
import { ProductDto } from './product.schema';
import { VehicleDto } from './vehicle.schema';

@Schema({
    toObject: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            ret.cost = ret.price * ret.count;
            ret.weight = (ret.count * ret.density) / 1000;
            return ret;
        },
    },
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            ret.cost = ret.price * ret.count;
            ret.weight = (ret.count * ret.density) / 1000;
            return ret;
        },
    },
})
export class RequestDto extends Document implements Request {
    @Prop()
    incId: number;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[UserDto.name] })
    responsible: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[VendorDto.name] })
    vendor: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[BuyerDto.name] })
    buyer: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[BuyerDto.name] })
    payer: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[ProductDto.name] })
    product: string;

    @Prop()
    count: number;

    @Prop({ get: (count: number, density: number) => count * density })
    weight: number;

    @Prop()
    price: number;

    @Prop({ get: (price: number, count: number) => price * count })
    cost: number;

    @Prop({ type: String })
    payType: PayType;

    @Prop({ type: String, default: RequestStatus.Framed.toString() })
    status: RequestStatus;

    @Prop()
    density: number;

    @Prop()
    temperature: number;

    @Prop()
    plomb: string;

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
