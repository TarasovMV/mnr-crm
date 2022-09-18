import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Buyer} from '@mnr-crm/shared-models';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';

@Component({
    selector: 'mnr-crm-buyers-page',
    templateUrl: './buyers-page.component.html',
    styleUrls: ['./buyers-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyersPageComponent  extends ReferenceBase<Buyer[]> {
    constructor(
        private readonly apiReferences: ApiReferencesService,
    ) {
        super();
    }

    protected override load(): Observable<Buyer[]> {
        return this.apiReferences.getReference('buyers');
    }
}
