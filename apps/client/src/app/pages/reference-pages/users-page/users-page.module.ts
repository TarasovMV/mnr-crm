import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import {RouterModule} from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {UserRoleStringifyPipeModule} from './pipes/user-role-stringify.pipe';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

@NgModule({
    declarations: [UsersPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: UsersPageComponent, pathMatch: 'full'},
            {
                path: ':id',
                loadChildren: () => import('./pages/users-form/users-form.module').then(m => m.UsersFormModule)
            },
        ]),
        TuiButtonModule,
        UserRoleStringifyPipeModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class UsersPageModule {}
