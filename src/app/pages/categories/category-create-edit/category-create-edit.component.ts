import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category-create-edit',
  templateUrl: './category-create-edit.component.html',
  styleUrls: ['./category-create-edit.component.css']
})
export class CategoryCreateEditComponent implements OnInit {

  messageTitle: string = '';

  public categoryForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.category.name, [Validators.required, Validators.minLength(2)])
  })

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  createEditCategory() {

    // EDIT
    if (this.data.editAction) {
      this.messageTitle = 'Categoría actualizada';
      this.categoryService.update(this.data.category._id, this.categoryForm.value)
        .subscribe( () => {
          this.dialogRef.close({
            formValue: this.categoryForm.value,
            edited: true,
            categoryId: this.data.category._id,
          })
        })
    }
    // CREATE
    else {
      this.messageTitle = 'Categoría Creada';
      this.categoryService.create(this.categoryForm.value.name)
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
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
