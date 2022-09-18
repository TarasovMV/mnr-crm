import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';
import {TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputPhoneModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';
import {IncomeFormComponent} from './income-form.component';


@NgModule({
    declarations: [IncomeFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: IncomeFormComponent}]),
        BackNavModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputPhoneModule,
        TuiButtonModule,
        TuiInputDateModule,
    ],
})
export class IncomeFormModule {}
