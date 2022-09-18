export enum PayType {
    Cash = 'CASH',
    Cashless = 'CASHLESS',
}

export enum RequestStatus {
    Framed = 'FRAMED',
    Appointed = 'APPOINTED',
    InTransit = 'IN_TRANSIT',
    Executed = 'EXECUTED',
    Canceled = 'CANCELED',
}

export interface Request {
    id?: string;
    autoId?: number;
    responsible: string;
    vendor: string;
    buyer: string;
    vehicle: string;
    driver: string;
    product: string;
    address: string;
    phone: string;
    count: number;
    weight: number;
    price: number;
    /**
     * virtual: price * count
     */
    cost?: number;
    payType: PayType;
    status: RequestStatus;
    density: number;
    date: Date;
    createdAt: Date;
}
