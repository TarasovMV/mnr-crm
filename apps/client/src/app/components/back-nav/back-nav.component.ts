import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'mnr-crm-back-nav',
    templateUrl: './back-nav.component.html',
    styleUrls: ['./back-nav.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackNavComponent {}
