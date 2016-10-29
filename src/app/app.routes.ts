import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients';
import { VisitComponent } from './visit';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './login/index';
import { AuthGuard } from './shared/_guards/index';
import { DataResolver } from './app.resolver';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'visitas', component: VisitComponent, canActivate: [AuthGuard] },
    { path: 'visitas/:id', component: VisitComponent, canActivate: [AuthGuard] },
    { path: 'clientes', component: ClientsComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**',    component: NoContentComponent },
];

export const ROUTES = RouterModule.forRoot(appRoutes);
