import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.services";
import {UserModel} from "../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {StudentCreateEditComponent} from "./student-create-edit/student-create-edit.component";
import {errorCommunicationWithRetry} from "../../helpers/error.communication";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'email', 'actionEdit', 'actionDelete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAllStudents()
      .subscribe( (response) => {
        this.dataSource.data = response.filter( (user: any) => {
          if (user.active) {
            return user
          }
        })
        this.loading = false
      }, (error: any) => {
        this.loading = false
        errorCommunicationWithRetry(error)
      })
  }

  openDialog() {
    this.dialog.open(StudentCreateEditComponent, {
      maxHeight: window.innerHeight + 'px',
      data: {
        role: 'STUDENT',
        student: {
          name: '',
          comments: '',
        }
      }
    });
  }

  editStudent(studentId: string, student: any ) {
    this.dialog.open(StudentCreateEditComponent, {
      maxHeight: window.innerHeight + 'px',
      data: {
        role: 'STUDENT',
        isEdit: true,
        studentId,
        student
      }
    });
  }

  removeStudent( studentId: string ) {
    Swal.fire({
      title: '¿Quiere eliminar al estudiante?',
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
        this.userService.update(studentId, {active: false})
          .subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Estudiante eliminado',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              heightAuto: false,
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              window.location.reload();
            }, 1400)
          })

      }
    })
  }

}
