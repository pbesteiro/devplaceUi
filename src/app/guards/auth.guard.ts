import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import { AuthenticationService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    const roles = this.authService.role;

    if (user) {
      for ( const rol of roles ) {
        if (route.data['role'] && (route.data['role'].indexOf(rol) === -1)) {
          this.router.navigate(['/campus']);
          return false;
        }
      }
      return true
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }
}
