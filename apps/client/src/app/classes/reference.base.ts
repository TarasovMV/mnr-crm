import {Directive, inject} from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {merge, Observable, of, shareReplay, Subject, switchMap, takeUntil} from 'rxjs';
import {ReferencesTypes} from '@mnr-crm/shared-models';
import {TUI_IS_MOBILE, TuiDestroyService} from '@taiga-ui/cdk';

@Directive()
export abstract class ReferenceBase<T> {
    public readonly isMobile: boolean = inject(TUI_IS_MOBILE);
    protected readonly destroy$ = inject(TuiDestroyService);
    protected readonly apiReferences = inject(ApiReferencesService);

    protected abstract readonly type: ReferencesTypes;
    readonly menu: {[key: string]: boolean} = {};
    readonly refresh$ = new Subject<void>();
    readonly data$ = merge(of(null), this.refresh$).pipe(
        switchMap(() => this.load()),
        shareReplay({refCount: true, bufferSize: 1}),
    );

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

    private readonly referencesNavigator = inject(ReferencesNavigationService);

    create(): void {
        this.referencesNavigator.createRedirect();
    }

    edit(id: string): void {
        this.referencesNavigator.editRedirect(id);
    }

    delete(id: string): void {
        this.apiReferences.deleteReferenceItem(this.type, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.refresh$.next());
    }

    protected abstract load(): Observable<T>;

    private menuActionWrapper(action: (id: string) => void) {
        const id = Object.entries(this.menu).find(m => m[1])?.[0];

        if (!id) {
            throw new Error('Item not found');
        }

        this.menu[id] = false;

        return action(id);
    }
}
