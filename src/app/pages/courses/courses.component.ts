import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEditComponent} from "./create-edit/create-edit.component";
import {MatTableDataSource} from "@angular/material/table";
import {first} from "rxjs";
import {CourseModel} from "../../models/course.model";
import {CourseService} from "../../services/course.services";
import {TechnologyModel} from "../../models/technology.model";
import Swal from "sweetalert2";

const courses: CourseModel[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: CourseModel = new CourseModel('', '', '', '', '', '', new TechnologyModel('', '', false))
  editAction: boolean = false;
  loading = true

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['name', 'type', 'technology', 'actionEdit', 'actionDelete'];
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
      this.dataSource.data = response.filter((course:any) => {
        if (course.active) {
          return course
        }
      })
      this.loading = false
    })
  }

  openDialog(course?: CourseModel) {

    if (course) {
      this.course = course;
      this.editAction = true
    }

    const dialogRef = this.dialog.open(CreateEditComponent, {
      // disableClose: true,
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

  removeCourse(course: any) {
    Swal.fire({
      title: '¿Quiere eliminar el curso?',
      text: ``,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.courseService.update(course._id, { active: false })
          .subscribe( () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tecnología eliminada',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              heightAuto: false,
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout( () => {
              window.location.reload();
            }, 1400)
          })

      }
    })
  }

}
