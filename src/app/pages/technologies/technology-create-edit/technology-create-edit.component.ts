import {Component, Inject, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {TechnologyService} from "../../../services/technology.service";

@Component({
  selector: 'app-technology-create-edit',
  templateUrl: './technology-create-edit.component.html',
  styleUrls: ['./technology-create-edit.component.css']
})
export class TechnologyCreateEditComponent implements OnInit {

  messageTitle: string = '';

  public technologyForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.technology.name, [Validators.required, Validators.minLength(2)])
  })

  constructor(
    private technologyService: TechnologyService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  createEditTechnology() {

    // EDIT
    if (this.data.editAction) {
      this.messageTitle = 'Tecnología actualizada';
      this.technologyService.update(this.data.technology._id, this.technologyForm.value)
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
      this.technologyService.create(this.technologyForm.value.name)
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
