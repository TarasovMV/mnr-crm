import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { UserService } from '@mnr-crm/client/services/user.service';
import { UserRole } from '@mnr-crm/shared-models';
import { AuthService } from '@mnr-crm/client/services';
import { TuiDialogService } from '@taiga-ui/core';
import {
    ChangePasswordDialogComponent
} from '@mnr-crm/client/components/change-password-dialog/change-password-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'mnr-crm-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
    readonly referencesItems = [
        {
            label: 'Продавцы',
            url: 'vendors',
            condition: () => this.userService.checkRole([])
        },
        {
            label: 'Покупатели',
            url: 'buyers',
            condition: () => this.userService.checkRole([UserRole.Manager])
        },
        {
            label: 'Поставщики',
            url: 'providers',
            condition: () => this.userService.checkRole([])
        },
        {
            label: 'Сотрудники',
            url: 'employers',
            condition: () => this.userService.checkRole([UserRole.Storekeeper])
        },
        {
            label: 'Транспортные средства',
            url: 'vehicles',
            condition: () => this.userService.checkRole([UserRole.Storekeeper])
        },
        {
            label: 'Продукция',
            url: 'products',
            condition: () => this.userService.checkRole([])
        }
    ];

    readonly menu = [
        {
            label: 'Сменить пароль',
            action: () => this.changePassword()
        },
        {
            label: 'Выход',
            action: () => this.exit()
        }
    ];

    get references() {
        return this.referencesItems.filter((i) => i.condition());
    }

    isReferenceMenuOpen = false;
    isDotMenuOpen = false;

    readonly activeMenu$ = this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        map(({ url }: any) => url),
        startWith(this.router.url),
        map((url) =>
            url.includes('dashboard')
                ? 'dashboard'
                : url.includes('incomes')
                    ? 'incomes'
                    : 'reference'
        )
    );

    get isReferencesAvailable(): boolean {
        return this.userService.checkRole([
            UserRole.Manager,
            UserRole.Storekeeper
        ]);
    }

    get isIncomeAvailable(): boolean {
        return this.userService.checkRole([
            UserRole.Storekeeper,
            UserRole.Counter
        ]);
    }

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly router: Router
    ) {
    }

    changePassword(): void {

        this.dialogs.open(
            new PolymorpheusComponent(ChangePasswordDialogComponent, this.injector),
            {
                size: 'm'
            }
        ).subscribe();
    }

    goToPage(page: 'incomes' | 'dashboard'): void {
        this.router.navigate([page]).then();
    }

    chooseRef({ url }: { url: string }): void {
        this.router.navigate(['reference', url]).then();
    }

    exit(): void {
        this.authService.clear();
        this.router.navigate(['login']).then();
    }
}
