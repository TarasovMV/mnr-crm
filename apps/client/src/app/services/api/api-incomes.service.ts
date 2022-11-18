import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '@mnr-crm/shared-models';
import { FileSaver } from '../../utils';

@Injectable({
    providedIn: 'root',
})
export class ApiIncomesService {
    constructor(private readonly http: HttpClient) {}

    getAll(): Observable<Income[]> {
        return this.http.get<Income[]>('/api/incomes/all');
    }

    getById(id: string): Observable<Income> {
        return this.http.get<Income>(`/api/incomes/${id}`);
    }

    updateById(id: string, body: Income): Observable<Income> {
        return this.http.put<Income>(`/api/incomes/${id}`, body);
    }

    deleteById(id: string): Observable<unknown> {
        return this.http.delete<Income>(`/api/incomes/${id}`);
    }

    create(body: Income): Observable<Income> {
        return this.http.post<Income>('/api/incomes/create', body);
    }

    downloadReport(): void {
        this.http
            .get(`/api/incomes/report`, { responseType: 'blob' as 'json' })
            .subscribe((response: any) => {
                const dataType = response.type;
                const binaryData = [];
                binaryData.push(response);
                FileSaver.download(
                    new Blob(binaryData, { type: dataType }),
                    `Отчет по приходам от ${new Date().toLocaleDateString(
                        'ru-RU'
                    )}.xlsx`
                );
            });
    }
}
