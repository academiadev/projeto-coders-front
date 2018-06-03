import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from 'ngx-clipboard';

import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { EmailEnviadoComponent } from './email-enviado/email-enviado.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardUsuarioComponent } from './dashboard-usuario/dashboard-usuario.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { GastosComponent } from './gastos/gastos.component';

import { ReembolsosService } from './service/reembolsos.service';
import { LoginService } from './service/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    EmailEnviadoComponent,
    RedefinirSenhaComponent,
    PerfilComponent,
    DashboardUsuarioComponent,
    NavigatorComponent,
    DashboardAdminComponent,
    GastosComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    TextMaskModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  providers: [ReembolsosService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
