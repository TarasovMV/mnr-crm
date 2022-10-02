import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApiReferencesService, ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {User, UserRole} from '@mnr-crm/shared-models';
import {map, Observable} from 'rxjs';
import {TuiDestroyService} from '@taiga-ui/cdk';


@Component({
    selector: 'mnr-crm-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent extends ReferenceBase<User[]> {
    protected readonly type = 'users';

    constructor() { super() }

    protected override load(): Observable<User[]> {
        return this.apiReferences.getReference<User[]>('users').pipe(
            map((users) => users.filter(u => u.role !== UserRole.SuperUser)),
        );
    }
}
