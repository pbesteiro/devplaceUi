import {Component, Inject, OnInit} from "@angular/core";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarComponent} from "../../calendar/calendar.component";
import {CommissionsComponent} from "../commissions.component";

@Component({
  selector: 'app-commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.css']
})
export class CommissionDetailComponent implements OnInit {

  currentTab = 0;
  commissionId: any;
  commission: any;

  constructor(
    public dialogRef: MatDialogRef<CommissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.commissionId = this.data.commissionId;
    this.commission = this.data.commission;
    console.log(this.data.commission)
  }

  changeTab(event: any) {
    this.currentTab = event.index;
  }

  closeEdit() {
    Swal.fire({
      titleText: '¿Quiere abandonar la edición?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Descartar cambios',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
        window.location.reload();
      }
    })
  }

}
