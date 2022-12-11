import {
    Body,
    Controller,
    Get,
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
import { Message, MessageType, VAPID_KEY } from '@mnr-crm/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageDto } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { filter, map, Observable, Subject } from 'rxjs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpush = require('web-push');
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

    @Post('push')
    async sendPush(@Body() sub) {
        // const sub = {
        //     endpoint:
        //         'https://fcm.googleapis.com/fcm/send/fO63wrLx6qM:APA91bGVXljGgT8cDkZg7aajznd3a0mVj2t1CDjqLI1rF6ptomTLI1EounBcCnrZp_yaYKPWymmkEpSRP2J7B5QNkbI8wW1ebXIuIlOa_PN45ZJaLNXMjFL4CXtSDgqMJ5padrwTlKn1',
        //     expirationTime: null,
        //     keys: {
        //         p256dh: 'BG3M5DpSsVGIT0kSBe63x-_Sc-AFulboGdWpFlPfZsGDNbAq6DUrZPXsFibun1Ivie8kCG7ZCCwo9-zhfUmiScU',
        //         auth: 'vHLBC0Anq1zoaQcGKClhjA',
        //     },
        // };

        const notificationPayload = {
            notification: {
                title: 'MNR-CRM News',
                body: 'Newsletter Available!',
                icon: 'assets/icon-48x48.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1,
                },
                actions: [
                    {
                        action: 'explore',
                        title: 'Go to the site',
                    },
                ],
            },
        };

        const options = {
            vapidDetails: {
                subject: 'mailto:example@yourdomain.org',
                publicKey: VAPID_KEY,
                privateKey: 'S3aBlDhDrkNlGcIalHP8-t6UbEtlpHpBmR7CBm8etSQ',
            },
        };

        webpush.setVapidDetails(
            'mailto:example@yourdomain.org',
            VAPID_KEY,
            'S3aBlDhDrkNlGcIalHP8-t6UbEtlpHpBmR7CBm8etSQ'
        );

        const res = await webpush.sendNotification(
            sub,
            JSON.stringify(notificationPayload),
            options
        );
        return res;
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
