import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EventCreateEditComponent} from "../../event-create-edit/event-create-edit.component";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "../../../../services/user.services";
import {FormControl, Validators} from "@angular/forms";

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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.calendarEvent)

  }

  openDialog() {
    console.log('ESTE')
    console.log(this.calendarEvent)
    const dialogRef = this.dialog.open(EventCreateEditComponent, {
      data: {
        calendarEvent: this.calendarEvent
      }
    });
  }



}
