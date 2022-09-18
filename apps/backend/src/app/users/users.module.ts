import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import {LocalStrategy} from './local.strategy';
import {PassportModule} from '@nestjs/passport';
import {MongooseModule} from '@nestjs/mongoose';
import {UserDto, UserSchema} from '../schemas/user.schema';
import {dbNameMapper} from '../utils/db-name.util';

@Module({
    providers: [UsersService, JwtStrategy, LocalStrategy],
    controllers: [UsersController],
    imports: [
        MongooseModule.forFeature([{ name: dbNameMapper[UserDto.name], schema: UserSchema }]),
        PassportModule,
        JwtModule.register({secret: 'secretKey'})
    ]
})
export class UsersModule {}
