import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../components/components.module";
import { PagesComponent } from './pages.component';
import { UsersComponent } from "./users/users.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
  ],
  exports: [
  ]
})

export class PagesModule {}
