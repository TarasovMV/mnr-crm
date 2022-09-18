export interface ReferenceItem {
    id: string | undefined;
    label: string;
}

export type ReferencesTypes =
    'buyers' |
    'products' |
    'providers' |
    'users' |
    'vehicles' |
    'vendors';
