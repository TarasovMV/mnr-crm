import {UserDto} from '../schemas/user.schema';
import {BuyerDto} from '../schemas/buyer.schema';
import {IncomeDto} from '../schemas/income.schema';
import {ProductDto} from '../schemas/product.schema';
import {ProviderDto} from '../schemas/provider.schema';
import {VehicleDto} from '../schemas/vehicle.schema';
import {VendorDto} from '../schemas/vendor.schema';

export const dbNameMapper = {
    [UserDto.name]: 'users',
    [BuyerDto.name]: 'buyers',
    [IncomeDto.name]: 'incomes',
    [ProductDto.name]: 'products',
    [ProviderDto.name]: 'providers',
    [VehicleDto.name]: 'vehicles',
    [VendorDto.name]: 'vendors',
} as const;
