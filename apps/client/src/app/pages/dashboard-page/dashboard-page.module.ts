import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { PayTypeStringifyPipeModule } from './pipes/pay-type-stringify.pipe';
import { ItemCardPropModule } from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';
import { ItemCardModule } from '@mnr-crm/client/components/item-card/item-card.module';

@NgModule({
    declarations: [DashboardPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardPageComponent,
                pathMatch: 'full',
            },
            {
                path: ':id',
                loadChildren: () =>
                    import('./pages/request-form/request-form.module').then(
                        (m) => m.RequestFormModule
                    ),
            },
        ]),
        TuiButtonModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        PayTypeStringifyPipeModule,
        ItemCardPropModule,
        ItemCardModule,
    ],
})
export class DashboardPageModule {}
