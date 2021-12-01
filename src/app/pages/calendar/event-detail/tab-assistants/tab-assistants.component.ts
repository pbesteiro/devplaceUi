import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.services";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "../../../users/user-create-edit/user-create-edit.component";
import {AddAssistantsComponent} from "./add-assistants/add-assistants.component";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-tab-assistants',
  templateUrl: './tab-assistants.component.html',
  styleUrls: ['./tab-assistants.component.css']
})
export class TabAssistantsComponent implements OnInit {

  @Input() calendarEvent: any = null;
  displayedColumns: string[] = ['name', 'lastName', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private userService: UserService,
  private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.calendarEvent.extendedProps.calendarEvent.students;
    console.log(this.calendarEvent)
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAssistantsComponent, {
      data: {
        role: 'STUDENT'
      }
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          console.log(result)
        }
      })
  }

}
