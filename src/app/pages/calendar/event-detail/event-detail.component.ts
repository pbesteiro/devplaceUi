import {Component, Inject, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarComponent} from "../calendar.component";
import Swal from "sweetalert2";

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  changeTab(event: any) {
    this.currentTab = event.index;
  }

  ngOnInit(): void {
    this.calendarEvent = this.data.calendarEvent;
  }

  cancelAssistants() {
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
