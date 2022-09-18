import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApiRequestService, ReferencesNavigationService, RequestDataService} from '@mnr-crm/client/services'
import {Buyer, Product, Request, User, Vehicle, Vendor} from '@mnr-crm/shared-models';
import {forkJoin, map, Observable} from 'rxjs';


@Component({
    selector: 'mnr-crm-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
    readonly data$: Observable<Request[]> = forkJoin([
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
        }))
    }));

    readonly statuses = {
        created: {
            label: 'Оформлена',
            color: 'default',
        },
        driver: {
            label: 'Назначена',
            color: 'yellow',
        },
        progress: {
            label: 'В пути',
            color: 'blue',
        },
        done: {
            label: 'Исполнена',
            color: 'green',
        },
        cancel: {
            label: 'Отмена',
            color: 'red',
        },
    }

    get legend() {
        return Object.values(this.statuses);
    }

    constructor(
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly apiRequest: ApiRequestService,
        private readonly requestDataService: RequestDataService,
    ) {
    }

    reqMenu(id: number) {
        return [
            {
                label: 'Редактировать',
                action: () => this.edit(id),
            },
            {
                label: 'Дублировать',
                action: () => this.copy(id),
            },
            {
                label: 'Сформировать ТТН',
                action: () => this.createTTN(id),
            },
            {
                label: 'Удалить',
                action: () => this.delete(id),
            }
        ]
    }

    createRequest(): void {
        this.referencesNavigation.createRedirect();
    }

    private edit(id: number): void {
        console.log('edit');
    }

    private createTTN(id: number): void {
        console.log('downloadTTN');
    }

    private delete(id: number): void {
        console.log('delete');
    }

    private copy(id: number): void {
        console.log('copy');
    }

    private handleReferenceItemById<T extends {id?: string}>(reference: T[], id: string, callback: (x: T) => string): string {
        const item = reference.find(r => r.id === id);

        console.log(reference, item, id)

        if (!item) {
            return '';
        }

        return callback(item);
    }
}
