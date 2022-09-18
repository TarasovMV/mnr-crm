import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {BuyerDto, BuyerSchema} from '../schemas/buyer.schema';
import {IncomeDto, IncomeSchema} from '../schemas/income.schema';
import {ProductDto, ProductSchema} from '../schemas/product.schema';
import {ProviderDto, ProviderSchema} from '../schemas/provider.schema';
import {UserDto, UserSchema} from '../schemas/user.schema';
import {VehicleDto, VehicleSchema} from '../schemas/vehicle.schema';
import {VendorDto, VendorSchema} from '../schemas/vendor.schema';
import {dbNameMapper} from '../utils/db-name.util';
import {ReferencesController} from './references.controller';
import {ReferencesService} from './references.service';


@Module({
    providers: [ReferencesService],
    controllers: [ReferencesController],
    imports: [
        MongooseModule.forFeature([
            { name: dbNameMapper[BuyerDto.name], schema: BuyerSchema },
            { name: dbNameMapper[IncomeDto.name], schema: IncomeSchema },
            { name: dbNameMapper[ProductDto.name], schema: ProductSchema },
            { name: dbNameMapper[ProviderDto.name], schema: ProviderSchema },
            { name: dbNameMapper[UserDto.name], schema: UserSchema },
            { name: dbNameMapper[VehicleDto.name], schema: VehicleSchema },
            { name: dbNameMapper[VendorDto.name], schema: VendorSchema },
        ]),
    ]
})
export class ReferencesModule {}
