import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesPageComponent } from './vehicles-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

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
    ],
})
export class VehiclesPageModule {}
