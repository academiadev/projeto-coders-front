import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AppErrorHandler } from './commons/app-error-handler';
import { ErrorHandler } from '@angular/core';
import { AuthGuard } from './service/auth-guard.service';
import { environment } from './../environments/environment';

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
import { NotFoundComponent } from './not-found/not-found.component';
import { SenhaRedefinidaComponent } from './senha-redefinida/senha-redefinida.component';

import { ReembolsosService } from './service/reembolsos.service';
import { LoginService } from './service/login.service';
import { CadastroService } from './service/cadastro.service';
import { RecupararSenhaService } from './service/recuparar-senha.service';
import { RedefinirSenhaService } from './service/redefinir-senha.service';
import { AtualizaPerfilService } from './service/atualiza-perfil.service';
import { AvisoComponent } from './aviso/aviso.component';

export function tokenGetter() {
  const token = localStorage.getItem(environment.tokenName);
  return token;
}

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
    GastosComponent,
    NotFoundComponent,
    SenhaRedefinidaComponent,
    AvisoComponent
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
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          environment.backEndUrl,
          environment.urls.auth.login
        ],
        blacklistedRoutes: [
          environment.urls.auth.refresh
        ]
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    ReembolsosService,
    LoginService,
    CadastroService,
    RecupararSenhaService,
    RedefinirSenhaService,
    AtualizaPerfilService,
    AppErrorHandler,
    AuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
