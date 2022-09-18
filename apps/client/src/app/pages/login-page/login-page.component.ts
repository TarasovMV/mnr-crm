import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiAuthService} from '../../services/api/api-auth.service';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Component({
    selector: 'mnr-crm-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less'],
    providers: [TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
    readonly loginForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    })

    constructor(
        private readonly apiAuth: ApiAuthService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly alertService: TuiAlertService,
        private readonly destroy$: TuiDestroyService,
    ) {}

    submit(): void {
        const {login, password} = this.loginForm.value;

        if (!this.loginForm.valid || !login || !password) {
            this.loginForm.markAllAsTouched();

            return;
        }

        this.apiAuth.login(login, password)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ({token}) => {
                    this.authService.token = token;
                    this.router.navigate(['']).then();
                },
                () => {
                    this.alertService
                        .open('Ошибка авторизации', {status: TuiNotification.Error})
                        .pipe(takeUntil(this.destroy$))
                        .subscribe();
                }
            );
    }
}

