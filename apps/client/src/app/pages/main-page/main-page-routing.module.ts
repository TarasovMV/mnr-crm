import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './main-page.component';


const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('../dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule),
            },
            {
                path: 'reference/employers',
                loadChildren: () => import('../reference-pages/users-page/users-page.module').then(m => m.UsersPageModule),
            },
            {
                path: 'reference/buyers',
                loadChildren: () => import('../reference-pages/buyers-page/buyers-page.module').then(m => m.BuyersPageModule),
            },
            {
                path: 'reference/incomes',
                loadChildren: () => import('../reference-pages/income-page/income-page.module').then(m => m.IncomePageModule),
            },
            {
                path: 'reference/vendors',
                loadChildren: () => import('../reference-pages/vendors-page/vendors-page.module').then(m => m.VendorsPageModule),
            },
            {
                path: 'reference/providers',
                loadChildren: () => import('../reference-pages/providers-page/providers-page.module').then(m => m.ProvidersPageModule),
            },
            {
                path: 'reference/vehicles',
                loadChildren: () => import('../reference-pages/vehicles-page/vehicles-page.module').then(m => m.VehiclesPageModule),
            },
            {
                path: 'reference/products',
                loadChildren: () => import('../reference-pages/products-page/products-page.module').then(m => m.ProductsPageModule),
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {}
