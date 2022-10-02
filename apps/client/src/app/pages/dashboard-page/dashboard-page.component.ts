import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApiRequestService, ReferencesNavigationService, RequestDataService} from '@mnr-crm/client/services'
import {Buyer, Product, Request, RequestStatus, User, Vehicle, Vendor} from '@mnr-crm/shared-models';
import {forkJoin, map, merge, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {requestStatusMapper} from './utils';


@Component({
    selector: 'mnr-crm-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
    private readonly refresh$ = new Subject<void>();

    readonly data$: Observable<Request[]> = merge(of(null), this.refresh$).pipe(switchMap(() =>
        forkJoin([
            this.apiRequest.getAll(),
            this.requestDataService.getReferences(),
        ]).pipe(map(([requests, references]) => {
            return requests.map(r => ({
                ...r,
                responsible: this.handleReferenceItemById<User>(references.users, r.responsible as string, (x) => x.fio),
                vendor: this.handleReferenceItemById<Vendor>(references.vendors, r.vendor, (x) => x.name),
                buyer: this.handleReferenceItemById<Buyer>(references.buyers, r.buyer, (x) => x.name),
                vehicle: this.handleReferenceItemById<Vehicle>(references.vehicles, r.vehicle, (x) => x.number),
                driver: this.handleReferenceItemById<User>(references.users, r.driver, (x) => x.fio),
                product: this.handleReferenceItemById<Product>(references.products, r.product, (x) => x.shortName),
            })).sort((cur, next) => new Date(next.createdAt).getTime() - new Date(cur.createdAt).getTime())
        }))
    ));

    readonly context = [
        {
            label: 'Редактировать',
            action: () => this.menuActionWrapper(this.edit.bind(this)),
        },
        {
            label: 'Дублировать',
            action: () => this.menuActionWrapper(this.copy.bind(this)),
        },
        {
            label: 'Сформировать ТТН',
            action: () => this.menuActionWrapper(this.createTTN.bind(this)),
        },
        {
            label: 'Удалить',
            action: () => this.menuActionWrapper(this.delete.bind(this)),
        }
    ];

    readonly menu: {[key: string]: boolean} = {};

    readonly legend = Object.values(requestStatusMapper);
    readonly statusStyleMapper = Object
        .entries(requestStatusMapper)
        .reduce((acc, next) =>
            ({...acc, [next[0]]: next[1].color}), {}
        ) as {[key in RequestStatus]: string};

    constructor(
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly apiRequest: ApiRequestService,
        private readonly requestDataService: RequestDataService,
        private readonly destroy$: TuiDestroyService,
    ) {}

    createRequest(): void {
        this.referencesNavigation.createRedirect();
    }

    private edit(id: string): void {
        this.referencesNavigation.editRedirect(id);
    }

    private createTTN(id: string): void {
        this.apiRequest.downloadTTN(id);
    }

    private delete(id: string): void {
        this.apiRequest.deleteById(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.refresh$.next());
    }

    private copy(id: string): void {
        this.apiRequest.copy(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.refresh$.next());
    }

    // TODO: shared
    private menuActionWrapper(action: (id: string) => void) {
        const id = Object.entries(this.menu).find(m => m[1])?.[0];

        if (!id) {
            throw new Error('Item not found');
        }

        this.menu[id] = false;

        return action(id);
    }

    // TODO: shared
    private handleReferenceItemById<T extends {id?: string}>(reference: T[], id: string, callback: (x: T) => string): string {
        const item = reference.find(r => r.id === id);

        if (!item) {
            return '';
        }

        return callback(item);
    }
}
