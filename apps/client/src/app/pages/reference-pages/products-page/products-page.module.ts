import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

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
    ],
})
export class ProductsPageModule {}
