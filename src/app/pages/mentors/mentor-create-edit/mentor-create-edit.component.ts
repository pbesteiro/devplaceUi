import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {MentorsComponent} from "../mentors.component";
import {first} from "rxjs";
import {TechnologyService} from "../../../services/technology.service";
import {TechnologyModel} from "../../../models/technology.model";

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
    picture: new FormControl('assets/img/default-img.png'),
    technologies: new FormControl([], [Validators.required]),
    linkedin: new FormControl('', [Validators.minLength(4)]),
    comments: new FormControl('', [Validators.minLength(4)]),
  })

  constructor(
    public dialogRef: MatDialogRef<MentorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private technologyService: TechnologyService,
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
    console.log(this.userForm.value)
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
