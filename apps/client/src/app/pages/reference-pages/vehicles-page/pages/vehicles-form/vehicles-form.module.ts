import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {BackNavModule} from '@mnr-crm/client/components/back-nav/back-nav.module';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {ReactiveFormsModule} from '@angular/forms';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';
import {VehiclesFormComponent} from './vehicles-form.component';


@NgModule({
    declarations: [VehiclesFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: VehiclesFormComponent}]),
        BackNavModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
    ],
})
export class VehiclesFormModule {}
