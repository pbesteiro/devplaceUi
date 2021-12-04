import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {createEvent} from "../../../events/event-utils";
import Swal from "sweetalert2";
import {CourseService} from "../../../services/course.services";
import {first} from "rxjs";
import {CourseModel} from "../../../models/course.model";
import {CalendarEventsService} from "../../../services/calendar-events.service";

@Component({
  selector: 'app-event-create-edit',
  templateUrl: './event-create-edit.component.html',
  styleUrls: ['./event-create-edit.component.css']
})
export class EventCreateEditComponent implements OnInit {

  courses: CourseModel[] = []
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
    name: new FormControl(this.data.calendarEvent.course._id, [Validators.required, Validators.minLength(4)]),
    dateFrom: new FormControl(this.data.calendarEvent.dateFrom, [Validators.required]),
    dateTo: new FormControl(this.data.calendarEvent.dateTo, [Validators.required]),
    hourTo: new FormControl(this.data.calendarEvent.timeTo, [Validators.required]),
    hourFrom: new FormControl(this.data.calendarEvent.timeFrom, [Validators.required]),
    days: new FormControl(this.data.calendarEvent.days, [Validators.required]),
    capacity: new FormControl(this.data.calendarEvent.capacity, [Validators.required]),
  })


  constructor(
    private calendarEventsService: CalendarEventsService,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.courseService.getAll()
      .pipe(
        first()
      ).subscribe( response => {
      this.courses = response
    })
  }

  createEditCourse() {
    console.log(this.courseForm.value);

    const newCalendarEvent = {
      course: this.courseForm.value.name,
      dateFrom: this.courseForm.value.dateFrom.toISOString().split('T')[0],
      dateTo: this.courseForm.value.dateTo.toISOString().split('T')[0],
      timeFrom: this.courseForm.value.hourFrom,
      timeTo: this.courseForm.value.hourTo,
      days: this.courseForm.value.days,
      capacity: parseInt(this.courseForm.value.capacity),
    }

    console.log(newCalendarEvent)

    // createEvent(title, from, to, days, hourFrom, hourTo)
    this.calendarEventsService.create(newCalendarEvent)
      .subscribe( () => {
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
      })
  }

}
