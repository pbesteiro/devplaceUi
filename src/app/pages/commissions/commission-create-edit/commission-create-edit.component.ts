import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommissionService} from "../../../services/commission.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../courses/courses.component";
import {CommissionsComponent} from "../commissions.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-commission-create-edit',
  templateUrl: './commission-create-edit.component.html',
  styleUrls: ['./commission-create-edit.component.css']
})
export class CommissionCreateEditComponent {

  public commissionForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  })


  constructor(
    private commissionService: CommissionService,
    public dialogRef: MatDialogRef<CommissionsComponent>,
    private fb: FormBuilder
  ) {
  }

  createEditCommission() {
    this.commissionService.create(this.commissionForm.value)
      .subscribe( () => {
        this.dialogRef.close({})
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comisión creada',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }


}
