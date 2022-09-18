import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page.component';
import {RouterModule} from '@angular/router';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiIslandModule, TuiSelectModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: LoginPageComponent}]),
        TuiIslandModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
    ],
})
export class LoginPageModule {
}
