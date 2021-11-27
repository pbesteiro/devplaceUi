import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {

  public userForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  createEditUser() {
    console.log(this.userForm.value)
  }

}
