import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestFormComponent } from './request-form.component';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputDateModule,
    TuiInputModule, TuiInputNumberModule,
    TuiInputPhoneModule, TuiSelectModule, TuiStringifyContentPipeModule
} from '@taiga-ui/kit';
import {TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {RouterModule} from '@angular/router';
import {TuiLetModule} from '@taiga-ui/cdk';

@NgModule({
    declarations: [RequestFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: RequestFormComponent}]),
        ReactiveFormsModule,
        BackNavModule,

        TuiInputModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputPhoneModule,
        TuiLetModule,
        TuiComboBoxModule,
        TuiDataListWrapperModule,
        TuiStringifyContentPipeModule,
        TuiFilterByInputPipeModule,
        TuiTextfieldControllerModule,
        TuiInputNumberModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiInputDateModule,
        TuiButtonModule
    ],
})
export class RequestFormModule {}
