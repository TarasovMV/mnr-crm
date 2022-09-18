import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomePageComponent } from './income-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

@NgModule({
    declarations: [IncomePageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: IncomePageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/income-form/income-form.module').then(m => m.IncomeFormModule)
            },
        ]),
        TuiButtonModule,
    ],
})
export class IncomePageModule {}
