import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { UserModel } from "../models/user.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LoginUserModel } from "../models/login.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<any>
  public user: Observable<UserModel>;
  public role: any;
  public redirectUrl: any = null;

  constructor(
    public jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient
  ) {
    // @ts-ignore
    this.userSubject = new BehaviorSubject<UserModel>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserModel {
    return this.userSubject.value;
  }

  getRole() {
    /*
    const token = (document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1];
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return tokenPayload.roles;
    */
    // @ts-ignore
    return JSON.parse(localStorage.getItem('roles')) || []
  }


  refreshToken() {
    const refreshToken = (document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1];
    // const refreshToken = document.cookie.split('=')[1];
    return this.http.post(`${ apiUrl }/auth/refresh`, { token: refreshToken })
      .pipe(
        map( (response: any) => {
          const tokenPayload = this.jwtHelper.decodeToken(response.accessToken);
          const t = tokenPayload.exp * 1000
          const cookieExp = new Date(t).toUTCString();
          const user = new UserModel(
            tokenPayload._id,
            tokenPayload.name,
            tokenPayload.lastName,
            tokenPayload.email,
            tokenPayload.active,
            tokenPayload.roles,
            tokenPayload.classes,
            response.accessToken
          )
          document.cookie = `refreshToken=${response.accessToken}; expires=${cookieExp} ; path=/`
          this.role = tokenPayload.roles;
          localStorage.setItem('roles', JSON.stringify(this.role))
          localStorage.setItem('classes', JSON.stringify(tokenPayload.classes))
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      )
  }

  login(loginUser: LoginUserModel) {
    return this.http.post(`${ apiUrl }/auth/signin`, loginUser)
      .pipe(
        map( (response: any) => {
          const tokenPayload = this.jwtHelper.decodeToken(response.accessToken);
          const t = tokenPayload.exp * 1000
          const cookieExp = new Date(t).toUTCString();
          const user = new UserModel(
            tokenPayload._id,
            tokenPayload.name,
            tokenPayload.lastName,
            tokenPayload.email,
            tokenPayload.active,
            tokenPayload.roles,
            tokenPayload.classes,
            response.accessToken
          )
          document.cookie = `refreshToken=${response.accessToken}; expires=${cookieExp} ; path=/`
          this.role = tokenPayload.roles;
          localStorage.setItem('roles', JSON.stringify(this.role))
          localStorage.setItem('classes', JSON.stringify(tokenPayload.classes))
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      )

  }

  logout() {
    this.stopRefreshTokenTimer();
    document.cookie = `refreshToken= ; expires= Thu, 01 Jan 1970 00:00:00 GMT`
    localStorage.removeItem('roles')
    localStorage.removeItem('classes')
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    // @ts-ignore
    const jwtToken = JSON.parse(atob(this.userValue.accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
