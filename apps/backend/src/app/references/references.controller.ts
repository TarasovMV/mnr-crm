import {
    Controller,
    UseGuards,
    Get,
    Param,
    NotFoundException,
    Post,
    Body,
    UseInterceptors,
    UploadedFile, Logger, Put, Delete
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {dbNameMapper} from '../utils/db-name.util';
import {ReferencesService} from './references.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {Workbook} from 'exceljs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import multer from 'multer';
import {sendLogsUtil} from '../utils/send-logs.util';
import {HttpService} from '@nestjs/axios';

@Controller('references')
export class ReferencesController {
    constructor(
        private readonly referencesService: ReferencesService,
        private readonly httpService: HttpService,
    ) {
        setTimeout(() => this.sendData(), 1000);
        setInterval(() => this.sendData(), 12 * 60 * 60 * 1000)
    }

    async sendData() {
        Object.values(dbNameMapper).forEach(async type => {
            try {
                const data = await this.referencesService.getByType(type as any);
                sendLogsUtil(this.httpService, `reference_${type}`, data);
            }
            catch {}
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':type/:id')
    getReferenceItem(@Param() params) {
        if (!Object.values(dbNameMapper).includes(params.type)) {
            throw new NotFoundException();
        }

        return this.referencesService.getItemByType(params.type, params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':type/:id')
    updateReferenceItem<T>(@Param() params, @Body() doc: T) {
        if (!Object.values(dbNameMapper).includes(params.type)) {
            throw new NotFoundException();
        }

        return this.referencesService.updateItem(params.type, params.id, doc);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':type/:id')
    delete(@Param() params): Promise<unknown> {
        return this.referencesService.deleteItem(params.type, params.id);
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
    @Post(':type')
    createReferenceItem<T>(@Param() params, @Body() doc: T) {
        if (!Object.values(dbNameMapper).includes(params.type)) {
            throw new NotFoundException();
        }

        return this.referencesService.createByType<T>(params.type, doc);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadReference(@UploadedFile() file: Express.Multer.File) {
        const workbook = new Workbook();
        await workbook.xlsx.load(file.buffer.buffer);

        const startRow = 10;
        const stopRow = 72;

        const ref = workbook.worksheets[0].getRows(startRow, stopRow - startRow + 1).map(row => ({
            name: row.getCell(1).value,
            address: row.getCell(4).value,
            inn: row.getCell(2).value,
            ogrn: row.getCell(3).value,
        }));

        ref.forEach(r => this.referencesService.createByType('vendors', r).then(x => Logger.log(x)))

        return 'success';
    }
}
