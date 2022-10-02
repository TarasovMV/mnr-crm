import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {UserRole} from '@mnr-crm/shared-models';
import {userRoleMapper} from '../utils';

@Pipe({
    name: 'userRoleStringify'
})
export class UserRoleStringifyPipe implements PipeTransform {
    transform(value: UserRole): string {
        return userRoleMapper[value];
    }
}

@NgModule({
    declarations: [UserRoleStringifyPipe],
    exports: [UserRoleStringifyPipe],
})
export class UserRoleStringifyPipeModule {}
