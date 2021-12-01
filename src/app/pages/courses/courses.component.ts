import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEditComponent} from "./create-edit/create-edit.component";
import {MatTableDataSource} from "@angular/material/table";
import {first} from "rxjs";
import {CourseModel} from "../../models/course.model";
import {CourseService} from "../../services/course.services";
import {TechnologyModel} from "../../models/technology.model";

const courses: CourseModel[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: CourseModel = new CourseModel('', '', '', '', '', '', new TechnologyModel('', '', false))
  editAction: boolean = false;

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
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

  openDialog(course?: CourseModel) {

    if (course) {
      this.course = course;
      this.editAction = true
    }

    const dialogRef = this.dialog.open(CreateEditComponent, {
      disableClose: true,
      data: {
        course: this.course,
        editAction: this.editAction,
        courseId: this.course._id,
      }
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          window.location.reload();
        }
      })
  }

}
