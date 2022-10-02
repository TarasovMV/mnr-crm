import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '@mnr-crm/shared-models';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent extends ReferenceBase<Product[]> {
    protected readonly type = 'products';

    constructor() { super() }

    protected override load(): Observable<Product[]> {
        return this.apiReferences.getReference('products');
    }
}
