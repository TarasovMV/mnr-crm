import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {User, UserRole} from '@mnr-crm/shared-models';
import {checkRoleUtil} from '../utils';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly user$ = new BehaviorSubject<User | null>(null);

    get user(): User | null {
        return this.user$.getValue();
    }

    checkRole$(roles: UserRole[]): Observable<boolean> {
        return this.user$.pipe(
            map((user) => !!user && checkRoleUtil(user, roles))
        );
    }

    checkRole(roles: UserRole[]): boolean {
        const user = this.user$.getValue();

        if (!user) {
            return false;
        }

        return checkRoleUtil(user, roles);
    }
}
