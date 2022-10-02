export enum IncomeType {
    Income = 'INCOME',
    Return = 'RETURN',
    Inverse = 'INVERSE',
    Purchase = 'PURCHASE',
}

export interface Income {
    id?: string;
    company: string;
    fuel: string;
    count: number;
    density: number;
    temperature: number;
    weight: number;
    type: IncomeType;
    date: Date;
}
