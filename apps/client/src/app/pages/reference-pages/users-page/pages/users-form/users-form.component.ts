import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserRole} from '@mnr-crm/shared-models';
import {TuiContextWithImplicit, TuiDestroyService, tuiPure, TuiStringHandler} from '@taiga-ui/cdk';
import {ReferencesNavigationService, ApiReferencesService} from '@mnr-crm/client/services';
import {Observable} from 'rxjs';
import {ReferenceFormBase} from '@mnr-crm/client/classes';

@Component({
    selector: 'mnr-crm-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.less'],
    providers: [ReferencesNavigationService, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent extends ReferenceFormBase<User> {
    readonly form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        fio: new FormControl('', [Validators.required]),
        job: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl(undefined, [Validators.required]),
    });

    readonly rolesReference = [
        {
            label: 'Администратор',
            type: UserRole.Admin
        },
        {
            label: 'Пользователь',
            type: UserRole.Default
        },
    ];

    constructor(private readonly apiReferences: ApiReferencesService) {
        super();
    }

    @tuiPure
    stringifyRole(
        items: UsersFormComponent['rolesReference'],
    ): TuiStringHandler<TuiContextWithImplicit<string>> {
        return ({$implicit}) => items.find(x => x.type === $implicit)?.label || '';
    }

    protected override create(data: User): Observable<User> {
        return this.apiReferences.createUser(data);
    }
}
