import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Income} from '@mnr-crm/shared-models';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';

@Component({
    selector: 'mnr-crm-income-page',
    templateUrl: './income-page.component.html',
    styleUrls: ['./income-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomePageComponent extends ReferenceBase<Income[]> {
    constructor(
        private readonly apiReferences: ApiReferencesService,
    ) {
        super();
    }

    protected override load(): Observable<Income[]> {
        return this.apiReferences.getReference('incomes');
    }
}
