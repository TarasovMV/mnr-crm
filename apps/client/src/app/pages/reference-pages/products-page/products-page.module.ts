import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

@NgModule({
    declarations: [ProductsPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ProductsPageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/products-form/products-form.module').then(m => m.ProductsFormModule)
            },
        ]),
        TuiButtonModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class ProductsPageModule {}
