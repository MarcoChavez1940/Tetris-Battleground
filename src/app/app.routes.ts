import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from './lobby/lobby.component';
import { TetrisComponent } from './tetris/tetris.component';
import { LoginComponent } from './login/login.component';


const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lobby', component: LobbyComponent},
    { path: 'tetris', component: TetrisComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);