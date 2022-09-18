import {Directive, inject} from '@angular/core';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {Observable, takeUntil} from 'rxjs';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {FormGroup} from '@angular/forms';
import {TuiDestroyService} from '@taiga-ui/cdk';

@Directive()
export abstract class ReferenceFormBase<T> {
    protected readonly abstract form: FormGroup;

    protected readonly destroy$ = inject(TuiDestroyService);
    private readonly alertService = inject(TuiAlertService);
    private readonly referencesNavigator = inject(ReferencesNavigationService);

    submit(): void {
        if (!this.form.valid) {
            return this.form.markAllAsTouched();
        }

        const data = this.form.getRawValue() as unknown as T;
        this.create(data)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                () => {
                    this.alertService
                        .open('Запись добавлена успешно', {status: TuiNotification.Success})
                        .subscribe();
                    this.back();
                },
                () => this.alertService
                    .open('Ошибка при создании записи', {status: TuiNotification.Error})
                    .subscribe(),
            );
    }

    back(): void {
        this.referencesNavigator.backToMain();
    }

    protected abstract create(data: T): Observable<T>;
}
