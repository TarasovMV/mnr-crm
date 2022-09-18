import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {UsersService} from './users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: any) {
        const user = await this.usersService.jwtValidateUser(payload.id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
