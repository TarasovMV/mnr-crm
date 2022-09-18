import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersFormComponent} from './users-form.component';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPhoneModule, TuiSelectModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {RouterModule} from '@angular/router';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';

@NgModule({
    declarations: [UsersFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: UsersFormComponent},]),
        ReactiveFormsModule,
        TuiInputModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        BackNavModule,
        TuiInputPhoneModule
    ],
    exports: [
        UsersFormComponent,
    ],
})
export class UsersFormModule {
}
