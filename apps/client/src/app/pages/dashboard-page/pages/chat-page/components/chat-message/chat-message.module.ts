import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from './chat-message.component';

@NgModule({
    declarations: [ChatMessageComponent],
    imports: [CommonModule],
    exports: [ChatMessageComponent],
})
export class ChatMessageModule {}
