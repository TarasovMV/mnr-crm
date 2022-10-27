import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page.component';
import { RouterModule } from '@angular/router';
import { TuiTextAreaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { BackNavModule } from '@mnr-crm/client/components/back-nav/back-nav.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatMessageModule } from './components/chat-message/chat-message.module';

@NgModule({
    declarations: [ChatPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: ChatPageComponent }]),
        TuiTextAreaModule,
        TuiButtonModule,
        TuiTextfieldControllerModule,
        BackNavModule,
        FormsModule,
        ReactiveFormsModule,
        ChatMessageModule,
    ],
})
export class ChatPageModule {}
