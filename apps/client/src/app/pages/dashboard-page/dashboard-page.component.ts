import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
    ApiRequestService,
    ReferencesNavigationService,
    RequestDataService,
} from '@mnr-crm/client/services';
import {
    Buyer,
    Product,
    Request,
    RequestStatus,
    User,
    UserRole,
    Vehicle,
    Vendor,
} from '@mnr-crm/shared-models';
import {
    forkJoin,
    map,
    merge,
    Observable,
    of,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { TUI_IS_MOBILE, TuiDestroyService } from '@taiga-ui/cdk';
import { requestStatusMapper } from './utils';
import { UserService } from '@mnr-crm/client/services/user.service';
import { checkRoleUtil } from '../../utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'mnr-crm-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
    private readonly refresh$ = new Subject<void>();

    readonly columns = [
        'incId',
        'buyer',
        'vendor',
        'driver',
        'responsible',
        'product',
        'count',
        'density',
        'weight',
        'price',
        'cost',
        'payType',
        'address',
        'date',
        'createdAt',
        'empty',
    ];

    readonly data$: Observable<Request[]> = merge(of(null), this.refresh$).pipe(
        switchMap(() =>
            forkJoin([
                this.apiRequest.getAll(),
                this.requestDataService.getReferences(),
            ]).pipe(
                map(([requests, references]) => {
                    return requests
                        .filter((request) =>
                            this.filterRequests(this.userService.user, request)
                        )
                        .map((r) => ({
                            ...r,
                            responsible: this.handleReferenceItemById<User>(
                                references.users,
                                r.responsible as string,
                                (x) => x.fio
                            ),
                            vendor: this.handleReferenceItemById<Vendor>(
                                references.vendors,
                                r.vendor,
                                (x) => x.name
                            ),
                            buyer: this.handleReferenceItemById<Buyer>(
                                references.buyers,
                                r.buyer,
                                (x) => x.name
                            ),
                            vehicle: this.handleReferenceItemById<Vehicle>(
                                references.vehicles,
                                r.vehicle,
                                (x) => x.number
                            ),
                            driver: this.handleReferenceItemById<User>(
                                references.users,
                                r.driver,
                                (x) => x.fio
                            ),
                            product: this.handleReferenceItemById<Product>(
                                references.products,
                                r.product,
                                (x) => x.shortName
                            ),
                        }))
                        .sort(
                            (cur, next) =>
                                new Date(next.createdAt).getTime() -
                                new Date(cur.createdAt).getTime()
                        );
                })
            )
        )
    );

    readonly context = [
        {
            label: 'Редактировать',
            available: true,
            action: () => this.menuActionWrapper(this.edit.bind(this)),
        },
        {
            label: 'Чат',
            available: true,
            action: () => this.menuActionWrapper(this.openChat.bind(this)),
        },
        {
            label: 'Дублировать',
            available: this.userService.checkRole([UserRole.Manager]),
            action: () => this.menuActionWrapper(this.copy.bind(this)),
        },
        {
            label: 'Сформировать ТТН',
            available: this.userService.checkRole([
                UserRole.Admin,
                UserRole.Storekeeper,
            ]),
            action: () => this.menuActionWrapper(this.createTTN.bind(this)),
        },
        {
            label: 'Удалить',
            available: this.userService.checkRole([UserRole.Manager]),
            action: () => this.menuActionWrapper(this.delete.bind(this)),
        },
    ];

    readonly menu: { [key: string]: boolean } = {};

    readonly legend = Object.values(requestStatusMapper);
    readonly statusStyleMapper = Object.entries(requestStatusMapper).reduce(
        (acc, next) => ({ ...acc, [next[0]]: next[1].color }),
        {}
    ) as { [key in RequestStatus]: string };

    get isCreateAvailable(): boolean {
        return this.userService.checkRole([UserRole.Manager]);
    }

    constructor(
        @Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly requestDataService: RequestDataService,
        private readonly apiRequest: ApiRequestService,
        private readonly destroy$: TuiDestroyService
    ) {}

    createRequest(): void {
        this.referencesNavigation.createRedirect();
    }

    edit(id: string): void {
        this.referencesNavigation.editRedirect(id);
    }

    dataTyping(data: unknown): Request[] {
        return data as Request[];
    }

    private openChat(id: string): void {
        this.router.navigate([id, 'chat'], { relativeTo: this.route });
    }

    private createTTN(id: string): void {
        this.apiRequest.downloadTTN(id);
    }

    private delete(id: string): void {
        this.apiRequest
            .deleteById(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.refresh$.next());
    }

    private copy(id: string): void {
        this.apiRequest
            .copy(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.refresh$.next());
    }

    // TODO: shared
    private menuActionWrapper(action: (id: string) => void) {
        const id = Object.entries(this.menu).find((m) => m[1])?.[0];

        if (!id) {
            throw new Error('Item not found');
        }

        this.menu[id] = false;

        return action(id);
    }

    // TODO: shared
    private handleReferenceItemById<T extends { id?: string }>(
        reference: T[],
        id: string,
        callback: (x: T) => string
    ): string {
        const item = reference.find((r) => r.id === id);

        if (!item) {
            return '';
        }

        return callback(item);
    }

    private filterRequests(user: User | null, request: Request): boolean {
        if (!user) {
            return false;
        }

        if (
            checkRoleUtil(user, [UserRole.Manager], false) &&
            request.responsible !== user.id
        ) {
            return false;
        }

        if (
            checkRoleUtil(user, [UserRole.Driver], false) &&
            request.driver !== user.id
        ) {
            return false;
        }

        if (
            request.status === RequestStatus.Framed &&
            checkRoleUtil(user, [UserRole.Manager, UserRole.Logistician])
        ) {
            return true;
        }

        if (
            (request.status === RequestStatus.Appointed ||
                request.status === RequestStatus.InTransit) &&
            checkRoleUtil(user, [
                UserRole.Manager,
                UserRole.Logistician,
                UserRole.Storekeeper,
                UserRole.Driver,
            ])
        ) {
            return true;
        }

        if (
            request.status === RequestStatus.Executed &&
            checkRoleUtil(user, [
                UserRole.Manager,
                UserRole.Logistician,
                UserRole.Counter,
            ])
        ) {
            return true;
        }

        if (
            request.status === RequestStatus.Canceled &&
            checkRoleUtil(user, [UserRole.Manager])
        ) {
            return true;
        }

        return false;
    }
}
