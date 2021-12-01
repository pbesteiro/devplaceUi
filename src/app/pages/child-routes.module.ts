import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { CalendarComponent } from "./calendar/calendar.component";
import {CoursesComponent} from "./courses/courses.component";
import {TechnologiesComponent} from "./technologies/technologies.component";
import {StudentsComponent} from "./students/students.component";
import {MentorsComponent} from "./mentors/mentors.component";

const childRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'cursos', component: CoursesComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'mentors', component: MentorsComponent },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
