export enum UserRole {
    SuperUser = 'SUPER_USER',
    Admin = 'ADMIN',
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
    job: string;
    role: UserRole;
    token?: string;
}
