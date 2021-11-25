import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../components/components.module";
import { PagesComponent } from './pages.component';
import { UsersComponent } from "./users/users.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import {CalendarComponent} from "./calendar/calendar.component";
import {FullCalendarModule} from "@fullcalendar/angular";

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    DashboardComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    FullCalendarModule,
  ],
  exports: [
  ]
})

export class PagesModule {}
