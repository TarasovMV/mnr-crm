import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'mnr-crm-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {}
