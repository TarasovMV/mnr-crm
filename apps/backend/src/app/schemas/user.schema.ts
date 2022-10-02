import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {User, UserRole} from '@mnr-crm/shared-models';

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        },
    },
})
export class UserDto extends Document implements User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    fio: string;

    @Prop()
    phone: string;

    @Prop()
    mail: string;

    @Prop({type: String})
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserDto);
