import {Body, Controller, Post, UseGuards, Request, Get, HttpCode} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from '@nestjs/passport';

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
}
