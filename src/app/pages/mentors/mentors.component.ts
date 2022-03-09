import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.services";
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "../users/user-create-edit/user-create-edit.component";
import {MentorCreateEditComponent} from "./mentor-create-edit/mentor-create-edit.component";
import Swal from "sweetalert2";
import {ChangePasswordComponent} from "../profile/change-password/change-password.component";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'asignaturas', 'actionEdit', 'cleanEdit', 'actionDelete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.usersService.getAllMentors()
      .subscribe( (response) => {
        this.dataSource.data = response.filter( (user: any) => {
          if (user.active) {
            return user
          }
        })
        this.loading = false
      })
  }

  cleanPassword(userId: string, user: any) {
    this.dialog.open(ChangePasswordComponent, {
      data: {
        user,
        isClean: true,
      }
    });
  }

  openDialog() {
    this.dialog.open(MentorCreateEditComponent, {
      maxHeight: window.innerHeight + 'px',
      data: {
        role: 'MENTOR',
        mentor: {
          name: '',
          linkedinProfile: '',
          comments: '',
        }
      }
    });
  }

  editMentor(mentorId: string, mentor: any ) {
    this.dialog.open(MentorCreateEditComponent, {
      maxHeight: window.innerHeight + 'px',
      data: {
        role: 'MENTOR',
        isEdit: true,
        mentorId: mentorId,
        mentor
      }
    });
  }

  removeMentor( mentorId: string ) {
    Swal.fire({
      title: '¿Quiere eliminar al mentor?',
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
        this.usersService.update(mentorId, {active: false})
          .subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Mentor eliminado',
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

  getSignatures( signatures: any) {
    return signatures.map( (tech: any) => ` ${tech.name}`).toString()
  }

}
