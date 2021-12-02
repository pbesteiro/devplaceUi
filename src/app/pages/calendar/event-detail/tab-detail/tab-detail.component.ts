import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEditComponent} from "../../../courses/create-edit/create-edit.component";
import {EventDetailComponent} from "../event-detail.component";
import {EventCreateEditComponent} from "../../event-create-edit/event-create-edit.component";

@Component({
  selector: 'app-tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.css']
})
export class TabDetailComponent implements OnInit {

  @Input() calendarEvent: any = null;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // console.log(this.calendarEvent)
  }

  openDialog() {
    const dialogRef = this.dialog.open(EventCreateEditComponent, {
      data: {
        calendarEvent: this.calendarEvent
      }
    });
  }

}
