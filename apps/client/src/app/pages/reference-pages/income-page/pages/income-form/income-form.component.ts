import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {Income} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDay, TuiDestroyService} from '@taiga-ui/cdk';

@Component({
    selector: 'mnr-crm-income-form',
    templateUrl: './income-form.component.html',
    styleUrls: ['./income-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeFormComponent extends ReferenceFormBase<Income> {
    readonly form = new FormGroup({
        company: new FormControl('', [Validators.required]),
        fuel: new FormControl('', [Validators.required]),
        count: new FormControl('', [Validators.required]),
        density: new FormControl('', [Validators.required]),
        temperature: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        date: new FormControl(TuiDay.currentLocal(), [Validators.required]),
    });

    constructor(private readonly apiReferences: ApiReferencesService) {
        super();
    }

    protected override create(data: Income): Observable<Income> {
        return this.apiReferences.createReferenceItem('incomes', data);
    }
}
