import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserService } from '@mnr-crm/client/services/user.service';
import { ApiAuthService } from '@mnr-crm/client/services';
import { SwPush } from '@angular/service-worker';
import { VAPID_KEY } from '@mnr-crm/shared-models';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly apiAuth: ApiAuthService,
        private readonly swPush: SwPush,
        private readonly router: Router
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.apiAuth.current().pipe(
            tap((user) => this.userService.user$.next(user)),
            tap(() => this.pushConnection()),
            map(() => true),
            catchError(() => of(this.router.createUrlTree(['/login'])))
        );
    }

    private pushConnection(): void {
        this.swPush
            .requestSubscription({ serverPublicKey: VAPID_KEY })
            .then((res) => console.log('push', JSON.stringify(res)))
            .catch((err) =>
                console.error('Could not subscribe to notifications', err)
            );
    }
}
