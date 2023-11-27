import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiExpandModule,
    TuiHostedDropdownModule,
    TuiLoaderModule,
    TuiScrollbarModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { PayTypeStringifyPipeModule } from './pipes/pay-type-stringify.pipe';
import { ItemCardPropModule } from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';
import { ItemCardModule } from '@mnr-crm/client/components/item-card/item-card.module';
import { TuiReorderModule, TuiTableModule } from '@taiga-ui/addon-table';
import { TuiMapperPipeModule } from '@taiga-ui/cdk';
import { ColumnNamePipeModule } from './pipes/column-name.pipe';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DateRangeComponent } from './components/date-range/date-range.component';

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
        TuiReorderModule,
        TuiExpandModule,
        ColumnNamePipeModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        ScrollingModule,
        TuiScrollbarModule,
        TuiLoaderModule,
        DateRangeComponent,
    ],
})
export class DashboardPageModule {}
