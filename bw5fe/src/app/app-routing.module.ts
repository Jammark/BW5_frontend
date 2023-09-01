import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { AuthGuard } from './components/auth/auth.guard';
import { LoggedGuard } from './components/auth/logged.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CatalogoFattureComponent } from './components/catalogo-foto/catalogo-foto.component';
import { FattureComponent } from './components/fotos/fatture.component';
import { GestioneFatturaComponent } from './components/gestione-foto/gestione-foto.component';
import { GestioneClienteComponent } from './components/gestione-cliente/gestione-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditGuard } from './components/auth/edit.guard';
import { UsersComponentComponent } from './components/users-component/users-component.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: ClientiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    component: GestioneClienteComponent,
    canActivate: [AuthGuard, EditGuard]
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [LoggedGuard]
  },
  {
      path: 'register',
      component: RegisterComponent,
      canActivate: [LoggedGuard]
  },
  {
    path: 'users',
    component: UsersComponentComponent,
    canActivate: [AuthGuard, EditGuard]
},
  {
    path:'albums',
    component: CatalogoFattureComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'fotos/:id',
        component: FattureComponent
      },
      {
        path: '',
        component: AlbumsComponent
      },
      {
        path: 'gestioneFoto/:id',
        component: GestioneFatturaComponent,
        canActivate: [EditGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
