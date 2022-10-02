import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserRole} from '@mnr-crm/shared-models';
import {TuiContextWithImplicit, TuiDestroyService, tuiPure, TuiStringHandler} from '@taiga-ui/cdk';
import {ReferencesNavigationService} from '@mnr-crm/client/services';
import {ReferenceFormBase} from '@mnr-crm/client/classes';
import {userRoleMapper} from '../../utils';
import {Observable} from 'rxjs';

@Component({
    selector: 'mnr-crm-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent extends ReferenceFormBase<User> {
    protected readonly type = 'users';

    readonly form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        fio: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl(null, [Validators.required]),
    });

    readonly rolesReference = Object.entries(userRoleMapper).map((role) => ({
        label: role[1],
        type: role[0],
    })).filter((role) => role.type !== UserRole.SuperUser);

    constructor() { super() }

    @tuiPure
    stringifyRole(
        items: UsersFormComponent['rolesReference'],
    ): TuiStringHandler<TuiContextWithImplicit<string>> {
        return ({$implicit}) => items.find(x => x.type === $implicit)?.label || '';
    }

    protected override save(data: User): Observable<User> {
        const id = this.referenceId$.getValue();

        if (id) {
            return this.apiReferences.updateUser(id, data);
        }

        return this.apiReferences.createUser(data);
    }
}
