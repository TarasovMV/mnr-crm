import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomesFormComponent } from './incomes-form.component';
import {RouterModule} from '@angular/router';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';
import {TuiLetModule} from '@taiga-ui/cdk';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiMobileCalendarDialogModule} from '@taiga-ui/addon-mobile';
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule, TuiFieldErrorPipeModule,
    TuiFilterByInputPipeModule, TuiInputDateModule, TuiInputNumberModule, TuiSelectModule,
    TuiStringifyContentPipeModule
} from '@taiga-ui/kit';
import {TuiButtonModule, TuiDataListModule, TuiErrorModule} from '@taiga-ui/core';

@NgModule({
    declarations: [IncomesFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: IncomesFormComponent}]),
        BackNavModule,
        ReactiveFormsModule,
        TuiLetModule,
        TuiComboBoxModule,
        TuiDataListWrapperModule,
        TuiFilterByInputPipeModule,
        TuiStringifyContentPipeModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputNumberModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiMobileCalendarDialogModule,
        TuiInputDateModule,
        TuiButtonModule
    ],
})
export class IncomesFormModule {}
