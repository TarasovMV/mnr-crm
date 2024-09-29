import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';
import {
    ChangePasswordDialogComponent
} from './change-password-dialog.component';

@NgModule({
    declarations: [ChangePasswordDialogComponent],
    imports: [
        CommonModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputPasswordModule,
    ],
    exports: [ChangePasswordDialogComponent]
})
export class ChangePasswordDialogModule {
}
