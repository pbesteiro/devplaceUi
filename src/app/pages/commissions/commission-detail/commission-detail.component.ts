import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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
  }

  changeTab(event: any) {
    this.currentTab = event.index;
  }

  closeEdit() {
    this.dialogRef.close();
  }

}
