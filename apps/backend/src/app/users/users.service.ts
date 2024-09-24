import { Injectable } from '@nestjs/common';
import { UserDto } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@mnr-crm/shared-models';
import { dbNameMapper } from '../utils/db-name.util';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(dbNameMapper[UserDto.name])
        private readonly usersQuery: Model<UserDto>,
        private readonly jwtService: JwtService
    ) {}

    async createUser(user: User): Promise<string> {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const userM = new this.usersQuery({
            ...user,
            password: hashedPassword,
        });

        await userM.save();

        return this.jwtService.sign({
            id: userM.id,
            username: user.username,
            role: userM.role,
        });
    }

    async updateUser(id: string, user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);

        return this.usersQuery.findOneAndUpdate({ _id: id }, user);
    }

    async validateUser(
        username: string,
        password: string
    ): Promise<User | null> {
        const user = (
            await this.usersQuery.findOne({ username }).exec()
        )?.toObject() as User;

        console.log('auth', user);

        if (!user) {
            return null;
        }

        console.log('auth', 'exist');

        let passwordValid = false;

        try {
            passwordValid = await bcrypt.compare(password, user.password);
        } catch (e) {
            console.log('bcrypt error', e)
        }

        console.log('passwordValid');

        if (passwordValid) {
            user.token = this.jwtService.sign({
                id: user._id,
                username: user.username,
                role: user.role,
            });

            return user;
        }

        return null;
    }

    async jwtValidateUser(id: string): Promise<User | null> {
        const user = await this.usersQuery.findById(id);

        if (!user) {
            return null;
        }

        return this.handleUser(user);
    }

    private handleUser(user: UserDto): User {
        user.password = undefined;

        return user;
    }
}
