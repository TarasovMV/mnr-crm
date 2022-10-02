import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersPageComponent } from './providers-page.component';
import { RouterModule } from '@angular/router';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule} from '@taiga-ui/core';
import {ItemCardModule} from '@mnr-crm/client/components/item-card/item-card.module';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';

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
        TuiDataListModule,
        TuiHostedDropdownModule,
        ItemCardModule,
        ItemCardPropModule,
    ],
})
export class ProvidersPageModule {}
