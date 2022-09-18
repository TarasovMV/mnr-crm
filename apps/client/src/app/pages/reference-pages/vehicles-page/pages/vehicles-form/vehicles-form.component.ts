import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Vehicle} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDay, TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-vehicles-form',
    templateUrl: './vehicles-form.component.html',
    styleUrls: ['./vehicles-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesFormComponent extends ReferenceFormBase<Vehicle> {
    readonly form = new FormGroup({
        brand: new FormControl('', [Validators.required]),
        model: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        trail: new FormControl('', [Validators.required]),
        trailNumber: new FormControl('', [Validators.required]),
    });

    constructor(private readonly apiReferences: ApiReferencesService) {
        super();
    }

    protected override create(data: Vehicle): Observable<Vehicle> {
        return this.apiReferences.createReferenceItem('vehicles', data);
    }
}
