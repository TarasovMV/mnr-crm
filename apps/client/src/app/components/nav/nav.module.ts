import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule} from '@taiga-ui/core';

@NgModule({
    declarations: [NavComponent],
    imports: [CommonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule, TuiButtonModule],
    exports: [
        NavComponent
    ]
})
export class NavModule {}
