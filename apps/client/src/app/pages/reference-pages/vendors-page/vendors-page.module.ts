import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsPageComponent } from './vendors-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

@NgModule({
    declarations: [VendorsPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: VendorsPageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/vendors-form/vendors-form.module').then(m => m.VendorsFormModule)
            },
        ]),
        TuiButtonModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class VendorsPageModule {}
