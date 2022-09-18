import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Buyer, Vendor} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-vendors-form',
    templateUrl: './vendors-form.component.html',
    styleUrls: ['./vendors-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorsFormComponent extends ReferenceFormBase<Vendor> {
    readonly form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        inn: new FormControl('', [Validators.required]),
        kpp: new FormControl('', [Validators.required]),
        ogrn: new FormControl('', [Validators.required]),
        okpo: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
    });

    constructor(private readonly apiReferences: ApiReferencesService) {
        super();
    }

    protected override create(data: Buyer): Observable<Vendor> {
        return this.apiReferences.createReferenceItem('vendors', data);
    }
}
