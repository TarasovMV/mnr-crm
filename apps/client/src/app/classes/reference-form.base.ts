import {Directive, inject, OnInit} from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {BehaviorSubject, filter, map, Observable, of, switchMap, takeUntil, tap} from 'rxjs';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {FormGroup} from '@angular/forms';
import {TuiDestroyService, tuiIsPresent} from '@taiga-ui/cdk';
import {ReferencesTypes} from '@mnr-crm/shared-models';
import {ActivatedRoute} from '@angular/router';

@Directive()
export abstract class ReferenceFormBase<T> implements OnInit {
    protected readonly abstract form: FormGroup;
    protected referenceId$ = new BehaviorSubject<string | undefined>(undefined);
    protected abstract readonly type: ReferencesTypes;

    protected readonly apiReferences = inject(ApiReferencesService);
    protected readonly destroy$ = inject(TuiDestroyService);
    private readonly alertService = inject(TuiAlertService);
    private readonly referencesNavigator = inject(ReferencesNavigationService);
    private readonly route = inject(ActivatedRoute);

    ngOnInit(): void {
        this.route.paramMap.pipe(
            map((params) => params.get('id')),
            filter(tuiIsPresent),
            filter((id) => id !== 'new'),
            tap((id) => this.referenceId$.next(id)),
            switchMap((id) => this.fillForm(id)),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    submit(): void {
        if (!this.form.valid) {
            return this.form.markAllAsTouched();
        }

        const data = this.form.getRawValue() as unknown as T;
        this.save(data)
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

    protected fillForm(id: string | undefined): Observable<unknown> {
        if (!id) {
            return of(null);
        }

        return this.load(this.type, id).pipe(
            tap((data) => this.setValue(data)),
        );
    }

    protected save(data: T): Observable<T> {
        const id = this.referenceId$.getValue();

        if (id) {
            return this.apiReferences.updateReferenceItem(this.type, id, data);
        }

        return this.apiReferences.createReferenceItem(this.type, data);
    }

    protected load(type: ReferencesTypes, id: string): Observable<T> {
        return this.apiReferences.getReferenceItem(type, id);
    }

    protected setValue(data: T): void {
        delete (data as unknown as {id: unknown}).id;
        this.form.setValue({...this.form.getRawValue(), ...data});
    }
}
