import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {TUI_IS_MOBILE, TuiDestroyService} from '@taiga-ui/cdk';
import {forkJoin, map, merge, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {Buyer, Income, Product} from '@mnr-crm/shared-models';
import {ApiIncomesService} from '@mnr-crm/client/services/api/api-incomes.service';

@Component({
    selector: 'mnr-crm-incomes-page',
    templateUrl: './incomes-page.component.html',
    styleUrls: ['./incomes-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesPageComponent {
    private readonly refresh$ = new Subject<void>();

    readonly data$: Observable<Income[]> = merge(of(null), this.refresh$).pipe(switchMap(() =>
        forkJoin([
            this.apiIncomes.getAll(),
            this.apiReferences.getReference<Buyer[]>('buyers'),
            this.apiReferences.getReference<Product[]>('products'),
        ]).pipe(map(([incomes, buyers, products]) => incomes.map((i) => ({
            ...i,
            company: this.handleReferenceItemById(buyers, i.company, (x) => x.name),
            fuel: this.handleReferenceItemById(products, i.fuel, (x) => x.name),
        }))))
    ));

    readonly menu: {[key: string]: boolean} = {};

    readonly context = [
        {
            label: 'Редактировать',
            action: () => this.menuActionWrapper(this.edit.bind(this)),
        },
        {
            label: 'Удалить',
            action: () => this.menuActionWrapper(this.delete.bind(this)),
        }
    ];

    constructor(
        @Inject(TUI_IS_MOBILE)
        readonly isMobile: boolean,
        private readonly referencesNavigation: ReferencesNavigationService,
        private readonly apiReferences: ApiReferencesService,
        private readonly apiIncomes: ApiIncomesService,
        private readonly destroy$: TuiDestroyService,
    ) {}

    create(): void {
        this.referencesNavigation.createRedirect();
    }

    private edit(id: string): void {
        this.referencesNavigation.editRedirect(id);
    }

    private delete(id: string): void {
        this.apiIncomes.deleteById(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh$.next());
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
