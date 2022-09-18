import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Provider} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-providers-form',
    templateUrl: './providers-form.component.html',
    styleUrls: ['./providers-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvidersFormComponent extends ReferenceFormBase<Provider> {
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

    protected override create(data: Provider): Observable<Provider> {
        return this.apiReferences.createReferenceItem('providers', data);
    }
}
