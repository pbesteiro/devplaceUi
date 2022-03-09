import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { HeaderComponent } from "./header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [
    NoPageFoundComponent,
    HeaderComponent,
    MenuComponent,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    NoPageFoundComponent
  ]
})

export class ComponentsModule { }
