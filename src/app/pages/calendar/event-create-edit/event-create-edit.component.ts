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
import {EventDetailComponent} from "../event-detail/event-detail.component";

@Component({
  selector: 'app-event-create-edit',
  templateUrl: './event-create-edit.component.html',
  styleUrls: ['./event-create-edit.component.css']
})
export class EventCreateEditComponent implements OnInit {

  isDisabled: boolean = false
  uniqueClass: boolean = false
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
    disabledCheckBox: new FormControl(this.isDisabled),
    name: new FormControl(this.data.calendarEvent.course._id, [Validators.required, Validators.minLength(4)]),
    date: new FormControl(this.fixDatePicker(), [Validators.required]),
    dateTo: new FormControl(this.data.calendarEvent.dateTo, [Validators.required]),
    hourTo: new FormControl(this.data.calendarEvent.timeTo, [Validators.required]),
    hourFrom: new FormControl(this.data.calendarEvent.timeFrom, [Validators.required]),
    days: new FormControl(this.data.calendarEvent.days, [Validators.required]),
    capacity: new FormControl(this.data.calendarEvent.capacity, [Validators.required]),
    linkContentClass: new FormControl(this.data.calendarEvent.linkContentClass, [Validators.required]),
    mentor: new FormControl(this.data.calendarEvent.mentor._id, [Validators.required]),
  })

  mentors: any[] = []
  activeMentors: any[] = []
  selectedMentors = this.mentors;

  constructor(
    private calendarEventsService: CalendarEventsService,
    private userService: UserService,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EventDetailComponent | CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  fixDatePicker() {
    const realDate = new Date( this.data.calendarEvent.date );
    realDate.setMinutes( realDate.getMinutes() + realDate.getTimezoneOffset() )
    return realDate
  }

  ngOnInit(): void {

    this.data.calendarEvent.date = null
    this.manageUniqueClass()

    this.courseService.getAll()
      .pipe(
        first()
      ).subscribe( response => {
      this.courses = response.filter( (course: any) => {
        if (course.active) {
          return course
        }
      })
    }, (error: any) => {
      Swal.fire({
        title: 'Ha ocurrido un problema',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        backdrop: 'rgba(103, 58, 183, 0.3)',
        confirmButtonText: 'Reintentar'
      }).then((result: any) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    })

      this.userService.getAllMentors()
        .subscribe( ( response: any ) => {
          this.activeMentors = response.filter((mentor: any) => {
            if (mentor.active) {
              return mentor
            }
          });
          if (this.data.isEdit) {
            this.setFilterMentors(this.data.calendarEvent.course._id)
          } else {
            this.mentors = this.activeMentors
          }
        }, (error: any) => {
          Swal.fire({
            title: 'Ha ocurrido un problema',
            text: error.message,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            confirmButtonText: 'Reintentar'
          })
        })
  }


  createEditCourse() {

    if ( this.uniqueClass ) {

      if ( this.data.isEdit ) {
        this.editClass(this.courseForm.value.dateFrom)
      } else {
        this.createNewClass(this.courseForm.value.dateFrom)
      }

    } else {
      const recurrentDaysStrArr = this.generateRecurrentDaysArr( this.courseForm.value.date, this.courseForm.value.dateTo, this.courseForm.value.days)
      this.createNewListClass( this.courseForm.value, recurrentDaysStrArr)
    }

    setTimeout( () => {
      window.location.reload();
    }, 1400)
  }

  editClass(courseForm: any) {
    let parseDate = this.courseForm.value.date
    // @ts-ignore
    if ( typeof parseDate === 'object') {
      parseDate = parseDate.toISOString().split('T')[0]
    }

    const updatedClass = {
      courseId: this.courseForm.value.name,
      date: parseDate,
      timeFrom: this.courseForm.value.hourFrom,
      timeTo: this.courseForm.value.hourTo,
      mentorId: this.courseForm.value.mentor,
      commissionId: this.data.commissionId,
      capacity: parseInt(this.courseForm.value.capacity),
      linkContentClass: this.courseForm.value.linkContentClass,
      active: true,
    }

    this.calendarEventsService.update(this.data.calendarEvent._id, updatedClass)
      .subscribe( () => {
        this.dialogRef.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'clase actualizada',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      }, (error: any) => {
        Swal.fire({
          title: 'Ha ocurrido un problema',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          confirmButtonText: 'Reintentar'
        })
      })

  }

  createNewClass(courseForm: any) {
    const newClass: any = {
      classes: []
    }

    newClass.classes.push({
      courseId: this.courseForm.value.name,
      date: this.courseForm.value.date.toISOString().split('T')[0],
      timeFrom: this.courseForm.value.hourFrom,
      timeTo: this.courseForm.value.hourTo,
      mentorId: this.courseForm.value.mentor,
      commissionId: this.data.commissionId,
      capacity: parseInt(this.courseForm.value.capacity),
      linkContentClass: this.courseForm.value.linkContentClass,
      active: true,
    })
    this.createClass(newClass)
  }

  createNewListClass(courseForm: any, days: string[]) {

    const newClass: any = {
      classes: []
    }

    for ( const dayClass of days) {

      newClass.classes.push({
        courseId: this.courseForm.value.name,
        date: dayClass,
        timeFrom: this.courseForm.value.hourFrom,
        timeTo: this.courseForm.value.hourTo,
        mentorId: this.courseForm.value.mentor,
        commissionId: this.data.commissionId,
        capacity: parseInt(this.courseForm.value.capacity),
        linkContentClass: this.courseForm.value.linkContentClass,
        active: true,
      })
    }
    this.createClass(newClass)
  }

  private createClass(newClass: any) {
    this.calendarEventsService.create(newClass)
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
      }, (error: any) => {
        Swal.fire({
          title: 'Ha ocurrido un problema',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          confirmButtonText: 'Reintentar'
        })
      })
  }

  private manageUniqueClass() {
    if (this.data.isEdit) {
      // @ts-ignore
      this.courseForm.get('disabledCheckBox').setValue(true)
      // @ts-ignore
      this.courseForm.get('dateTo').disable()
      // @ts-ignore
      this.courseForm.get('days').disable()
      this.isDisabled = true
      this.uniqueClass = true
      // @ts-ignore
      this.courseForm.get('disabledCheckBox').disable()
    } else {
      // @ts-ignore
      this.courseForm.get('disabledCheckBox')
        .valueChanges
        .subscribe( (check) => {
          if (check) {
            // @ts-ignore
            this.courseForm.get('dateTo').disable()
            // @ts-ignore
            this.courseForm.get('days').disable()
            this.isDisabled = true
            this.uniqueClass = true
          } else {
            // @ts-ignore
            this.courseForm.get('dateTo').enable()
            // @ts-ignore
            this.courseForm.get('days').enable()
            this.isDisabled = false
            this.uniqueClass = false
          }
          this.isDisabled = check
        })
    }
  }

  private generateRecurrentDaysArr(dateFrom: Date, dateTo: Date, days: number[]) {
    // @ts-ignore
    const diffInMs = dateTo - dateFrom
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    let classesDate: any[] = []
    const date = dateFrom
    for (let i = 0; i < diffInDays; i++) {
      if ( days.includes(date.getDay())) {
        classesDate.push( date.toISOString().split('T')[0] )
      }
      date.setDate(date.getDate() + 1);
    }
    return classesDate;
  }

  setFilterMentors(courseId: any) {

    this.courseService.getOneById(courseId)
      .subscribe( (course: any) => {
        this.mentors = this.activeMentors.filter( (mentor: any) => {
          for ( const tech of mentor.technologies ) {
            if ( tech.name === course.technology.name) {
              return mentor;
            }
          }
        })
      }, (error: any) => {
        Swal.fire({
          title: 'Ha ocurrido un problema',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          confirmButtonText: 'Reintentar'
        }).then((result: any) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      })
  }

}
