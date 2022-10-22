import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    TuiContextWithImplicit,
    TuiDay,
    TuiDestroyService,
    tuiIsPresent,
    tuiPure,
    TuiStringHandler,
} from '@taiga-ui/cdk';
import {
    ApiReferencesService,
    ApiRequestService,
    ReferencesNavigationService,
} from '@mnr-crm/client/services';
import {
    filter,
    forkJoin,
    map,
    shareReplay,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';
import {
    Buyer,
    PayType,
    Product,
    Provider,
    ReferenceItem,
    Request,
    RequestStatus,
    User,
    UserRole,
    Vehicle,
    Vendor,
} from '@mnr-crm/shared-models';
import { payTypeMapper, requestStatusMapper } from '../../utils';
import { ActivatedRoute } from '@angular/router';
import { dateToTui } from '../../../../utils';
import { UserService } from '@mnr-crm/client/services/user.service';

@Component({
    selector: 'mnr-crm-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFormComponent implements OnInit {
    private requestId: string | undefined = undefined;

    readonly displayedControls = {
        status: true,
        responsible: this.userService.checkRole([UserRole.Admin]),
        vendor: this.userService.checkRole([UserRole.Manager]),
        buyer: this.userService.checkRole([UserRole.Manager]),
        product: this.userService.checkRole([UserRole.Manager]),
        count: this.userService.checkRole([
            UserRole.Manager,
            UserRole.Storekeeper,
        ]),
        price: this.userService.checkRole([UserRole.Manager]),
        payType: this.userService.checkRole([UserRole.Manager]),
        date: this.userService.checkRole([UserRole.Manager]),
        address: this.userService.checkRole([
            UserRole.Manager,
            UserRole.Logistician,
        ]),
        phone: this.userService.checkRole([UserRole.Manager]),
        weight: false,
        density: this.userService.checkRole([UserRole.Storekeeper]),
        temperature: this.userService.checkRole([UserRole.Storekeeper]),
        vehicle: this.userService.checkRole([UserRole.Logistician]),
        driver: this.userService.checkRole([UserRole.Logistician]),
        plomb: this.userService.checkRole([UserRole.Storekeeper]),
    } as const;

    readonly form = new FormGroup({
        status: new FormControl<RequestStatus>(RequestStatus.Framed, [
            Validators.required,
        ]),
        responsible: new FormControl<ReferenceItem | null>(null, [
            Validators.required,
        ]),
        vendor: new FormControl<ReferenceItem | null>(null),
        buyer: new FormControl<ReferenceItem | null>(null),
        address: new FormControl<string | null>(null),
        phone: new FormControl<string | null>(''),
        product: new FormControl<ReferenceItem | null>(null),
        count: new FormControl<number | null>(null),
        weight: new FormControl<number | null>(null),
        price: new FormControl<number | null>(null),
        payType: new FormControl<PayType | null>(null),
        density: new FormControl<number | null>(null),
        temperature: new FormControl<number | null>(null),
        vehicle: new FormControl<ReferenceItem | null>(null),
        driver: new FormControl<ReferenceItem | null>(null),
        date: new FormControl<TuiDay | null>(TuiDay.currentLocal()),
        plomb: new FormControl<string | null>(null),
    });

    readonly payTypesReference: ReferenceItem[] = Object.entries(
        payTypeMapper
    ).map((p) => ({
        id: p[0],
        label: p[1],
    }));

    readonly statusReference: ReferenceItem[] = Object.entries(
        requestStatusMapper
    ).map((p) => ({
        id: p[0],
        label: p[1].label,
    }));

    readonly references$ = forkJoin([
        this.apiReference
            .getReference<Buyer[]>('buyers')
            .pipe(map((x) => x.map((k) => ({ id: k.id, label: k.name })))),
        this.apiReference
            .getReference<Product[]>('products')
            .pipe(map((x) => x.map((k) => ({ id: k.id, label: k.name })))),
        this.apiReference
            .getReference<Provider[]>('providers')
            .pipe(map((x) => x.map((k) => ({ id: k.id, label: k.name })))),
        this.apiReference
            .getReference<User[]>('users')
            .pipe(
                map((x) =>
                    x.map((k) => ({ id: k.id, label: k.fio, role: k.role }))
                )
            ),
        this.apiReference
            .getReference<Vehicle[]>('vehicles')
            .pipe(map((x) => x.map((k) => ({ id: k.id, label: k.number })))),
        this.apiReference
            .getReference<Vendor[]>('vendors')
            .pipe(map((x) => x.map((k) => ({ id: k.id, label: k.name })))),
    ]).pipe(
        map(([buyers, products, providers, users, vehicles, vendors]) => ({
            buyers,
            products,
            providers,
            users,
            vehicles,
            vendors,
            drivers: users
                .filter((u) => u.role === UserRole.Driver)
                .map((d) => ({ id: d.id, label: d.label })),
            responsibles: users
                .filter(
                    (u) =>
                        u.role === UserRole.Admin || u.role === UserRole.Manager
                )
                .map((d) => ({ id: d.id, label: d.label })),
        })),
        shareReplay({ refCount: true, bufferSize: 1 })
    );

    constructor(
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly apiReference: ApiReferencesService,
        private readonly apiRequest: ApiRequestService,
        private readonly destroy$: TuiDestroyService
    ) {}

    ngOnInit(): void {
        this.setFormFromLoad();
    }

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

        if (this.requestId) {
            this.apiRequest
                .update(this.requestId, request)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.back());

            return;
        }

        this.apiRequest
            .create(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.back());
    }

    refStringify(item: { label: string }): string {
        return item.label;
    }

    @tuiPure
    refStringifyArr(
        items: { id: string | undefined; label: string }[]
    ): TuiStringHandler<TuiContextWithImplicit<string>> {
        return ({ $implicit }) =>
            items.find((x) => x.id === $implicit)?.label || '';
    }

    back(): void {
        this.referencesNavigation.backToMain();
    }

    private setFormFromLoad(): void {
        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter((x) => x === 'new'),
                switchMap(() => this.references$),
                map((r) => r.users)
            )
            .subscribe((users) => {
                console.log(users);
                this.form.controls.responsible.setValue(
                    users.find((u) => u.id === this.userService.user?.id) ??
                        null
                );
            });

        this.route.paramMap
            .pipe(
                map((params) => params.get('id')),
                filter(tuiIsPresent),
                filter((id) => id !== 'new'),
                tap((id) => (this.requestId = id)),
                switchMap((id) => this.apiRequest.getById(id)),
                switchMap((request) =>
                    this.references$.pipe(
                        map((references) => ({
                            request,
                            references,
                        }))
                    )
                ),
                takeUntil(this.destroy$)
            )
            .subscribe(({ request, references }) =>
                this.form.setValue({
                    status: request.status,
                    responsible:
                        references.users.find(
                            (u) => u.id === request.responsible
                        ) ?? null,
                    vendor:
                        references.vendors.find(
                            (u) => u.id === request.vendor
                        ) ?? null,
                    buyer:
                        references.buyers.find((u) => u.id === request.buyer) ??
                        null,
                    address: request.address,
                    phone: request.phone,
                    product:
                        references.products.find(
                            (p) => p.id === request.product
                        ) ?? null,
                    count: request.count,
                    weight: request.weight,
                    price: request.price,
                    payType: request.payType,
                    density: request.density,
                    temperature: request.temperature ?? null,
                    vehicle:
                        references.vehicles.find(
                            (v) => v.id === request.vehicle
                        ) ?? null,
                    driver:
                        references.users.find((u) => u.id === request.driver) ??
                        null,
                    date: dateToTui(request.date),
                    plomb: request.plomb,
                })
            );
    }
}
