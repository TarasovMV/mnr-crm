import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor<T, K> implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(
        req: HttpRequest<T>,
        next: HttpHandler
    ): Observable<HttpEvent<K>> {
        const token = this.authService.token;

        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authService.token}`),
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    console.log('Unauthorized')
                }

                return throwError(err);
            })
        );
    }
}
