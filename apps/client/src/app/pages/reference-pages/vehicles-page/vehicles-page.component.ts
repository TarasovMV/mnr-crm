import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Vehicle} from '@mnr-crm/shared-models';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';

@Component({
    selector: 'mnr-crm-vehicles-page',
    templateUrl: './vehicles-page.component.html',
    styleUrls: ['./vehicles-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesPageComponent extends ReferenceBase<Vehicle[]> {
    constructor(
        private readonly apiReferences: ApiReferencesService,
    ) {
        super();
    }

    protected override load(): Observable<Vehicle[]> {
        return this.apiReferences.getReference('vehicles');
    }
}
