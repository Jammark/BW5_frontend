import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { GestioneClienteComponent } from './components/gestione-cliente/gestione-cliente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggingInterceptor } from './logging.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TokenInterceptor } from './components/auth/token.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { FattureComponent } from './components/fotos/fatture.component';
import { CatalogoFattureComponent } from './components/catalogo-foto/catalogo-foto.component';
import { GestioneFatturaComponent } from './components/gestione-foto/gestione-foto.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UsersComponentComponent } from './components/users-component/users-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientiComponent,
    GestioneClienteComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AlbumsComponent,
    FattureComponent,
    CatalogoFattureComponent,
    GestioneFatturaComponent,
    UsersComponentComponent,
    UsersComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
