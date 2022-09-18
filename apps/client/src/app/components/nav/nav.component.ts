import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, startWith} from 'rxjs';
import {AuthService} from '../../services/auth.service';


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
        {
            label: 'Поступления',
            url: 'incomes',
        },
    ];

    readonly menu = [
        {
            label: 'Выход',
            action: () => this.exit(),
        }
    ];

    isReferenceMenuOpen = false;
    isDotMenuOpen = false;

    readonly activeMenu$ = this.router.events
        .pipe(
            filter(e => e instanceof NavigationEnd),
            map(({url}: any) => url),
            startWith(this.router.url),
            map(url => url.includes('dashboard') ? 'dashboard' : 'reference'),
        );

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {}

    goToDashboard(): void {
        this.router.navigate(['dashboard']).then();
    }

    chooseRef({url}: {url: string}): void {
        this.router.navigate(['reference', url]).then();
    }

    exit(): void {
        this.authService.clear();
        this.router.navigate(['login']).then();
    }
}
