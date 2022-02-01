import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {EventCreateEditComponent} from "../../../calendar/event-create-edit/event-create-edit.component";
import {MatTableDataSource} from "@angular/material/table";
import { CalendarEventsService } from "../../../../services/calendar-events.service";
import Swal from "sweetalert2";
import {CommissionCreateEditComponent} from "../../commission-create-edit/commission-create-edit.component";

export interface EventElement {
  name:string;
  actionView: string;
  actionDelete: string;
}

const events: EventElement[] = [];

@Component({
  selector: 'app-commission-tab-detail',
  templateUrl: './commission-tab-detail.component.html',
  styleUrls: ['./commission-tab-detail.component.css']
})
export class CommissionTabDetailComponent implements OnInit {

  daysMap: any = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miercoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
  }

  @Input() commissionId: string = '';
  @Input() commission: any = null;

  displayedColumns: string[] = ['class', 'dayWeek', 'name', 'mentor', 'actionView', 'actionDelete'];
  dataSource = new MatTableDataSource(events);

  constructor(
    private calendarEventService: CalendarEventsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this.commission.classes.filter( (c: any) => {
      console.log( c )
      if ( c.active ) {
        return c
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCalendarEvent(calendarEventId: any) {
    // TODO: Traer calendarEvent
    this.calendarEventService.getOne(calendarEventId)
      .subscribe( (calendarEvent) => {
        const dialogRef = this.dialog.open(EventCreateEditComponent, {
          data: {
            calendarEvent: calendarEvent,
            isEdit: true
          }
        });
      })
  }

  addEvent() {
    this.dialog.open(EventCreateEditComponent, {
      data: {
        commission: this.commission,
        commissionId: this.commissionId,
        calendarEvent: {
          course: {
            _id: '',
            name: '',
          },
          mentor: {
            _id: '',
            name: '',
          }
        }
      }
    });
  }


  dayOfWeek(dateStr: string) {
    const date = new Date( dateStr.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    date.setDate(date.getDate() + 1)
    let numberWeekDay = +date.getDay()
    return this.daysMap[numberWeekDay]
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

  editCommission() {
    this.dialog.open(CommissionCreateEditComponent, {
      data: {
        commission: this.commission,
        isEdit: true,
      }
    });
  }

}
