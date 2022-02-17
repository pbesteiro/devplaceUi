import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../components/components.module";
import { PagesComponent } from './pages.component';
import { UsersComponent } from "./users/users.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
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
import {MatTableModule} from "@angular/material/table";
import {UserCreateEditComponent} from "./users/user-create-edit/user-create-edit.component";
import {EventCreateEditComponent} from "./calendar/event-create-edit/event-create-edit.component";
import {TechnologiesComponent} from "./technologies/technologies.component";
import {TechnologyCreateEditComponent} from "./technologies/technology-create-edit/technology-create-edit.component";
import {EventDetailComponent} from "./calendar/event-detail/event-detail.component";
import {StudentsComponent} from "./students/students.component";
import {MentorsComponent} from "./mentors/mentors.component";
import {MatTabsModule} from "@angular/material/tabs";
import {TabAssistantsComponent} from "./calendar/event-detail/tab-assistants/tab-assistants.component";
import {TabDetailComponent} from "./calendar/event-detail/tab-detail/tab-detail.component";
import {AddAssistantsComponent} from "./calendar/event-detail/tab-assistants/add-assistants/add-assistants.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CommissionsComponent} from "./commissions/commissions.component";
import {CommissionCreateEditComponent} from "./commissions/commission-create-edit/commission-create-edit.component";
import {CommissionDetailComponent} from "./commissions/commission-detail/commission-detail.component";
import {
  CommissionTabDetailComponent
} from "./commissions/commission-detail/commission-tab-detail/commission-tab-detail.component";
import {
  CommissionTabAssistantsComponent
} from "./commissions/commission-detail/commission-tab-assistants/commission-tab-assistants.component";
import {CommissionViewDetailComponent} from "./commissions/commission-view-detail/commission-view-detail.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommissionAddStudentsComponent} from "./commissions/commission-add-students/commission-add-students.component";
import {StudentCreateEditComponent} from "./students/student-create-edit/student-create-edit.component";
import {MentorCreateEditComponent} from "./mentors/mentor-create-edit/mentor-create-edit.component";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthGuard} from "../guards/auth.guard";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

const pagesRoute: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER', 'STUDENT', 'MENTOR']
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: 'ADMIN'
        },
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER']
        },
      },
      {
        path: 'cursos', component: CoursesComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER']
        },
      },
      {
        path: 'technologies', component: TechnologiesComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER']
        },
      },
      {
        path: 'students', component: StudentsComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER']
        },
      },
      {
        path: 'mentors', component: MentorsComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER']
        },
      },
      {
        path: 'commissions', component: CommissionsComponent,
        canActivate: [ AuthGuard ],
        data: {
          role: ['ADMIN', 'MANAGER']
        },
      },
      /*
      { path: ':id', component:ContactDetailComponent,
        resolve:{ contact:ContactDetailResolverService }
      }
      */
    ],
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    DashboardComponent,
    CalendarComponent,
    CreateEditComponent,
    CoursesComponent,
    UserCreateEditComponent,
    EventCreateEditComponent,
    TechnologiesComponent,
    TechnologyCreateEditComponent,
    EventDetailComponent,
    StudentsComponent,
    MentorsComponent,
    TabAssistantsComponent,
    TabDetailComponent,
    AddAssistantsComponent,
    CommissionsComponent,
    CommissionCreateEditComponent,
    CommissionDetailComponent,
    CommissionTabDetailComponent,
    CommissionTabAssistantsComponent,
    CommissionViewDetailComponent,
    CommissionAddStudentsComponent,
    StudentCreateEditComponent,
    MentorCreateEditComponent,
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
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCheckboxModule,
    ClipboardModule,
    MatSnackBarModule,
    RouterModule.forChild(pagesRoute)
  ],
  exports: [
  ]
})

export class PagesModule {}
