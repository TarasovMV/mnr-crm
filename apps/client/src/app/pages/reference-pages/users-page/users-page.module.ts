import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import {RouterModule} from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';

@NgModule({
    declarations: [UsersPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: UsersPageComponent, pathMatch: 'full'},
            {path: ':id', loadChildren: () => import('./pages/users-form/users-form.module').then(m => m.UsersFormModule)},
        ]),
        TuiButtonModule,
    ],
})
export class UsersPageModule {}
