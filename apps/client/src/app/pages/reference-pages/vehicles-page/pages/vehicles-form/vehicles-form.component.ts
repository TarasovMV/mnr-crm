import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Vehicle} from '@mnr-crm/shared-models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-vehicles-form',
    templateUrl: './vehicles-form.component.html',
    styleUrls: ['./vehicles-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesFormComponent extends ReferenceFormBase<Vehicle> {
    protected readonly type = 'vehicles';

    readonly form = new FormGroup({
        brand: new FormControl('', [Validators.required]),
        model: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        trail: new FormControl('', [Validators.required]),
        trailNumber: new FormControl('', [Validators.required]),
    });

    constructor() { super() }
}
