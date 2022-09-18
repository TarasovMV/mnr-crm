import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '@mnr-crm/shared-models';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiRequestService {
    constructor(private readonly http: HttpClient) {}

    create(request: Request): Observable<Request> {
        return this.http.post<Request>('/api/request/create', request);
    }

    getAll(): Observable<Request[]> {
        return this.http.get<Request[]>('/api/request/all');
    }
}
