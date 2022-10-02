import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Vendor} from '@mnr-crm/shared-models';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-vendors-page',
    templateUrl: './vendors-page.component.html',
    styleUrls: ['./vendors-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorsPageComponent extends ReferenceBase<Vendor[]> {
    protected readonly type = 'vendors';

    constructor() { super() }

    protected override load(): Observable<Vendor[]> {
        return this.apiReferences.getReference('vendors');
    }
}
