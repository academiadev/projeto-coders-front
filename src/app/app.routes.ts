import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { EmailEnviadoComponent } from './email-enviado/email-enviado.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardUsuarioComponent } from './dashboard-usuario/dashboard-usuario.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { GastosComponent } from './gastos/gastos.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SenhaRedefinidaComponent } from './senha-redefinida/senha-redefinida.component';

import { LoginGuard } from './service/login-guard.service';
import { AuthGuard } from './service/auth-guard.service';
import { DashboardGuard } from './service/dashboard-guard.service';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'cadastro', component: CadastroComponent, canActivate: [LoginGuard]},
  {path: 'recuperarSenha', component: RecuperarSenhaComponent},
  {path: 'emailEnviado', component: EmailEnviadoComponent},
  {path: 'senhaRedefinida', component: SenhaRedefinidaComponent, canActivate: [AuthGuard]},
  {path: 'redefinirSenha', component: RedefinirSenhaComponent, canActivate: [AuthGuard]},
  {path: 'redefinirNovaSenha', component: RedefinirSenhaComponent, canActivate: []},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'dashboardUsuario', component: DashboardUsuarioComponent, canActivate: [AuthGuard, DashboardGuard]},
  {path: 'dashboardAdmin', component: DashboardAdminComponent, canActivate: [AuthGuard, DashboardGuard]},
  {path: 'gastos', component: GastosComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];
