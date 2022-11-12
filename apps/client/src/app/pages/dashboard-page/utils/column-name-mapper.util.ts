import { Request } from '@mnr-crm/shared-models';
import { nameParamsMap } from '../constants';

export const columnNameMapper = (name: string): keyof Request | 'empty' =>
    nameParamsMap.get(name) ?? 'empty';
