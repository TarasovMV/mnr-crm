import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerDto, BuyerSchema } from '../schemas/buyer.schema';
import { ProductDto, ProductSchema } from '../schemas/product.schema';
import { ProviderDto, ProviderSchema } from '../schemas/provider.schema';
import { UserDto, UserSchema } from '../schemas/user.schema';
import { VehicleDto, VehicleSchema } from '../schemas/vehicle.schema';
import { VendorDto, VendorSchema } from '../schemas/vendor.schema';
import { dbNameMapper } from '../utils/db-name.util';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import {HttpModule} from '@nestjs/axios';

@Module({
    providers: [ReferencesService],
    controllers: [ReferencesController],
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            { name: dbNameMapper[BuyerDto.name], schema: BuyerSchema },
            { name: dbNameMapper[ProductDto.name], schema: ProductSchema },
            { name: dbNameMapper[ProviderDto.name], schema: ProviderSchema },
            { name: dbNameMapper[UserDto.name], schema: UserSchema },
            { name: dbNameMapper[VehicleDto.name], schema: VehicleSchema },
            { name: dbNameMapper[VendorDto.name], schema: VendorSchema },
        ]),
    ],
})
export class ReferencesModule {}
