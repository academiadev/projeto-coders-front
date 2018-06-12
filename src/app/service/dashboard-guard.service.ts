import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UsuarioDTO } from '../dto/usuario-dto';
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
    this.usuarioService.whoami().subscribe((usuario: UsuarioDTO) => {
      if (usuario.isAdmin) {
        this.router.navigate(['/dashboardAdmin']);
      } else {
        this.router.navigate(['/dashboardUsuario']);
      }
    });

    return true;
  }


}
