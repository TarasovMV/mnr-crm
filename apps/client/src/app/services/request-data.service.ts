import {Injectable} from '@angular/core';
import {ApiReferencesService, ApiRequestService} from '@mnr-crm/client/services/api';
import {forkJoin, map} from 'rxjs';
import {Buyer, Product, Provider, User, Vehicle, Vendor} from '@mnr-crm/shared-models';

@Injectable({
    providedIn: 'root'
})
export class RequestDataService {
    constructor(
        private readonly apiReference: ApiReferencesService,
        private readonly apiRequest: ApiRequestService,
    ) {}

    getReferences() {
        return forkJoin([
            this.apiReference.getReference<Buyer[]>('buyers'),
            this.apiReference.getReference<Product[]>('products'),
            this.apiReference.getReference<Provider[]>('providers'),
            this.apiReference.getReference<User[]>('users'),
            this.apiReference.getReference<Vehicle[]>('vehicles'),
            this.apiReference.getReference<Vendor[]>('vendors'),
        ]).pipe(map(([
             buyers, products, providers, users, vehicles, vendors
        ]) => ({ buyers, products, providers, users, vehicles, vendors })));
    }
}
