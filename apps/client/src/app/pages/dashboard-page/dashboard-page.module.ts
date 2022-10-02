import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import {RouterModule} from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {PayTypeStringifyPipeModule} from './pipes/pay-type-stringify.pipe';

@NgModule({
    declarations: [DashboardPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardPageComponent,
                pathMatch: 'full'
            },
            {
                path: ':id',
                loadChildren: () => import('./pages/request-form/request-form.module').then(m => m.RequestFormModule),
            },
        ]),
        TuiButtonModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        PayTypeStringifyPipeModule,
    ],
})
export class DashboardPageModule {}
