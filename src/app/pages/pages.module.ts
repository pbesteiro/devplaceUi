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
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEditComponent} from "./courses/create-edit/create-edit.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {CoursesComponent} from "./courses/courses.component";

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
    CreateEditComponent,
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    RouterModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
  ]
})

export class PagesModule {}
