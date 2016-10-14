import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ClientsComponent } from './clients';
import { HistoryComponent } from './history';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './login/index';
import { AuthGuard } from './shared/_guards/index';
import { DataResolver } from './app.resolver';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent
    //, canActivate: [AuthGuard] 
    },
    { path: 'home',  component: HomeComponent },
    { path: 'about', component: AboutComponent  },
    { path: 'clientes', component: ClientsComponent },
    { path: 'historico', component: HistoryComponent },

    // otherwise redirect to home
    { path: '**',    component: NoContentComponent },
];

export const ROUTES = RouterModule.forRoot(appRoutes);
