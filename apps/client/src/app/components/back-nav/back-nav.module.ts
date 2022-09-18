import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackNavComponent } from './back-nav.component';
import {TuiSvgModule} from '@taiga-ui/core';

@NgModule({
    declarations: [BackNavComponent],
    imports: [CommonModule, TuiSvgModule],
    exports: [
        BackNavComponent
    ]
})
export class BackNavModule {}
