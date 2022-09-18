import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReferencesNavigationService, ApiReferencesService} from '@mnr-crm/client/services';
import {ReferenceBase} from '@mnr-crm/client/classes';
import {User} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';


@Component({
    selector: 'mnr-crm-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.less'],
    providers: [ReferencesNavigationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent extends ReferenceBase<User[]> {
    constructor(
        private readonly apiReferences: ApiReferencesService,
    ) {
        super();
    }

    protected override load(): Observable<User[]> {
        return this.apiReferences.getReference<User[]>('users');
    }
}
