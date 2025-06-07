import { Routes } from '@angular/router';
import { PageDashboardComponent } from './pages/admin/page-dashboard/page-dashboard.component';
import { PageLoginComponent } from './pages/admin/page-login/page-login.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        component: PageLoginComponent,
        title: "Login",
        path: "login"
    },
    {
        component: PageDashboardComponent,
        title: "Dashboard Admin",
        path: "admin/dashboard"
    }
];
