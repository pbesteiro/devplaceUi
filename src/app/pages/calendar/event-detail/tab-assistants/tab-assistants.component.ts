import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.services";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserCreateEditComponent} from "../../../users/user-create-edit/user-create-edit.component";
import {AddAssistantsComponent} from "./add-assistants/add-assistants.component";
import {CalendarEventsService} from "../../../../services/calendar-events.service";
import {CoursesComponent} from "../../../courses/courses.component";
import {EventDetailComponent} from "../event-detail.component";
import Swal from "sweetalert2";

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
  studentIds: string[] = []

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private userService: UserService,
    private calendarventService: CalendarEventsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EventDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.dataSource.data = this.calendarEvent.students;
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
          this.studentIds = [];
          const data = this.dataSource.data
          data.push(result.studentAdded)
          this.dataSource.data = data;

          for (let student of data) {
            this.studentIds.push(student._id)
          }
        }
      })
  }

  saveAssistants() {
    this.calendarventService.update(this.calendarEvent._id, {
      studentIds: this.studentIds
    })
      .subscribe( () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comisión actualizada',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close()
      })
  }

}
