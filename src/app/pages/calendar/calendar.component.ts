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

  ngOnInit(): void {
    this.calendarEvensService.getAll()
      .subscribe( (response: any) => {
        response.forEach( (calendarEvent: any) => {
          this.calendarEvents.push({
            title: calendarEvent['course']['name'],
            daysOfWeek: calendarEvent['days'],
            startTime: calendarEvent['timeFrom'],
            endTime: calendarEvent['timeTo'],
            startRecur: calendarEvent['dateFrom'],
            endRecur: calendarEvent['dateTo'],
            extendedProps: { calendarEvent}
          })
        })
      })

    setTimeout( () => {
      this.calendarOptions = this.initCalendar();
    }, 100)

    /*
    setTimeout(() => {
      this.calendarOptions.footerToolbar = false;
      console.log(this.calendarEvents)
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

    const dialogRef = this.dialog.open(EventDetailComponent, {
      // disableClose: true,
      width: '800px',
      data: {
        calendarEvent: clickInfo.event._def
      }
    });

    /*
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
    console.log(clickInfo.event._def)
    */
  }

  openDialog() {
    this.dialog.open(EventCreateEditComponent);
  }

}
