import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ReferencesModule} from './references/references.module';
import {RequestModule} from './request/request.module';

@Module({
    imports: [
        UsersModule,
        ReferencesModule,
        RequestModule,
        MongooseModule.forRoot('mongodb://localhost:27017/mnr-crm')
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
