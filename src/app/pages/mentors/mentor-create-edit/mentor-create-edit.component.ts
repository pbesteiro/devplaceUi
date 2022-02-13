import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {MentorsComponent} from "../mentors.component";
import {first} from "rxjs";
import {TechnologyService} from "../../../services/technology.service";
import {TechnologyModel} from "../../../models/technology.model";
import Swal from "sweetalert2";
import {UserService} from "../../../services/user.services";

@Component({
  selector: 'app-mentor-create-edit',
  templateUrl: './mentor-create-edit.component.html',
  styleUrls: ['./mentor-create-edit.component.css']
})
export class MentorCreateEditComponent implements OnInit {

  technologies: TechnologyModel[] = [];

  public userForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(4)]),
    // picture: new FormControl('assets/img/default-img.png'),
    picture: new FormControl(null),
    technologies: new FormControl([], [Validators.required]),
    linkedin: new FormControl('', [Validators.minLength(4)]),
    comments: new FormControl('', [Validators.minLength(4)]),
  })

  constructor(
    public dialogRef: MatDialogRef<MentorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private technologyService: TechnologyService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.technologyService.getAll()
      .pipe(
        first()
      ).subscribe( response => {
      this.technologies = response;
    })
  }

  createEditUser() {
    if ( this.data.isEdit ) {
      this.editMentor(this.userForm.value)
    } else {
      this.createMentor()
    }

    /*
    setTimeout( () => {
      window.location.reload();
    }, 1400)
    */
  }

  editMentor(mentor: any) {

  }

  createMentor() {

    const user = {
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastname,
      email: this.userForm.value.email,
      dni: this.userForm.value.dni,
      phone: this.userForm.value.phone,
      linkedinProfile: this.userForm.value.linkedin,
      comments: this.userForm.value.comments,
      roles: ['MENTOR'],
      techologiesId: this.userForm.value.technologies,
      active: true,
    }
    console.log(user)
    this.userService.create(user)
      .subscribe( () => {
        this.dialogRef.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mentor creado',
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

  addImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      this.userForm.patchValue({
        picture: reader.result
      })
    }
  }

}
