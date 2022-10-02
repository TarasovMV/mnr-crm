import {UserRole} from '@mnr-crm/shared-models';

export const userRoleMapper: {[key in UserRole]: string} = {
    [UserRole.Default]: 'Без роли',
    [UserRole.Admin]: 'Администратор',
    [UserRole.Manager]: 'Менеджер',
    [UserRole.Counter]: 'Бухгалтер',
    [UserRole.Driver]: 'Водитель',
    [UserRole.Logistician]: 'Логист',
    [UserRole.Storekeeper]: 'Кладовщик',
    [UserRole.SuperUser]: 'Супер пользователь',
}

