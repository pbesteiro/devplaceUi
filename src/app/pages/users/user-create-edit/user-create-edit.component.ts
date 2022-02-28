import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersComponent} from "../users.component";
import {UserService} from "../../../services/user.services";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {

  public userForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl(this.data.user.lastName, [Validators.required, Validators.minLength(4)]),
    email: new FormControl(this.data.user.email, [Validators.required, Validators.minLength(4)]),
    dni: new FormControl(this.data.user.dni, [Validators.required, Validators.minLength(4)]),
    phone: new FormControl(this.data.user.phone, [Validators.required, Validators.minLength(4)]),
    comments: new FormControl(this.data.user.comments, [Validators.minLength(4)]),
  })

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  createEditUser() {
    if ( this.data.isEdit ) {
      this.editUser()
    } else {
      this.createUser()
    }

    setTimeout( () => {
      window.location.reload();
    }, 1400)
  }

  editUser() {
    const user = {
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastname,
      email: this.userForm.value.email,
      dni: this.userForm.value.dni,
      phone: this.userForm.value.phone,
      comments: this.userForm.value.comments,
    }


    this.userService.update(this.data.userId, user)
      .subscribe( () => {
        this.dialogRef.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Manager actualizado',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  createUser() {

    const user = {
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastname,
      email: this.userForm.value.email,
      dni: this.userForm.value.dni,
      phone: this.userForm.value.phone,
      comments: this.userForm.value.comments,
      roles: ['MANAGER'],
      active: true,
    }
    this.userService.create(user)
      .subscribe( () => {
        this.dialogRef.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Manager creado',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      })

  }

  closeDialog() {
    this.dialogRef.close()
  }

}
