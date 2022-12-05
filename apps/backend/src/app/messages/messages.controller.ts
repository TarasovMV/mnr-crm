import {
    Body,
    Controller,
    Get,
    Logger,
    MessageEvent,
    Param,
    Post,
    Request,
    Sse,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Message, MessageType } from '@mnr-crm/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageDto } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { filter, map, Observable, Subject } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs';

const PATH = path.join(__dirname, 'chat-images');

@Controller('messages')
export class MessagesController {
    readonly message$ = new Subject<Message>();

    constructor(
        @InjectModel(MessageDto.name)
        private readonly messageQuery: Model<MessageDto>
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('upload-image/:requestId')
    @UseInterceptors(FileInterceptor('file', { dest: PATH }))
    async uploadImage(
        @Request() req,
        @Param() params,
        @UploadedFile() file: Express.Multer.File
    ) {
        const message = new this.messageQuery({
            type: MessageType.Image,
            author: req.user.id,
            imgSrc: file.filename,
            timestamp: new Date(),
            requestId: params.requestId,
        });

        message.save();

        this.message$.next(message);

        return message;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('text/:requestId')
    async text(
        @Request() req,
        @Param() params,
        @Body() body: { message: string }
    ) {
        const message = new this.messageQuery({
            type: MessageType.Text,
            author: req.user.id,
            text: body.message,
            timestamp: new Date(),
            requestId: params.requestId,
        });

        message.save();

        this.message$.next(message);

        return message;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('request/:requestId')
    async getByRequest(@Param() params) {
        return this.messageQuery.find({ requestId: params.requestId }).exec();
    }

    // TODO: add polyfill to auth
    @Sse('sse/:requestId')
    listenMessages(@Param() params): Observable<MessageEvent> {
        return this.message$.pipe(
            filter((m) => m.requestId === params.requestId),
            map((m) => ({ data: m }))
        );
    }

    // @Post('upload-image2')
    // @UseInterceptors(FileInterceptor('file', { dest: PATH }))
    // async uploadImage2(
    //     @Request() req,
    //     @UploadedFile() file: Express.Multer.File
    // ) {
    //     return file;
    // }
    //
    // @Get('images')
    // async getImages(@Request() req) {
    //     // const images = await this.messageQuery.find({ type: 'IMAGE' }).count();
    //     // return images;
    //     return this.messageQuery.updateMany(
    //         { type: 'IMAGE' },
    //         { $set: { imgSrc: '' } }
    //     );
    //
    //     // for (const img of images) {
    //     //     const imgParts = img.imgSrc.split(',');
    //     //     imgParts.shift();
    //     //     const image = imgParts.join('');
    //     //
    //     //     const buff = Buffer.from(image, 'base64');
    //     //
    //     //     fs.writeFile(path.join(PATH, img.id), buff, () => Logger.log('ok'));
    //     // }
    // }
}
