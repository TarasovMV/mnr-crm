import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {dbNameMapper} from '../utils/db-name.util';
import {UserDto} from '../schemas/user.schema';
import {Model} from 'mongoose';
import {BuyerDto} from '../schemas/buyer.schema';
import {ProductDto} from '../schemas/product.schema';
import {ProviderDto} from '../schemas/provider.schema';
import {VehicleDto} from '../schemas/vehicle.schema';
import {VendorDto} from '../schemas/vendor.schema';


@Injectable()
export class ReferencesService {
    readonly queryMap = {
        [dbNameMapper[BuyerDto.name]]: this.buyersQuery,
        [dbNameMapper[ProductDto.name]]: this.productsQuery,
        [dbNameMapper[ProviderDto.name]]: this.providersQuery,
        [dbNameMapper[UserDto.name]]: this.usersQuery,
        [dbNameMapper[VehicleDto.name]]: this.vehiclesQuery,
        [dbNameMapper[VendorDto.name]]: this.vendorsQuery,
    }

    constructor(
        @InjectModel(dbNameMapper[BuyerDto.name]) private readonly buyersQuery: Model<BuyerDto>,
        @InjectModel(dbNameMapper[ProductDto.name]) private readonly productsQuery: Model<ProductDto>,
        @InjectModel(dbNameMapper[ProviderDto.name]) private readonly providersQuery: Model<ProviderDto>,
        @InjectModel(dbNameMapper[UserDto.name]) private readonly usersQuery: Model<UserDto>,
        @InjectModel(dbNameMapper[VehicleDto.name]) private readonly vehiclesQuery: Model<VehicleDto>,
        @InjectModel(dbNameMapper[VendorDto.name]) private readonly vendorsQuery: Model<VendorDto>,
    ) {}

    getByType(type: keyof ReferencesService['queryMap']): Promise<unknown[]> {
        return (this.queryMap[type] as Model<unknown>).find().exec();
    }

    getItemByType(type: keyof ReferencesService['queryMap'], id: string): Promise<unknown> {
        return (this.queryMap[type] as Model<unknown>).findOne({_id: id}).exec();
    }

    updateItem<T>(type: keyof ReferencesService['queryMap'], id: string, data: T): Promise<T> {
        return (this.queryMap[type] as unknown as Model<T>).findOneAndUpdate({_id: id}, data).exec();
    }

    deleteItem(type: keyof ReferencesService['queryMap'], id: string): Promise<unknown> {
        return (this.queryMap[type] as Model<unknown>).deleteOne({_id: id}).exec();
    }

    async createByType<T>(type: keyof ReferencesService['queryMap'], doc: T): Promise<T> {
        const createdDoc = new (this.queryMap[type] as unknown as Model<T>)(doc);
        await createdDoc.save();

        return createdDoc;
    }
}
