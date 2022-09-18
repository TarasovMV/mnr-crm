import {Injectable} from '@angular/core';


const AUTH_TOKEN = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string | undefined = undefined;

    set token(value: string | undefined) {
        if (!value) {
            return;
        }

        localStorage.setItem(AUTH_TOKEN, value);
        this._token = value;
    }

    get token(): string | undefined {
        return this._token || (localStorage.getItem(AUTH_TOKEN) ?? undefined);
    }

    clear(): void {
        this._token = undefined;
        localStorage.removeItem(AUTH_TOKEN);
    }
}
