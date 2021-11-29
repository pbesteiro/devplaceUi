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

  public technologyForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
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

    const newTechnologyName = this.technologyForm.value.name

    this.technologyService.create(newTechnologyName)
      .subscribe( () => {

        this.dialogRef.close(newTechnologyName);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tecnología creada',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

}
