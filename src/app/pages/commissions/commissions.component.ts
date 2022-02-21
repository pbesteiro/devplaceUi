import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {CommissionService} from "../../services/commission.service";
import {CommissionCreateEditComponent} from "./commission-create-edit/commission-create-edit.component";
import {CommissionDetailComponent} from "./commission-detail/commission-detail.component";
import {CommissionViewDetailComponent} from "./commission-view-detail/commission-view-detail.component";
import {CommissionAddStudentsComponent} from "./commission-add-students/commission-add-students.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {errorCommunicationWithRetry} from "../../helpers/error.communication";

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
  styleUrls: ['./commissions.component.css'],
})
export class CommissionsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'count', 'actionCpyLink', 'actionEdit', 'actionAddStudent', 'actionDelete'];
  dataSource = new MatTableDataSource(commissions);
  loading = true

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private commissionService: CommissionService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.commissionService.getAll()
      .subscribe( (response) => {
        this.dataSource.data = response.filter( (commission: any) => {
          if (commission.active) {
            return commission
          }
        })
        this.loading = false
      }, (error: any) => {
        this.loading = false;
        Swal.fire({
          title: 'Ha ocurrido un problema',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          confirmButtonText: 'Reintentar'
        }).then((result: any) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      })
  }

  openDialog() {

    const dialogRef = this.dialog.open(CommissionCreateEditComponent, {
        data: {
          commission: {
            name: ''
          }
        }
      });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          window.location.reload();
        }
      })

  }

  viewCommissionDetails(id:string, commission: any) {
    const dialogRef = this.dialog.open(CommissionViewDetailComponent, {
      width: '800px',
      data: {
        commissionId: id,
        commission
      }
    })
  }

  editCommission(id: string, commission: any) {
    const dialogRef = this.dialog.open(CommissionDetailComponent, {
      // disableClose: true,
      width: '800px',
      data: {
        commissionId: id,
        commission,
      }
    })
  }

  addStudents(id: string, commission: any) {
    const dialogRef = this.dialog.open(CommissionAddStudentsComponent, {
      // disableClose: true,
      width: '800px',
      data: {
        commissionId: id,
        commission,
      }
    })

    dialogRef.afterClosed()
      .subscribe( () => {
        window.location.reload();
      })
  }

  removeCommission(commissionId: string) {
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
        this.commissionService.update( commissionId, { active: false } )
          .subscribe( () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Comisión eliminada',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              heightAuto: false,
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout( () => {
              window.location.reload();
            }, 1400)
          }, (error: any) => {
            this.loading = false;
            errorCommunicationWithRetry(error)
          })

      }
    })
  }

  copyMeetLink() {
    this._snackBar.open('Link copiado', '📃', {
      duration: 1000,
    });
  }
}
