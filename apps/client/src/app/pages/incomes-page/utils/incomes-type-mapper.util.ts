import {IncomeType} from '@mnr-crm/shared-models';

export const incomeTypeMapper: {[key in IncomeType]: string} = {
    [IncomeType.Income]: 'Приход',
    [IncomeType.Return]: 'Возврат',
    [IncomeType.Inverse]: 'Обратка',
    [IncomeType.Purchase]: 'Покупка',
};
