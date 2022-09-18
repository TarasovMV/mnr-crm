import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReferencesTypes, User} from '@mnr-crm/shared-models';

@Injectable({
    providedIn: 'root'
})
export class ApiReferencesService {
    constructor(private readonly http: HttpClient) {}

    // TODO: delete incomes
    getReference<T>(type: ReferencesTypes | 'incomes'): Observable<T> {
        return this.http.get<T>(`/api/references/${type}`);
    }

    // TODO: delete incomes
    createReferenceItem<T>(refType: ReferencesTypes | 'incomes', body: T): Observable<T> {
        return this.http.post<T>(`/api/references/${refType}/create`, body);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>('/api/users/create', user);
    }
}
