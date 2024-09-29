import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@mnr-crm/shared-models';

@Injectable({
    providedIn: 'root'
})
export class ApiAuthService {
    constructor(private readonly http: HttpClient) {}

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>('/api/users/login', {
            username,
            password
        });
    }

    changePassword(password: string, newPassword: string): Observable<any> {
        return this.http.post('/api/users/change-password', {
            password,
            newPassword
        })
    }

    current(): Observable<User> {
        return this.http.get<User>('/api/users/current');
    }
}
