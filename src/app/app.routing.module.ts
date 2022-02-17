import { RouterModule, Routes } from "@angular/router";
import { NoPageFoundComponent } from "./components/no-page-found/no-page-found.component";
import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages/pages.routing.module";
import { AuthRoutingModule } from "./auth/auth.routing";

const routes: Routes = [
  { path: '', redirectTo: '/campus', pathMatch: 'full'},
  { path: '**', component: NoPageFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes,  {useHash: true} ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
