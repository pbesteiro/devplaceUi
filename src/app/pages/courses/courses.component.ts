import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEditComponent} from "./create-edit/create-edit.component";
import {UserModel} from "../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {INITIAL_EVENTS} from "../../events/event-utils";
import {first} from "rxjs";
import {CourseModel} from "../../models/course.model";
import {CourseService} from "../../services/course.services";

const courses: CourseModel[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: CourseModel = new CourseModel('', '', '', '', '', '', [])

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(courses);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.courseService.getAll()
      .pipe(
        first()
      ).subscribe( (response: any) => {
      this.dataSource.data = response
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      data: { course: this.course}
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        const data = this.dataSource.data;
        this.course = result;
        data.push(this.course)
        this.dataSource.data = data;
      })
  }

}
