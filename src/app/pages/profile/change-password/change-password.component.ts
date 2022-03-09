import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileComponent} from "../profile.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.services";
import {errorCommunicationWithRetry} from "../../../helpers/error.communication";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isEqual = false
  hidePassword = true
  hideRepeatPassword = true

  public changePasswordForm: FormGroup = this.fb.group({
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{7,20}'), Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{7,20}'), Validators.minLength(8)]),
  })

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.onChanges()
  }

  closeDialog() {
    this.dialogRef.close()
  }

  onChanges() {
    return this.changePasswordForm.valueChanges
      .subscribe( (form: any) => {
        this.isEqual = form.password === form.repeatPassword;
      });
  }

  updatePassword() {
    console.log(this.changePasswordForm.value)
    const body = {
      password: this.changePasswordForm.value.password,
    }

    this.userService.updatePassword(this.data.user._id, body)
      .subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password actualizada',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            heightAuto: false,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout( () => {
            window.location.reload();
          }, 1400)
        },
        (error: any) => {
          errorCommunicationWithRetry(error)
        }
      )
  }

}
