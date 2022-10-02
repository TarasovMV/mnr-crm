import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
    TuiContextWithImplicit,
    TuiDay,
    TuiDestroyService,
    tuiIsPresent,
    tuiPure,
    TuiStringHandler
} from '@taiga-ui/cdk';
import {Buyer, Income, IncomeType, Product, ReferenceItem} from '@mnr-crm/shared-models';
import {filter, forkJoin, map, Observable, shareReplay, switchMap, takeUntil, tap} from 'rxjs';
import { incomeTypeMapper } from '../../utils';
import {ApiIncomesService} from '@mnr-crm/client/services/api/api-incomes.service';
import {ActivatedRoute} from '@angular/router';
import {dateToTui} from '../../../../utils';


@Component({
    selector: 'mnr-crm-incomes-form',
    templateUrl: './incomes-form.component.html',
    styleUrls: ['./incomes-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesFormComponent implements OnInit {
    private requestId: string | undefined;

    readonly form = new FormGroup({
        company: new FormControl<ReferenceItem | null>(null, [Validators.required]),
        fuel: new FormControl<ReferenceItem | null>(null, [Validators.required]),
        count: new FormControl<number | null>(null),
        density: new FormControl<number | null>(null),
        temperature: new FormControl<number | null>(null),
        weight: new FormControl<number | null>(null),
        type: new FormControl(IncomeType.Income, [Validators.required]),
        date: new FormControl(TuiDay.currentLocal()),
    });

    readonly references$: Observable<{buyers: ReferenceItem[], products: ReferenceItem[]}> = forkJoin([
        this.apiReferences.getReference<Buyer[]>('buyers').pipe(map(x => x.map(k => ({id: k.id, label: k.name})))),
        this.apiReferences.getReference<Product[]>('products').pipe(map(x => x.map(k => ({id: k.id, label: k.name})))),
    ]).pipe(
        map(([buyers, products]) => ({ buyers, products })),
        shareReplay({refCount: true, bufferSize: 1}),
    );

    readonly typeReference = Object.entries(incomeTypeMapper).map((p) => ({
        id: p[0],
        label: p[1],
    }));

    constructor(
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly apiReferences: ApiReferencesService,
        private readonly apiIncomes: ApiIncomesService,
        private readonly route: ActivatedRoute,
        private readonly destroy$: TuiDestroyService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter(tuiIsPresent),
                filter(id => id !== 'new'),
                tap((id) => this.requestId = id),
                switchMap((id) => this.apiIncomes.getById(id)),
                switchMap((income) => this.references$.pipe(map((references) => ({
                    income, references
                })))),
                takeUntil(this.destroy$)
            )
            .subscribe(({income, references}) => {
                this.form.setValue({
                    company: references.buyers.find((u) => u.id === income.company) ?? null,
                    fuel: references.products.find((u) => u.id === income.fuel) ?? null,
                    count: income.count ?? null,
                    density: income.density ?? null,
                    temperature: income.temperature ?? null,
                    weight: income.weight ?? null,
                    type: income.type ?? null,
                    date: dateToTui(income.date),
                })
            });
    }

    refStringify(item: {label: string}): string {
        return item.label;
    }

    @tuiPure
    refStringifyArr(
        items: {id: string | undefined, label: string}[],
    ): TuiStringHandler<TuiContextWithImplicit<string>> {
        return ({$implicit}) => items.find(x => x.id === $implicit)?.label || '';
    }

    back(): void {
        this.referencesNavigation.backToMain();
    }

    submit(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched();

            return;
        }

        const formValue = this.form.getRawValue();

        const income = {
            ...formValue,
            company: formValue.company?.id,
            fuel: formValue.fuel?.id,
        } as unknown as Income;

        if (this.requestId) {
            this.apiIncomes.updateById(this.requestId, income).pipe(takeUntil(this.destroy$)).subscribe(() => this.back());

            return;
        }

        this.apiIncomes.create(income).pipe(takeUntil(this.destroy$)).subscribe(() => this.back());
    }
}
