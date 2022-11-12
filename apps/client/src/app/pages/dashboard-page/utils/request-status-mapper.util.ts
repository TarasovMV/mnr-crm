import { RequestStatus } from '@mnr-crm/shared-models';

export const requestStatusMapper: {
    [key in RequestStatus]: { label: string; color: string };
} = {
    [RequestStatus.Framed]: {
        label: 'Оформлена',
        color: 'default',
    },
    [RequestStatus.Appointed]: {
        label: 'Назначена',
        color: 'yellow',
    },
    [RequestStatus.InTransit]: {
        label: 'В пути',
        color: 'blue',
    },
    [RequestStatus.Executed]: {
        label: 'Исполнена',
        color: 'green',
    },
    [RequestStatus.Canceled]: {
        label: 'Отменена',
        color: 'red',
    },
};
