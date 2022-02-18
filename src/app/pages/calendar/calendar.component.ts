import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from "@fullcalendar/angular";
import {EventApi} from "@fullcalendar/core";
import {createEventId, INITIAL_EVENTS} from "../../events/event-utils";
import esLocale from "@fullcalendar/core/locales/es-us"
import {CreateEditComponent} from "../courses/create-edit/create-edit.component";
import {EventCreateEditComponent} from "./event-create-edit/event-create-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {CalendarEventsService} from "../../services/calendar-events.service";
import {EventDetailComponent} from "./event-detail/event-detail.component";

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
  // public calendarOptions: any = this.initCalendar();
  public calendarOptions: any;
  loading = true

  ngOnInit(): void {
    this.calendarEvensService.getAll()
      .subscribe( (response: any) => {
        response.forEach( (calendarEvent: any) => {

          if ( calendarEvent['active']) {
            this.calendarEvents.push({
              title: `${calendarEvent['commission']['name']} - ${calendarEvent['course']['name']}`,
              // daysOfWeek: calendarEvent['days'],
              date: `${calendarEvent['date']}T${calendarEvent['timeFrom']}:00`,
              end: `${calendarEvent['date']}T${calendarEvent['timeTo']}:00`,
              // startTime: calendarEvent['timeFrom'],
              // endTime: calendarEvent['timeTo'],
              // startRecur: calendarEvent['dateFrom'],
              // endRecur: calendarEvent['dateTo'],
              extendedProps: { calendarEvent}
            })
          }

        })
        this.loading = false;
        this.calendarOptions = this.initCalendar();
      })

    /*
    setTimeout( () => {
      this.calendarOptions = this.initCalendar();
    }, 100)
    */
  }

  constructor(
    private dialog: MatDialog,
    private calendarEvensService: CalendarEventsService
  ) {
  }

  private initCalendar(): CalendarOptions {
    return {
      initialView: 'dayGridMonth',
      // initialView: 'listWeek',
      headerToolbar: {
        left: 'prev,next',
        center: 'today',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      locale: esLocale,
      //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      events: this.calendarEvents,
      contentHeight: 'auto',
      buttonIcons: false,
      weekends: true,
      editable: false,
      selectable: false,
      selectMirror: true,
      dayMaxEvents: true,
      // select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      // eventsSet: this.handleEvents.bind(this)
      /*
      you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
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
