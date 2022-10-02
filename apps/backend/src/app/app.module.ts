import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ReferencesModule} from './references/references.module';
import {RequestModule} from './request/request.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import * as path from 'path';
import {IncomesModule} from './incomes/incomes.module';
import {argsConfig} from './utils/args-config.util';

const dbUrl = argsConfig<string>('DB_URL');

@Module({
    imports: [
        UsersModule,
        ReferencesModule,
        RequestModule,
        IncomesModule,
        MongooseModule.forRoot(dbUrl),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'assets'),
            serveStaticOptions: {
                index: false,
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
