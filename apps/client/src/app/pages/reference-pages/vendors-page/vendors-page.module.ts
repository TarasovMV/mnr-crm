import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsPageComponent } from './vendors-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

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
    ],
})
export class VendorsPageModule {}
