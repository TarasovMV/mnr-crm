import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '@mnr-crm/shared-models';
import { Observable } from 'rxjs';
import { FileSaver } from '../../utils';

@Injectable({
    providedIn: 'root',
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
        this.http
            .get(`/api/request/ttn/${id}`, { responseType: 'blob' as 'json' })
            .subscribe((response: any) => {
                const dataType = response.type;
                const binaryData = [];
                binaryData.push(response);
                FileSaver.download(
                    new Blob(binaryData, { type: dataType }),
                    `ttn_${id}.xlsx`
                );
            });
    }
}
