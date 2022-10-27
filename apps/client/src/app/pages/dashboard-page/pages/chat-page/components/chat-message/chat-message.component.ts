import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageType } from '@mnr-crm/shared-models';

@Component({
    selector: 'mnr-crm-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
    @Input() type!: MessageType;
    @Input() timestamp: Date = new Date();
    @Input() text?: string;
    @Input() author?: string;
    @Input() imgSrc?: string;

    get rootClass(): string {
        const res = 'message message__';

        return res + (this.author ? 'other' : 'self');
    }
}
