import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Product} from '@mnr-crm/shared-models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-products-form',
    templateUrl: './products-form.component.html',
    styleUrls: ['./products-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormComponent extends ReferenceFormBase<Product> {
    protected readonly type = 'products';

    readonly form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        shortName: new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required]),
    });

    constructor() { super() }
}
