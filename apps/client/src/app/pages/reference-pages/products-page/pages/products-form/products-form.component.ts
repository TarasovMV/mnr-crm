import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Product} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';
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
    readonly form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        shortName: new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required]),
    });

    constructor(private readonly apiReferences: ApiReferencesService) {
        super();
    }

    protected override create(data: Product): Observable<Product> {
        return this.apiReferences.createReferenceItem('products', data);
    }
}
