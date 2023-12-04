import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReferencesNavigationService } from '@mnr-crm/client/services';
import { ReferenceBase } from '@mnr-crm/client/classes';
import { User, UserRole } from '@mnr-crm/shared-models';
import { map, Observable } from 'rxjs';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { UserService } from '@mnr-crm/client/services/user.service';
import { TECH_DRIVER_PREFIX } from '../../../constants';

@Component({
    selector: 'mnr-crm-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent extends ReferenceBase<User[]> {
    protected readonly type = 'users';

    constructor(private readonly userService: UserService) {
        super();
    }

    protected override load(): Observable<User[]> {
        return this.apiReferences
            .getReference<User[]>('users')
            .pipe(map((users) => this.filter(users)));
    }

    showMenu(user: User): boolean {
        return (
            !this.userService.checkRole([UserRole.Storekeeper], false) ||
            user.username.includes(TECH_DRIVER_PREFIX)
        );
    }

    private filter(users: User[]): User[] {
        return users
            .filter((u) => u.role !== UserRole.SuperUser)
            .filter(
                (u) =>
                    !this.userService.checkRole(
                        [UserRole.Storekeeper],
                        false
                    ) || u.role === UserRole.Driver
            );
    }
}
