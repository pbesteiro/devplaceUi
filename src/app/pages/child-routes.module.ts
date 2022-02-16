import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { CalendarComponent } from "./calendar/calendar.component";
import {CoursesComponent} from "./courses/courses.component";
import {TechnologiesComponent} from "./technologies/technologies.component";
import {StudentsComponent} from "./students/students.component";
import {MentorsComponent} from "./mentors/mentors.component";
import {CommissionsComponent} from "./commissions/commissions.component";
import {AuthGuard} from "../guards/auth.guard";

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
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
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
