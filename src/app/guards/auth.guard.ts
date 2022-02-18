import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, CanDeactivate, CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import { AuthenticationService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]) {
    return true;
  }

  checkLogin(route: ActivatedRouteSnapshot, url: string) {
    if (this.authService.userValue != null) {
      const userRole = this.authService.getRole();
      const containsAll = route.data['role'].some((r: any)=> userRole.indexOf(r) >= 0)
      // const containsAll = true
      if (route.data['role'] && !containsAll) {
        this.router.navigate(['/campus']);
        return false;
      }
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
