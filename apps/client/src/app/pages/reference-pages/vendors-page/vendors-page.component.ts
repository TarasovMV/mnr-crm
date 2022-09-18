import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Vendor} from '@mnr-crm/shared-models';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';

@Component({
    selector: 'mnr-crm-vendors-page',
    templateUrl: './vendors-page.component.html',
    styleUrls: ['./vendors-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorsPageComponent extends ReferenceBase<Vendor[]> {
    constructor(
        private readonly apiReferences: ApiReferencesService,
    ) {
        super();
    }

    protected override load(): Observable<Vendor[]> {
        return this.apiReferences.getReference('vendors');
    }
}
