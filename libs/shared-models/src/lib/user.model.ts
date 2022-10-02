export enum UserRole {
    SuperUser = 'SUPER_USER',
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    Storekeeper = 'STOREKEEPER',
    Logistician = 'LOGISTICIAN',
    Counter = 'COUNTER',
    Driver = 'DRIVER',
    Default = 'DEFAULT',
}

export interface User {
    _id?: string;
    id?: string;
    username: string;
    fio: string;
    phone: string;
    mail: string;
    password: string;
    role: UserRole;
    token?: string;
}
