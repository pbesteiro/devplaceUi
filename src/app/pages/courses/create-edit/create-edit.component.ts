import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../courses.component";
import Swal from "sweetalert2";
import {CourseService} from "../../../services/course.services";
import {TechnologyService} from "../../../services/technology.service";
import {first} from "rxjs";
import {TechnologyModel} from "../../../models/technology.model";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  technologies: TechnologyModel[] = [];

  public courseForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    technologyId: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contents: new FormControl('', [Validators.required]),
    requirements: new FormControl('', [Validators.required]),
  })

  constructor(
    private technologyService: TechnologyService,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.technologyService.getAll()
      .pipe(
        first()
      ).subscribe( response => {
        this.technologies = response;
      console.log(this.technologies)
    })
  }

  createEditCourse() {
    console.log(this.courseForm.value)
    this.courseService.create(this.courseForm.value)
      .subscribe( () => {
        this.dialogRef.close(this.courseForm.value)
      })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Curso creado',
        backdrop: 'rgba(103, 58, 183, 0.3)',
        heightAuto: false,
        showConfirmButton: false,
        timer: 1500
      })
  }

}
