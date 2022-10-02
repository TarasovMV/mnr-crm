import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Buyer} from '@mnr-crm/shared-models';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-buyers-page',
    templateUrl: './buyers-page.component.html',
    styleUrls: ['./buyers-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyersPageComponent  extends ReferenceBase<Buyer[]> {
    protected readonly type = 'buyers';

    constructor() { super() }

    protected override load(): Observable<Buyer[]> {
        return this.apiReferences.getReference('buyers');
    }
}
