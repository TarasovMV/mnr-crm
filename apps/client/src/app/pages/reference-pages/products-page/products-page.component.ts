import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '@mnr-crm/shared-models';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';

@Component({
    selector: 'mnr-crm-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent extends ReferenceBase<Product[]> {
    constructor(
        private readonly apiReferences: ApiReferencesService,
    ) {
        super();
    }

    protected override load(): Observable<Product[]> {
        return this.apiReferences.getReference('products');
    }
}
