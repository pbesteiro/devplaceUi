import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EventCreateEditComponent} from "../../event-create-edit/event-create-edit.component";
import {EventDetailComponent} from "../event-detail.component";
import Swal from "sweetalert2";
import {CalendarEventsService} from "../../../../services/calendar-events.service";

@Component({
  selector: 'app-tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.css']
})
export class TabDetailComponent implements OnInit {

  hashWeek: any = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miercoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado'
  }

  @Input() calendarEvent: any = null;

  constructor(
    public dialogRef: MatDialogRef<EventDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarEventService: CalendarEventsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(EventCreateEditComponent, {
      data: {
        isEdit: this.data.isEdit,
        calendarEvent: this.calendarEvent
      }
    });
  }

  removeClass(classId: string) {
    Swal.fire({
      title: '¿Quiere eliminar la clase?',
      text: ``,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.calendarEventService.update( classId, { active: false } )
          .subscribe( () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Clase eliminada',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              heightAuto: false,
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout( () => {
              window.location.reload();
            }, 1400)
          })

      }
    })
  }



}
