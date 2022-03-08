import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MentorsComponent} from "../../mentors/mentors.component";
import {TechnologyService} from "../../../services/technology.service";
import {UserService} from "../../../services/user.services";
import Swal from "sweetalert2";

@Component({
  selector: 'app-student-create-edit',
  templateUrl: './student-create-edit.component.html',
  styleUrls: ['./student-create-edit.component.css']
})
export class StudentCreateEditComponent implements OnInit {

  public userForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.student.name, [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl(this.data.student.lastName, [Validators.required, Validators.minLength(4)]),
    email: new FormControl(this.data.student.email, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(this.data.mentor.password, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{7,20}'), Validators.minLength(8)]),
    dni: new FormControl(this.data.student.dni, [Validators.required, Validators.minLength(4)]),
    phone: new FormControl(this.data.student.phone, [Validators.required, Validators.minLength(4)]),
    comments: new FormControl(this.data.student.comments, [Validators.minLength(4)]),
  })

  constructor(
    public dialogRef: MatDialogRef<MentorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    if (this.data.isEdit) {
      // @ts-ignore
      this.userForm.get('password').clearValidators()
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }

  createEditStudent() {
    if ( this.data.isEdit ) {
      this.editStudent()
    } else {
      this.createStudent()
    }

    setTimeout( () => {
      window.location.reload();
    }, 1400)
  }

  editStudent() {
    const user = {
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastname,
      email: this.userForm.value.email,
      dni: this.userForm.value.dni,
      phone: this.userForm.value.phone,
      comments: this.userForm.value.comments,
    }

    this.userService.update(this.data.studentId, user)
      .subscribe( () => {
        this.dialogRef.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Estudiante actualizado',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  createStudent() {

    const user = {
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastname,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      dni: this.userForm.value.dni,
      phone: this.userForm.value.phone,
      comments: this.userForm.value.comments,
      roles: ['STUDENT'],
      active: true,
    }
    this.userService.create(user)
      .subscribe( () => {
        this.dialogRef.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Estudiante creado',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      })

  }

}
