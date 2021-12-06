import {Component, Inject, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {CalendarComponent} from "../calendar.component";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  currentTab = 0;

  constructor(
    public dialogRef: MatDialogRef<CalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  calendarEvent: any;

  ngOnChanges(changes: SimpleChanges): void {}

  changeTab(event: any) {
    this.currentTab = event.index;
  }

  ngOnInit(): void {
    this.calendarEvent = this.data.calendarEvent;
  }

}
