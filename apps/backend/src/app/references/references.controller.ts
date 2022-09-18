import {Controller, UseGuards, Get, Param, NotFoundException, Post, Body} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {dbNameMapper} from '../utils/db-name.util';
import {ReferencesService} from './references.service';

@Controller('references')
export class ReferencesController {
    constructor(private readonly referencesService: ReferencesService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':type')
    getReference(@Param() params) {
        if (!Object.values(dbNameMapper).includes(params.type)) {
            throw new NotFoundException();
        }

        return this.referencesService.getByType(params.type);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':type/create')
    createReferenceItem<T>(@Param() params, @Body() doc: T) {
        if (!Object.values(dbNameMapper).includes(params.type)) {
            throw new NotFoundException();
        }

        return this.referencesService.createByType<T>(params.type, doc);
    }
}
