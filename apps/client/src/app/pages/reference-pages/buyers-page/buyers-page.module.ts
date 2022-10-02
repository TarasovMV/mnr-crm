import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersPageComponent } from './buyers-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

@NgModule({
    declarations: [BuyersPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: BuyersPageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/buyers-form/buyers-form.module').then(m => m.BuyersFormModule)
            },
        ]),
        TuiButtonModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class BuyersPageModule {}
