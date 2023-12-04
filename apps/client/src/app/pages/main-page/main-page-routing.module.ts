import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { ReferencesGuard } from '../../guards/references.guard';
import { UsersGuard } from '../../guards/users.guard';
import { VehiclesGuard } from '../../guards/vehicles.guard';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('../dashboard-page/dashboard-page.module').then(
                        (m) => m.DashboardPageModule
                    ),
            },
            {
                path: 'incomes',
                loadChildren: () =>
                    import('../incomes-page/incomes-page.module').then(
                        (m) => m.IncomesPageModule
                    ),
            },
            {
                path: 'reference/employers',
                loadChildren: () =>
                    import(
                        '../reference-pages/users-page/users-page.module'
                    ).then((m) => m.UsersPageModule),
                canActivate: [UsersGuard],
            },
            {
                path: 'reference/buyers',
                loadChildren: () =>
                    import(
                        '../reference-pages/buyers-page/buyers-page.module'
                    ).then((m) => m.BuyersPageModule),
                canActivate: [ReferencesGuard],
            },
            {
                path: 'reference/vendors',
                loadChildren: () =>
                    import(
                        '../reference-pages/vendors-page/vendors-page.module'
                    ).then((m) => m.VendorsPageModule),
                canActivate: [ReferencesGuard],
            },
            {
                path: 'reference/providers',
                loadChildren: () =>
                    import(
                        '../reference-pages/providers-page/providers-page.module'
                    ).then((m) => m.ProvidersPageModule),
                canActivate: [ReferencesGuard],
            },
            {
                path: 'reference/vehicles',
                loadChildren: () =>
                    import(
                        '../reference-pages/vehicles-page/vehicles-page.module'
                    ).then((m) => m.VehiclesPageModule),
                canActivate: [VehiclesGuard],
            },
            {
                path: 'reference/products',
                loadChildren: () =>
                    import(
                        '../reference-pages/products-page/products-page.module'
                    ).then((m) => m.ProductsPageModule),
                canActivate: [ReferencesGuard],
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {}
