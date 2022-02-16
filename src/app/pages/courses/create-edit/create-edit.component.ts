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
  messageTitle: string = '';
  types: string[] = ['CURSO', 'BOOTCAMP']

  public courseForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.course.name, [Validators.required]),
    type: new FormControl(this.data.course.type, [Validators.required]),
    technologyId: new FormControl(this.data.course.technology ? this.data.course.technology._id : '', [Validators.required]),
    description: new FormControl(this.data.course.description, [Validators.required]),
    contents: new FormControl(this.data.course.contents, [Validators.required]),
    requirements: new FormControl(this.data.course.requirements, [Validators.required]),
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
    })
  }

  createEditCourse() {

    console.log(this.courseForm.value)

    // GET technology by ID
    const technology = this.technologies.find( tech => tech._id === this.courseForm.value.technologyId);

    // EDIT
    if (this.data.editAction) {
      this.messageTitle = 'Curso Actualizado';
      this.courseService.update(this.data.courseId, this.courseForm.value)
        .subscribe( () => {
          this.dialogRef.close({
            formValue: this.courseForm.value,
            technology,
            edited: true,
            courseId: this.data.courseId,
          })
        })
    }
    // CREATE
    else {
      this.messageTitle = 'Curso Creado';
      this.courseService.create(this.courseForm.value)
        .subscribe( () => {
          this.dialogRef.close({
            formValue: this.courseForm.value,
            technology,
            edited: false
          })
        })
    }

    // Comunication
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: this.messageTitle,
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
      showConfirmButton: false,
      timer: 1500
    })
  }

  closeDialog() {
    this.dialogRef.close();
    /*
    Swal.fire({
      titleText: '¿Quiere abandonar la edición?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Descartar cambios',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
        window.location.reload();
      }
    })
    */
  }

}
