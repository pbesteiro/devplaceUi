import {Component, Inject, OnInit} from "@angular/core";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarComponent} from "../../calendar/calendar.component";
import {CommissionsComponent} from "../commissions.component";
import {CommissionDetailComponent} from "../commission-detail/commission-detail.component";

@Component({
  selector: 'app-commission-add-students',
  templateUrl: './commission-add-students.component.html',
  styleUrls: ['./commission-add-students.component.css']
})
export class CommissionAddStudentsComponent implements OnInit {

  currentTab = 0;
  commissionId: any;
  commission: any;

  constructor(
    public dialogRef: MatDialogRef<CommissionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.commissionId = this.data.commissionId;
    this.commission = this.data.commission;
  }

  changeTab(event: any) {
    this.currentTab = event.index;
  }

  closeEdit() {
    this.dialogRef.close();
  }

}
