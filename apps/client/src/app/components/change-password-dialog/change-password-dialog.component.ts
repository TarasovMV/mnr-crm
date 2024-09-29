import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService, AuthService } from '@mnr-crm/client/services';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'mnr-crm-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.less'],
    providers: [TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordDialogComponent {
    readonly loginForm = new FormGroup({
        password: new FormControl<string>('', [Validators.required]),
        newPassword: new FormControl<string>('', [Validators.required]),
    })

    constructor(
        private readonly apiAuth: ApiAuthService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly alertService: TuiAlertService,
        private readonly destroy$: TuiDestroyService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext,
    ) {}

    submit(): void {
        if (!this.loginForm.valid) {
            return this.loginForm.markAllAsTouched();
        }

        const {
            password,
            newPassword
        } = this.loginForm.value as {
            password: string,
            newPassword: string,
        }

        this.apiAuth.changePassword(password, newPassword)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.alertService.open('Пароль успешно изменен! Вы будете перенаправлены на страницу входа.').subscribe();
                    this.authService.clear();
                    this.router.navigate(['login']).then();
                    this.context.completeWith();
                },
                error: (e) => {
                    this.alertService.open(e?.error?.message || JSON.stringify(e), {
                        label: 'Не удалось изменить пароль.',
                        status: 'error'
                    }).subscribe();
                }
            });
    }
}
