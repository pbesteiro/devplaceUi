import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.services";
import { first } from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "./user-create-edit/user-create-edit.component";
import {MentorCreateEditComponent} from "../mentors/mentor-create-edit/mentor-create-edit.component";
import Swal from "sweetalert2";
import {errorCommunicationWithRetry} from "../../helpers/error.communication";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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
      this.userService.getAllManagers()
        .pipe(
          first()
        ).subscribe( response => {
        this.dataSource.data = response.filter( (user: any) => {
          if (user.active) {
            return user
          }
        })
        this.loading = false
      }, (error:any) => {
        this.loading = false
        errorCommunicationWithRetry(error)

      })
  }

  openDialog() {
    this.dialog.open(UserCreateEditComponent, {
      data: {
        role: 'MANAGER',
        user: {
          name: '',
          comments: '',
        }
      }
    });
  }

  editUser(userId: string, user: any ) {
    this.dialog.open(UserCreateEditComponent, {
      data: {
        role: 'MANAGER',
        isEdit: true,
        userId,
        user,
      }
    });
  }

  removeUser( userId: string ) {
    Swal.fire({
      title: '¿Quiere eliminar al manager?',
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
        this.userService.update(userId, {active: false})
          .subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Manager eliminado',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              heightAuto: false,
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              window.location.reload();
            }, 1400)
          }, (error: any) => {
            this.loading = false
            errorCommunicationWithRetry(error)
          })

      }
    })
  }

}
