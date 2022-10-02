import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesPageComponent } from './vehicles-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

@NgModule({
    declarations: [VehiclesPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: VehiclesPageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/vehicles-form/vehicles-form.module').then(m => m.VehiclesFormModule)
            },
        ]),
        TuiButtonModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class VehiclesPageModule {}
