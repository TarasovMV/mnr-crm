import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card.component';
import {ItemCardPropModule} from '@mnr-crm/client/components/item-card/components/item-card-prop/item-card-prop.module';
import {TuiIslandModule} from '@taiga-ui/kit';

@NgModule({
    declarations: [ItemCardComponent],
    imports: [CommonModule, ItemCardPropModule, TuiIslandModule],
    exports: [
        ItemCardComponent
    ]
})
export class ItemCardModule {}
