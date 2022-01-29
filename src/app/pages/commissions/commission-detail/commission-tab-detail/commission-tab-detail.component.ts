import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {EventCreateEditComponent} from "../../../calendar/event-create-edit/event-create-edit.component";
import {MatTableDataSource} from "@angular/material/table";
import { CalendarEventsService } from "../../../../services/calendar-events.service";

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

  @Input() commissionId: string = '';
  @Input() commission: any = null;

  displayedColumns: string[] = ['class', 'name', 'mentor', 'actionView', 'actionDelete'];
  dataSource = new MatTableDataSource(events);

  constructor(
    private calendarEventService: CalendarEventsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    console.log(this.commission.classes)
    this.dataSource.data = this.commission.classes
  }

  editCalendarEvent(calendarEventId: any) {
    // TODO: Traer calendarEvent
    console.log( calendarEventId )
    this.calendarEventService.getOne(calendarEventId)
      .subscribe( (calendarEvent) => {
        const dialogRef = this.dialog.open(EventCreateEditComponent, {
          data: {
            calendarEvent: calendarEvent
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
}
