import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RequestStatus } from '@mnr-crm/shared-models';
import { requestStatusMapper } from '../../pages/dashboard-page/utils';

@Component({
    selector: 'mnr-crm-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
    @Input() status: RequestStatus | undefined;

    get styleClass(): string {
        if (!this.status) {
            return '';
        }

        return `color_${requestStatusMapper[this.status].color}`;
    }
}
