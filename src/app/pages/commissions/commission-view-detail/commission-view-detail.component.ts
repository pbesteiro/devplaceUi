import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommissionsComponent} from "../commissions.component";
import {MatTableDataSource} from "@angular/material/table";
import {EventElement} from "../commission-detail/commission-tab-detail/commission-tab-detail.component";

const events: EventElement[] = [];

@Component({
  selector: 'app-commission-view-detail',
  templateUrl: './commission-view-detail.component.html',
  styleUrls: ['./commission-view-detail.component.css']
})
export class CommissionViewDetailComponent implements OnInit {

  displayedColumns: string[] = ['class', 'name', 'mentor'];
  dataSource = new MatTableDataSource(events);

  constructor(
    public dialogRef: MatDialogRef<CommissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  ngOnInit() {
    this.dataSource.data = this.data.commission.classes
  }

}
