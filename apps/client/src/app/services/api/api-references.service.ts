import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReferencesTypes, User} from '@mnr-crm/shared-models';


@Injectable({
    providedIn: 'root'
})
export class ApiReferencesService {
    constructor(private readonly http: HttpClient) {}

    getReference<T>(type: ReferencesTypes): Observable<T> {
        return this.http.get<T>(`/api/references/${type}`);
    }

    getReferenceItem<T>(type: ReferencesTypes, id: string): Observable<T> {
        return this.http.get<T>(`/api/references/${type}/${id}`);
    }

    createReferenceItem<T>(refType: ReferencesTypes, body: T): Observable<T> {
        return this.http.post<T>(`/api/references/${refType}`, body);
    }

    updateReferenceItem<T>(refType: ReferencesTypes, id: string, body: T): Observable<T> {
        return this.http.put<T>(`/api/references/${refType}/${id}`, body);
    }

    deleteReferenceItem<T>(refType: ReferencesTypes, id: string): Observable<T> {
        return this.http.delete<T>(`/api/references/${refType}/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>('/api/users/create', user);
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.http.put<User>(`/api/users/update/${id}`, user);
    }
}
