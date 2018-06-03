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

export const ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'recuperarSenha', component: RecuperarSenhaComponent},
  {path: 'emailEnviado', component: EmailEnviadoComponent},
  {path: 'senhaRedefinida', component: SenhaRedefinidaComponent},
  {path: 'redefinirSenha', component: RedefinirSenhaComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'dashboardUsuario', component: DashboardUsuarioComponent},
  {path: 'dashboardAdmin', component: DashboardAdminComponent},
  {path: 'gastos', component: GastosComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];
