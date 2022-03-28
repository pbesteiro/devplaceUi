import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MentorListClassesComponent} from "../mentor-list-classes/mentor-list-classes.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {errorCommunicationWithRetry} from "../../../helpers/error.communication";
import {CalendarEventsService} from "../../../services/calendar-events.service";

@Component({
  selector: 'app-mentor-update-status-class',
  templateUrl: './mentor-update-status-class.component.html',
  styleUrls: ['./mentor-update-status-class.component.css']
})
export class MentorUpdateStatusClassComponent implements OnInit {

  public changestatusForm: FormGroup = this.fb.group({
    comments: new FormControl('', [Validators.required, ]),
  })

  constructor(
    private calendarEvents: CalendarEventsService,
    public dialogRef: MatDialogRef<MentorListClassesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  closeDialog() {
    this.dialogRef.close()
  }

  updateStatus() {

    const body = {
      status: 'CERRADA',
      comments: this.changestatusForm.value.comments,
    }

    this.calendarEvents.updateStatus(this.data.class._id, body)
      .subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Clase actualizada',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            heightAuto: false,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout( () => {
            window.location.reload();
          }, 1400)
        },
        (error: any) => {
          errorCommunicationWithRetry(error)
        }
      )
  }

  openDrive(link: string) {
    // @ts-ignore
    window.open(link, '_blank').focus();
  }

}
