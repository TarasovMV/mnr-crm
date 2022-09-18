import {Directive, inject} from '@angular/core';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {merge, Observable, of, shareReplay, Subject, switchMap} from 'rxjs';

@Directive()
export abstract class ReferenceBase<T> {
    readonly refresh$ = new Subject();
    readonly data$ = merge(of(null), this.refresh$).pipe(
        switchMap(() => this.load()),
        shareReplay({refCount: true, bufferSize: 1}),
    );

    private readonly referencesNavigator = inject(ReferencesNavigationService);

    create(): void {
        this.referencesNavigator.createRedirect();
    }

    protected abstract load(): Observable<T>;
}
