import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from '@mnr-crm/shared-models';
import {
    TuiContextWithImplicit,
    TuiDestroyService,
    tuiPure,
    TuiStringHandler,
} from '@taiga-ui/cdk';
import { ReferencesNavigationService } from '@mnr-crm/client/services';
import { ReferenceFormBase } from '@mnr-crm/client/classes';
import { UserService } from '@mnr-crm/client/services/user.service';
import { Observable } from 'rxjs';
import { userRoleMapper } from '../../utils';
import { uuidGenerator } from '../../../../../utils';
import { TECH_DRIVER_PREFIX } from '../../../../../constants';

@Component({
    selector: 'mnr-crm-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent extends ReferenceFormBase<User> {
    protected readonly type = 'users';

    readonly isStorekeeper = this.userService.checkRole(
        [UserRole.Storekeeper],
        false
    );

    readonly form = new FormGroup({
        username: new FormControl(
            this.isStorekeeper
                ? `${TECH_DRIVER_PREFIX}_${uuidGenerator()}`
                : '',
            [Validators.required]
        ),
        password: new FormControl(this.isStorekeeper ? `tech` : '', [
            Validators.required,
        ]),
        fio: new FormControl('', [Validators.required]),
        phone: new FormControl(this.isStorekeeper ? '-' : '', [
            Validators.required,
        ]),
        mail: new FormControl(this.isStorekeeper ? 'tech@tech.tech' : '', [
            Validators.required,
            Validators.email,
        ]),
        role: new FormControl(this.isStorekeeper ? UserRole.Driver : null, [
            Validators.required,
        ]),
    });

    readonly rolesReference = Object.entries(userRoleMapper)
        .map((role) => ({
            label: role[1],
            type: role[0],
        }))
        .filter(({ type }) => type !== UserRole.SuperUser)
        .filter(({ type }) => !this.isStorekeeper || type === UserRole.Driver);

    constructor(private readonly userService: UserService) {
        super();
    }

    @tuiPure
    stringifyRole(
        items: UsersFormComponent['rolesReference']
    ): TuiStringHandler<TuiContextWithImplicit<string>> {
        return ({ $implicit }) =>
            items.find((x) => x.type === $implicit)?.label || '';
    }

    protected override save(data: User): Observable<User> {
        const id = this.referenceId$.getValue();

        if (id) {
            return this.apiReferences.updateUser(id, data);
        }

        return this.apiReferences.createUser(data);
    }
}
