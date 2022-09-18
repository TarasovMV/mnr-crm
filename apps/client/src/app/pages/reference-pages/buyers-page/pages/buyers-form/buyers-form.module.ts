import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersFormComponent } from './buyers-form.component';
import {RouterModule} from '@angular/router';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPhoneModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';


@NgModule({
    declarations: [BuyersFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: BuyersFormComponent}]),
        BackNavModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputPhoneModule,
        TuiButtonModule,
    ],
})
export class BuyersFormModule {}
