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

    copy(id: string): Observable<Request> {
        return this.http.post<Request>(`/api/request/copy/${id}`, {});
    }

    update(id: string, request: Request): Observable<Request> {
        return this.http.put<Request>(`/api/request/${id}`, request);
    }

    getAll(): Observable<Request[]> {
        return this.http.get<Request[]>('/api/request/all');
    }

    getById(id: string): Observable<Request> {
        return this.http.get<Request>(`/api/request/${id}`);
    }

    deleteById(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`/api/request/${id}`);
    }

    downloadTTN(id: string): void {
        window.open(`/api/request/ttn/${id}`)
    }
}
