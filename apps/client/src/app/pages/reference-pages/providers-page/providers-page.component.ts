import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Provider} from '@mnr-crm/shared-models';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-providers-page',
    templateUrl: './providers-page.component.html',
    styleUrls: ['./providers-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvidersPageComponent extends ReferenceBase<Provider[]> {
    protected readonly type = 'providers';

    constructor() { super() }

    protected override load(): Observable<Provider[]> {
        return this.apiReferences.getReference('providers');
    }
}
