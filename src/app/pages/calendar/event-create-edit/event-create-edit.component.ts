import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesComponent } from '../../courses/courses.component';
import Swal from 'sweetalert2';
import { CourseService } from '../../../services/course.services';
import { first } from 'rxjs';
import { CourseModel } from '../../../models/course.model';
import { CalendarEventsService } from '../../../services/calendar-events.service';
import { UserService } from '../../../services/user.services';

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
    mentor: new FormControl(this.data.calendarEvent.mentor._id, [Validators.required]),
  })

  mentors: any[] = []
  selectedMentors = this.mentors;

  constructor(
    private calendarEventsService: CalendarEventsService,
    private userService: UserService,
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

    this.userService.getAllMentors()
      .subscribe( ( response: any ) => {

        this.mentors = response;


      })
  }

  createEditCourse() {

    console.log( this.data.commissionId )

    if ( this.data.calendarEvent.course._id !== '') {

      const updatedCalendarEvent = {
        capacity: this.courseForm.value.capacity,
        dateFrom: this.courseForm.value.dateFrom,
        dateTo: this.courseForm.value.dateTo,
        days: this.courseForm.value.days,
        timeFrom: this.courseForm.value.hourFrom,
        timeTo: this.courseForm.value.hourTo,
        mentor: this.courseForm.value.mentor,
        course: this.courseForm.value.name,
        commissionId: this.data.commissionId,
      }


      this.calendarEventsService.update(
        this.data.calendarEvent._id,
        updatedCalendarEvent
      )
        .subscribe( () => {
          this.dialogRef.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'curso actualizado',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            heightAuto: false,
            showConfirmButton: false,
            timer: 1500
          })
        })
    } else {

      const newCalendarEvent = {
        course: this.courseForm.value.name,
        dateFrom: this.courseForm.value.dateFrom.toISOString().split('T')[0],
        dateTo: this.courseForm.value.dateTo.toISOString().split('T')[0],
        timeFrom: this.courseForm.value.hourFrom,
        timeTo: this.courseForm.value.hourTo,
        days: this.courseForm.value.days,
        capacity: parseInt(this.courseForm.value.capacity),
        mentorId: this.courseForm.value.mentor,
        commissionId: this.data.commissionId,
      }

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

    setTimeout( () => {
      window.location.reload();
    }, 1400)
  }



}
