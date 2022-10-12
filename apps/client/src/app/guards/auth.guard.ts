import {CanActivate, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {UserService} from '@mnr-crm/client/services/user.service';
import {ApiAuthService} from '@mnr-crm/client/services';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly apiAuth: ApiAuthService,
        private readonly router: Router,
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.apiAuth.current().pipe(
            tap((user) => this.userService.user$.next(user)),
            map(() => true),
            catchError(() => of(this.router.createUrlTree(['/login']))),
        )
    }
}
