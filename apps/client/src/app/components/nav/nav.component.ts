import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '@mnr-crm/client/services/user.service';
import { UserRole } from '@mnr-crm/shared-models';

@Component({
    selector: 'mnr-crm-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
    readonly references = [
        {
            label: 'Продавцы',
            url: 'vendors',
        },
        {
            label: 'Покупатели',
            url: 'buyers',
        },
        {
            label: 'Поставщики',
            url: 'providers',
        },
        {
            label: 'Сотрудники',
            url: 'employers',
        },
        {
            label: 'Транспортные средства',
            url: 'vehicles',
        },
        {
            label: 'Продукция',
            url: 'products',
        },
    ];

    readonly menu = [
        {
            label: 'Выход',
            action: () => this.exit(),
        },
    ];

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
        return this.userService.checkRole([]);
    }

    get isIncomeAvailable(): boolean {
        return this.userService.checkRole([
            UserRole.Storekeeper,
            UserRole.Counter,
        ]);
    }

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly router: Router
    ) {}

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
