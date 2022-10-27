import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './messages.controller';
import { MessageDto, MessageSchema } from '../schemas/message.schema';

@Module({
    controllers: [MessagesController],
    imports: [
        MongooseModule.forFeature([
            { name: MessageDto.name, schema: MessageSchema },
        ]),
    ],
})
export class MessagesModule {}
