import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, retry, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
          .pipe(
            retry(1),
            catchError( (error: HttpErrorResponse) => {
              let errorMessage: string;
              if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
              } else {
                // server-side error
                errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                console.log(this.authService.userValue)
                if ([401, 403].includes(error.status) && !this.authService.userValue) {
                  this.authService.logout();
                }
              }
            console.error(errorMessage);
            throw new Error(errorMessage);
        }))
    }
}
