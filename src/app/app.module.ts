import {APP_INITIALIZER, LOCALE_ID, NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app.routing.module";
import { PagesModule } from "./pages/pages.module";
import { AuthModule } from "./auth/auth.module";
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthenticationService } from "./services/auth.service";
import { appInitializer } from "./helpers/app.initializer";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { jwtInterceptorProvider } from "./interceptors/jwt.interceptor";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es'
import {NgxWhastappButtonModule} from "ngx-whatsapp-button";
registerLocaleData(localeEs, 'es')

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxWhastappButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("accessToken") || null
        },
      },
    })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    jwtInterceptorProvider,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es' },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
