import { Component, OnInit } from '@angular/core';
import {CalendarEventsService} from "../../services/calendar-events.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {EventCreateEditComponent} from "../calendar/event-create-edit/event-create-edit.component";
import {EventDetailComponent} from "../calendar/event-detail/event-detail.component";
import Swal from "sweetalert2";
import {CommissionService} from "../../services/commission.service";
import {CommissionCreateEditComponent} from "./commission-create-edit/commission-create-edit.component";
import {CommissionDetailComponent} from "./commission-detail/commission-detail.component";

export interface CommissionElement {
  id: string;
  name: number;
  actionView: string;
  actionDelete: string;
}

const commissions: CommissionElement[] = [];

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actionView', 'actionDelete'];
  dataSource = new MatTableDataSource(commissions);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private commissionService: CommissionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.commissionService.getAll()
      .subscribe( (response) => {
        console.log(response)
        this.dataSource.data = response
      })
  }

  openDialog() {

    const dialogRef = this.dialog.open(CommissionCreateEditComponent, {
        data: {}
      });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          window.location.reload();
        }
      })

    }

  editCommission(id: string, commission: any) {
    const dialogRef = this.dialog.open(CommissionDetailComponent, {
      disableClose: true,
      width: '800px',
      data: {
        commissionId: id,
        commission,
      }
    })
  }


  /*
  removeCalendarEvent(element: any) {
    Swal.fire({
      title: '¿Quiere eliminar la comision?',
      text: ``,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log(`Delete calendarEvent id: ${element._id}`)
        this.commissionService.remove( element._id )
          .subscribe( () => {
            window.location.reload();
          })

      }
    })
  }
  */


}
