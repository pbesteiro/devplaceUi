import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {EventCreateEditComponent} from "../../../calendar/event-create-edit/event-create-edit.component";

@Component({
  selector: 'app-commission-tab-detail',
  templateUrl: './commission-tab-detail.component.html',
  styleUrls: ['./commission-tab-detail.component.css']
})
export class CommissionTabDetailComponent implements OnInit {

  @Input() commissionId: string = '';

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  addEvent() {
    this.dialog.open(EventCreateEditComponent, {
      data: {
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
