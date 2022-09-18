import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule),
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '',
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
