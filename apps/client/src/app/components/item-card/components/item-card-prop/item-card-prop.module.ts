import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardPropComponent } from './item-card-prop.component';

@NgModule({
    declarations: [ItemCardPropComponent],
    imports: [CommonModule],
    exports: [
        ItemCardPropComponent
    ]
})
export class ItemCardPropModule {}
