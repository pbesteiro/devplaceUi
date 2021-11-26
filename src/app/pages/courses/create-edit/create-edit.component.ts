import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {createEvent} from "../../../events/event-utils";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../courses.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  daysList: any[] = [
    {id: 0, value: 'Domingo'},
    {id: 1, value: 'Lunes'},
    {id: 2, value: 'Martes'},
    {id: 3, value: 'Miercoles'},
    {id: 4, value: 'Jueves'},
    {id: 5, value: 'Viernes'},
    {id: 6, value: 'Sabado'}
  ];

  public courseForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    dateFrom: new FormControl(new Date(), [Validators.required]),
    dateTo: new FormControl(new Date(), [Validators.required]),
    hourTo: new FormControl('', [Validators.required]),
    hourFrom: new FormControl('', [Validators.required]),
    days: new FormControl([''], [Validators.required]),
  })


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  createEditCourse() {
    console.log(this.courseForm.value);

    const title = this.courseForm.value.name;
    const from = this.courseForm.value.dateFrom;
    const to = this.courseForm.value.dateTo;
    const hourFrom = this.courseForm.value.hourFrom;
    const hourTo = this.courseForm.value.hourTo;
    const days = this.courseForm.value.days

    createEvent(title, from, to, days, hourFrom, hourTo)

    this.dialogRef.close();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'curso creado',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
      showConfirmButton: false,
      timer: 1500
    })

  }

}
