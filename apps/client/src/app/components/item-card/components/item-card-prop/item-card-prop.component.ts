import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'mnr-crm-item-card-prop',
    templateUrl: './item-card-prop.component.html',
    styleUrls: ['./item-card-prop.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardPropComponent {
    @Input() label!: string;
    @Input() description!: string | number | null | undefined;
}
