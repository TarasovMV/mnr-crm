import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomesPageComponent } from './incomes-page.component';
import {RouterModule} from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {IncomeTypeStringifyPipeModule} from './pipes/income-type-stringify.pipe';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

@NgModule({
    declarations: [IncomesPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: IncomesPageComponent,
                pathMatch: 'full'
            },
            {
                path: ':id',
                loadChildren: () => import('./pages/incomes-form/incomes-form.module').then(m => m.IncomesFormModule),
            },
        ]),
        TuiButtonModule,
        TuiHostedDropdownModule,
        IncomeTypeStringifyPipeModule,
        TuiDataListModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class IncomesPageModule {}
