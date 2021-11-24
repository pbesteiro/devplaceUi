import { PagesComponent } from "./pages.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  {
    path: 'campus',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    data: {
      expectedRole: 'ADMIN'
    },
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
