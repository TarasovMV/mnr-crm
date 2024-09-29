import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule} from '@taiga-ui/core';
import {
    ChangePasswordDialogModule
} from '@mnr-crm/client/components/change-password-dialog/change-password-dialog.module';

@NgModule({
    declarations: [NavComponent],
    imports: [CommonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule, TuiButtonModule, ChangePasswordDialogModule],
    exports: [
        NavComponent
    ]
})
export class NavModule {}
