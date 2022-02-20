import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from "@fullcalendar/angular";
import { EventApi } from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es-us"
import { EventCreateEditComponent } from "./event-create-edit/event-create-edit.component";
import { MatDialog } from "@angular/material/dialog";
import { CalendarEventsService } from "../../services/calendar-events.service";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarVisible = true;
  currentEvents: EventApi[] = [];
  calendarEvents: any[] = []
  initialLocaleCode = 'es';
  public calendarOptions: any;
  loading = true

  ngOnInit(): void {
    this.calendarEvensService.getAll()
      .subscribe(
        (response: any) => {
          response.forEach( (calendarEvent: any) => {

            if ( calendarEvent['active']) {
              this.calendarEvents.push({
                title: `${calendarEvent['commission']['name']} - ${calendarEvent['course']['name']}`,
                date: `${calendarEvent['date']}T${calendarEvent['timeFrom']}:00`,
                end: `${calendarEvent['date']}T${calendarEvent['timeTo']}:00`,
                extendedProps: { calendarEvent}
              })
            }

          })
          this.loading = false;
          this.calendarOptions = this.initCalendar();
      }, (error: any) => {
          this.loading = false;
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
        }
      )
  }

  constructor(
    private dialog: MatDialog,
    private calendarEvensService: CalendarEventsService
  ) {
  }

  private initCalendar(): CalendarOptions {
    return {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today,dayGridMonth,timeGridWeek,timeGridDay',
      },
      locale: esLocale,
      events: this.calendarEvents,
      contentHeight: 'auto',
      buttonIcons: false,
      weekends: true,
      editable: false,
      selectable: false,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: this.handleEventClick.bind(this),
    };
  }

  handleEventClick(clickInfo: EventClickArg) {

    this.dialog.open(EventDetailComponent, {
      width: '800px',
      data: {
        isEdit: true,
        calendarEvent: clickInfo.event._def.extendedProps['calendarEvent']
      }
    });
  }

  openDialog() {
    this.dialog.open(EventCreateEditComponent, {
      data: {
        calendarEvent: {
          course: {
            _id: '',
            name: '',
          },
          mentor: {
            _id: '',
            name: '',
          }
        },
        isEdit: true,
      },
    });
  }

}
