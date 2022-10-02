import {getConnectionToken, MongooseModule} from '@nestjs/mongoose';
import {RequestDto, RequestSchema} from '../schemas/request.schema';
import {Module} from '@nestjs/common';
import {RequestController} from './request.controller';
import * as AutoIncrementFactory from 'mongoose-sequence';
import {Connection} from 'mongoose';


@Module({
    controllers: [RequestController],
    imports: [
        MongooseModule.forFeatureAsync([{
            name: RequestDto.name,
            useFactory: async (connection: Connection) => {
                const schema = RequestSchema;
                const AutoIncrement = AutoIncrementFactory(connection);
                schema.plugin(AutoIncrement, {inc_field: 'incId', start_seq: 6000});
                return schema;
            },
            inject: [getConnectionToken()],
        }]),

    ],
})
export class RequestModule {
}
