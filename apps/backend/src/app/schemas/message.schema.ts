import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message, MessageType } from '@mnr-crm/shared-models';
import { DEFAULT_SCHEMA_PARAMS } from './consts';
import { dbNameMapper } from '../utils/db-name.util';
import { UserDto } from './user.schema';

@Schema(DEFAULT_SCHEMA_PARAMS)
export class MessageDto extends Document implements Message {
    @Prop({ type: String })
    type: MessageType;

    @Prop()
    text?: string;

    @Prop()
    imgSrc?: string;

    @Prop({ type: Types.ObjectId, ref: dbNameMapper[UserDto.name] })
    author: string;

    @Prop()
    timestamp: Date;

    @Prop()
    requestId: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDto);
