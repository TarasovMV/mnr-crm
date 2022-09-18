import {CanActivate, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiAuthService} from '../services/api/api-auth.service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly apiAuth: ApiAuthService,
        private readonly router: Router
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.apiAuth.current().pipe(
            map(() => true),
            catchError(() => of(this.router.createUrlTree(['/login']))),
        )
    }
}
