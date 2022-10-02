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
    incId?: number;
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
    temperature: number;
    plomb: string;
    date: Date;
    createdAt: Date;
}
