import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import { NoPageFoundComponent } from "./components/no-page-found/no-page-found.component";
import { NgModule } from "@angular/core";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  // { path: 'campus', component: PagesComponent, canActivate: [AuthGuard] },
  { path: 'campus',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard],
    data: {
      role: ['ADMIN', 'MANAGER', 'STUDENT', 'MENTOR']
    },
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/campus', pathMatch: 'full' },
  { path: 'not-found', component: NoPageFoundComponent, data:{title: "Ooops! 404"}},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
