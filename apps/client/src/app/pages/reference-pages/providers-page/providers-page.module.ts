import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersPageComponent } from './providers-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

@NgModule({
    declarations: [ProvidersPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ProvidersPageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/providers-form/providers-form.module').then(m => m.ProvidersFormModule)
            },
        ]),
        TuiButtonModule,
    ],
})
export class ProvidersPageModule {}
