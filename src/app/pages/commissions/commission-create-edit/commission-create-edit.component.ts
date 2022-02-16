import {Component, Inject} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommissionService} from "../../../services/commission.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {CommissionsComponent} from "../commissions.component";
import Swal from "sweetalert2";
import {CalendarComponent} from "../../calendar/calendar.component";

@Component({
  selector: 'app-commission-create-edit',
  templateUrl: './commission-create-edit.component.html',
  styleUrls: ['./commission-create-edit.component.css']
})
export class CommissionCreateEditComponent {

  public commissionForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.commission.name, [Validators.required, Validators.minLength(4)]),
    meetLink: new FormControl(this.data.commission.meetLink, [Validators.required, Validators.minLength(4)]),
  })


  constructor(
    private commissionService: CommissionService,
    public dialogRef: MatDialogRef<CommissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

  createEditCommission() {

    if ( this.data.isEdit ) {
      this.commissionService.update(this.data.commission._id, this.commissionForm.value)
        .subscribe( () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comision actualizada',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            heightAuto: false,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout( () => {
            window.location.reload();
          }, 1400)
        })
    } else {
      this.commissionService.create(this.commissionForm.value)
        .subscribe( () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comision creada',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            heightAuto: false,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout( () => {
            window.location.reload();
          }, 1400)
        })
    }

  }


}
