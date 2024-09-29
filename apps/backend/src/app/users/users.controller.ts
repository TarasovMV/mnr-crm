import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    HttpCode,
    Put,
    Param,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from '@nestjs/passport';
import {User} from '@mnr-crm/shared-models';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createUser(@Body() req) {
        const token = await this.usersService.createUser(req);

        return {token};
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    async updateUser(@Param() params: {id: string}, @Body() req: User) {
        return this.usersService.updateUser(params.id, req)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async deleteUser(@Body() req) {
        const token = await this.usersService.createUser(req);

        return {token};
    }

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('current')
    getUserInfo(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('change-password')
    async changePassword(@Request() req, @Body() body) {
        console.log('change-password', req.user)

        const isValid = await this.usersService.validateUser(req.user.username, body.password);
        if (!isValid) {
            throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
        }
        await this.usersService.changePassword(req.user.id, body.newPassword);

        return req.user;
    }
}
