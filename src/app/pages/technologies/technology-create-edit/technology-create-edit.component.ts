import {Component, Inject, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {TechnologyService} from "../../../services/technology.service";
import {CategoryService} from "../../../services/category.service";
import {CategoryModel} from "../../../models/category.model";
import {first} from "rxjs";
import {errorCommunicationWithRetry} from "../../../helpers/error.communication";

@Component({
  selector: 'app-technology-create-edit',
  templateUrl: './technology-create-edit.component.html',
  styleUrls: ['./technology-create-edit.component.css']
})
export class TechnologyCreateEditComponent implements OnInit {

  categories: CategoryModel[] = [];
  messageTitle: string = '';

  public technologyForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.technology.name, [Validators.required, Validators.minLength(2)]),
    categoryId: new FormControl(this.data.technology.category ? this.data.technology.category._id : '', [Validators.required]),
  })

  constructor(
    private technologyService: TechnologyService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll()
      .pipe(
        first()
      ).subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error: any) => {
        errorCommunicationWithRetry(error)
      })
  }

  createEditTechnology() {

    // EDIT
    if (this.data.editAction) {
      this.messageTitle = 'Tecnología actualizada';
      const updateTech = {
        name: this.technologyForm.value.name,
        categoryId: this.technologyForm.value.categoryId,
      }
      this.technologyService.update(this.data.technology._id, updateTech)
        .subscribe( () => {
          this.dialogRef.close({
            formValue: this.technologyForm.value,
            edited: true,
            technologyId: this.data.technology._id,
          })
        })
    }
    // CREATE
    else {
      this.messageTitle = 'Tecnología Creada';
      const newTech = {
        name: this.technologyForm.value.name,
        categoryId: this.technologyForm.value.categoryId,
      }
      this.technologyService.create(newTech)
        .subscribe( () => {
          this.dialogRef.close({
            edited: false
          });

        })
    }

    // Communication
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: this.messageTitle,
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
      showConfirmButton: false,
      timer: 1500
    })
    // const newTechnologyName = this.technologyForm.value.name

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
