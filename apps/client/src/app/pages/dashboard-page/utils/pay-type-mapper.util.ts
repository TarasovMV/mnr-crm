import {PayType} from '@mnr-crm/shared-models';

export const payTypeMapper: {[key in PayType]: string} = {
    [PayType.Cash]: 'Наличный',
    [PayType.Cashless]: 'Безналичный',
}
