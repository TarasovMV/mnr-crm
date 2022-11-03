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
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiMapperPipeModule } from '@taiga-ui/cdk';

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
                path: ':id/chat',
                loadChildren: () =>
                    import('./pages/chat-page/chat-page.module').then(
                        (m) => m.ChatPageModule
                    ),
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
        TuiTableModule,
        TuiMapperPipeModule,
    ],
})
export class DashboardPageModule {}
