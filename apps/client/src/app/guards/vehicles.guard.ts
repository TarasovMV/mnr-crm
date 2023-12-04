import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from '@mnr-crm/client/services/user.service';
import { UserRole } from '@mnr-crm/shared-models';

@Injectable({
    providedIn: 'root',
})
export class VehiclesGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userService
            .checkRole$([UserRole.Storekeeper])
            .pipe(
                map((res) =>
                    res ? true : this.router.createUrlTree(['/dashboard'])
                )
            );
    }
}
