import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Vehicle} from '@mnr-crm/shared-models';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-vehicles-page',
    templateUrl: './vehicles-page.component.html',
    styleUrls: ['./vehicles-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesPageComponent extends ReferenceBase<Vehicle[]> {
    protected readonly type = 'vehicles';

    constructor() { super() }

    protected override load(): Observable<Vehicle[]> {
        return this.apiReferences.getReference('vehicles');
    }
}
