import {User, UserRole} from '@mnr-crm/shared-models';

export const checkRoleUtil = (user: User, roles: UserRole[], root: boolean = true): boolean => {
    if (root && (user.role === UserRole.SuperUser || user.role === UserRole.Admin)) {
        return true;
    }

    return roles.includes(user.role);
}
