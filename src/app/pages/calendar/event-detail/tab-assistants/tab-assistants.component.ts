import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../../services/user.services";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddAssistantsComponent} from "./add-assistants/add-assistants.component";
import {CalendarEventsService} from "../../../../services/calendar-events.service";
import {EventDetailComponent} from "../event-detail.component";
import Swal from "sweetalert2";
import {CommissionService} from "../../../../services/commission.service";

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-tab-assistants',
  templateUrl: './tab-assistants.component.html',
  styleUrls: ['./tab-assistants.component.css']
})
export class TabAssistantsComponent implements OnInit {

  @Input() calendarEvent: any = null;
  @Input() commissionId: any = null;
  displayedColumns: string[] = ['name', 'lastName', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  studentIds: string[] = []
  isEdited = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private userService: UserService,
    private calendarventService: CalendarEventsService,
    private commissionService: CommissionService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EventDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.dataSource.data = this.data.commission.students;
    this.getStudentsIds(this.data.commission.students)
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAssistantsComponent, {
      data: {
        role: 'STUDENT',
        students: this.data.commission.students,
      }
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          this.isEdited = true;
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

  removeAssistant(student: any) {

    Swal.fire({
      title: 'Quiere quitar al estudiante',
      text: `${student.name} ${student.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Quitar',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isEdited = true;
        let data = this.dataSource.data
        let el = data.find( s => s._id === student._id)
        const index = data.indexOf( el )
        data.splice( index, 1 )
        this.getStudentsIds(data)
        this.dataSource.data = data;
      }
    })
  }

  cancelAssistants() {

    Swal.fire({
      title: '¿Quiere abandonar la edición?',
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
        this.isEdited = false;
        this.dialogRef.close();
        window.location.reload();
      }
    })


  }

  saveAssistants() {
    Swal.fire({
      title: '¿Confirma los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.commissionService.update(this.commissionId, {
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
          }, (error: any) => {
            Swal.fire({
              title: 'Ha ocurrido un problema',
              text: error.message,
              icon: 'error',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              confirmButtonText: 'Reintentar'
            })
          })
      }
    })
  }

  private getStudentsIds(students: any) {
    this.studentIds = students.map( (student: any) => student._id )
  }
}
