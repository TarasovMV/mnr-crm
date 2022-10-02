import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Buyer} from '@mnr-crm/shared-models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-buyers-form',
    templateUrl: './buyers-form.component.html',
    styleUrls: ['./buyers-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyersFormComponent extends ReferenceFormBase<Buyer> {
    protected readonly type = 'buyers';

    readonly form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        inn: new FormControl('', [Validators.required]),
        kpp: new FormControl('', [Validators.required]),
        ogrn: new FormControl('', [Validators.required]),
        okpo: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
    });

    constructor() { super() }
}
