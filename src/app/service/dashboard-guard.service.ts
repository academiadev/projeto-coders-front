import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem(environment.tokenName);
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken.autorizacao === 'ROLE_ADMIN') {
      this.router.navigate(['/dashboardAdmin']);
    } else {
      this.router.navigate(['/dashboardUsuario']);
    }

    return true;
  }


}
