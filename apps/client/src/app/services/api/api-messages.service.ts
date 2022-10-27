import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '@mnr-crm/shared-models';

@Injectable({
    providedIn: 'root',
})
export class ApiMessagesService {
    constructor(private readonly http: HttpClient) {}

    getByReference(referenceId: string): Observable<Message[]> {
        return this.http.get<Message[]>(`api/messages/request/${referenceId}`);
    }

    sendMessage(requestId: string, message: string): Observable<Message> {
        return this.http.post<Message>(`api/messages/text/${requestId}`, {
            message,
        });
    }

    sendPhoto(requestId: string, file: File): Observable<Message> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        const fb = new FormData();
        fb.append('file', file, file.name);

        return this.http.post<Message>(
            `api/messages/upload-image/${requestId}`,
            fb,
            {
                headers,
            }
        );
    }
}
