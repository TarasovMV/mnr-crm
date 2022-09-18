import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiContextWithImplicit, TuiDay, TuiDestroyService, tuiPure, TuiStringHandler} from '@taiga-ui/cdk';
import {ApiReferencesService, ApiRequestService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {forkJoin, map, Observable, takeUntil} from 'rxjs';
import {
    Buyer,
    PayType,
    Product,
    Provider,
    ReferencesTypes,
    User,
    Vehicle,
    Vendor,
    Request,
    ReferenceItem
} from '@mnr-crm/shared-models';


@Component({
    selector: 'mnr-crm-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFormComponent {
    readonly form = new FormGroup({
        responsible: new FormControl<ReferenceItem | null>(null, [Validators.required]),
        vendor: new FormControl<ReferenceItem | null>(null, [Validators.required]),
        buyer: new FormControl<ReferenceItem | null>(null, [Validators.required]),
        address: new FormControl<string | null>(null),
        phone: new FormControl<string | null>(''),
        product: new FormControl<ReferenceItem | null>(null, [Validators.required]),
        count: new FormControl<number | null>(null, [Validators.required]),
        weight: new FormControl<number | null>(null),
        price: new FormControl<number | null>(null, [Validators.required]),
        payType: new FormControl<PayType | null>(null, [Validators.required]),
        density: new FormControl<number | null>(null, [Validators.required]),
        vehicle: new FormControl<ReferenceItem | null>(null),
        driver: new FormControl<ReferenceItem | null>(null),
        date: new FormControl<TuiDay | null>(TuiDay.currentLocal()),
    });

    readonly payTypesReference: ReferenceItem[] = [
        {
            id: PayType.Cash.toString(),
            label: 'Наличный'
        },
        {
            id: PayType.Cashless.toString(),
            label: 'Безналичный'
        },
    ];

    readonly references$: Observable<{[key in ReferencesTypes]: ReferenceItem[]}> = forkJoin([
        this.apiReference.getReference<Buyer[]>('buyers').pipe(map(x => x.map(k => ({id: k.id, label: k.name})))),
        this.apiReference.getReference<Product[]>('products').pipe(map(x => x.map(k => ({id: k.id, label: k.name})))),
        this.apiReference.getReference<Provider[]>('providers').pipe(map(x => x.map(k => ({id: k.id, label: k.name})))),
        this.apiReference.getReference<User[]>('users').pipe(map(x => x.map(k => ({id: k.id, label: k.fio})))),
        this.apiReference.getReference<Vehicle[]>('vehicles').pipe(map(x => x.map(k => ({id: k.id, label: k.number})))),
        this.apiReference.getReference<Vendor[]>('vendors').pipe(map(x => x.map(k => ({id: k.id, label: k.name})))),
    ]).pipe(map(([
         buyers, products, providers, users, vehicles, vendors
     ]) => ({ buyers, products, providers, users, vehicles, vendors })));

    constructor(
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly apiReference: ApiReferencesService,
        private readonly apiRequest: ApiRequestService,
        private readonly destroy$: TuiDestroyService,
    ) {}

    save(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched();

            return;
        }

        const formValue = this.form.getRawValue();

        const request = {
            ...formValue,
            responsible: formValue.responsible?.id,
            vendor: formValue.vendor?.id,
            buyer: formValue.buyer?.id,
            product: formValue.product?.id,
            vehicle: formValue.vehicle?.id,
            driver: formValue.driver?.id,
            createdAt: new Date(),
        } as unknown as Request;

        this.apiRequest.create(request).pipe(takeUntil(this.destroy$)).subscribe();
    }

    refStringify(item: {id: string | undefined, label: string}): string {
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
}
