import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersPageComponent } from './buyers-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

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
    ],
})
export class BuyersPageModule {}
