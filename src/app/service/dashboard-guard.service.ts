import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private usuarioService: UsuarioService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem(environment.tokenName);
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.usuarioService.usuario = decodedToken.usuario;

    if(!this.usuarioService.usuario.isAdmin &&
      route.routeConfig.path === 'dashboardAdmin') {
        this.router.navigate(['/dashboardUsuario']);
        return false; 
    }

    if(this.usuarioService.usuario.isAdmin &&
      route.routeConfig.path === 'dashboardUsuario') {
        this.router.navigate(['/dashboardAdmin']);
        return false;
      }

    return true;
  }


}
