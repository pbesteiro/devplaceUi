import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/auth.service";
import { environment } from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.userValue;
        const isLoggedIn = user && user.accessToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.accessToken}` }
            });
        }

        return next.handle(request);
    }
}

export const jwtInterceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }];
