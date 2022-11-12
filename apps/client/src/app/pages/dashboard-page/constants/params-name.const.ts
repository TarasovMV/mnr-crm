import { Request } from '@mnr-crm/shared-models';

export const nameParamsMap = new Map<string, keyof Request | 'empty'>([
    ['Номер ТТН', 'incId'],
    ['Покупатель', 'buyer'],
    ['Продавец', 'vendor'],
    ['Водитель', 'driver'],
    ['Ответственный', 'responsible'],
    ['Товар', 'product'],
    ['Объем', 'count'],
    ['Плотность', 'density'],
    ['Масса', 'weight'],
    ['Цена', 'price'],
    ['Стоимость', 'cost'],
    ['Транспорт', 'vehicle'],
    ['Телефон', 'phone'],
    ['Температура', 'temperature'],
    ['Пломба', 'plomb'],
    ['Оплата', 'payType'],
    ['Адрес доставки', 'address'],
    ['Дата поставки', 'date'],
    ['Дата создания', 'createdAt'],
    ['Управление', 'empty'],
]);
