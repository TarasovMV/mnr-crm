import {TuiDay} from '@taiga-ui/cdk';

export function dateToTui(date: string | Date | null | undefined): TuiDay | null {
    if (!date) {
        return null;
    }

    date = new Date(date);

    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
}
