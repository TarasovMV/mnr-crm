import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsFormComponent } from './vendors-form.component';
import {RouterModule} from '@angular/router';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPhoneModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';


@NgModule({
    declarations: [VendorsFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: VendorsFormComponent}]),
        BackNavModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputPhoneModule,
        TuiButtonModule,
    ],
})
export class VendorsFormModule {}
