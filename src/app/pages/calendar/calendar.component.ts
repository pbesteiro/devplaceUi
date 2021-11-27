import { Component, OnInit } from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from "@fullcalendar/angular";
import {EventApi} from "@fullcalendar/core";
import {createEventId, INITIAL_EVENTS} from "../../events/event-utils";
import esLocale from "@fullcalendar/core/locales/es-us"
import {CreateEditComponent} from "../courses/create-edit/create-edit.component";
import {EventCreateEditComponent} from "./event-create-edit/event-create-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {CalendarEventsService} from "../../services/calendar-events.service";

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
  public calendarOptions: any = this.initCalendar();

  ngOnInit(): void {
    this.calendarEvensService.getAll()
      .subscribe( (response: any) => {
        response.forEach( (calendarEvent: any) => {
          console.log(calendarEvent)
          this.calendarEvents.push({
            title: calendarEvent['course'],
            daysOfWeek: calendarEvent['days'],
            startTime: calendarEvent['timeFrom'],
            endTime: calendarEvent['timeTo'],
            startRecur: calendarEvent['dateFrom'],
            endRecur: calendarEvent['dateTo'],
          })
        })
      })
    setTimeout(() => {
      this.calendarOptions.footerToolbar = false;
      console.log(this.calendarEvents)
    }, 100)
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
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      // initialEvents: this.calendarEvents,
      contentHeight: 'auto',
      buttonIcons: false,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
      /*
      you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
    console.log(clickInfo.event._def)
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  openDialog() {
    this.dialog.open(EventCreateEditComponent);
  }

}
