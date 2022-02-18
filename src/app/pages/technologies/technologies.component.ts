import { Component, OnInit } from '@angular/core';
import {TechnologyModel} from "../../models/technology.model";
import {TechnologyService} from "../../services/technology.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {first} from "rxjs";
import {TechnologyCreateEditComponent} from "./technology-create-edit/technology-create-edit.component";
import Swal from "sweetalert2";

const technologies: TechnologyModel[] = []

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  technology: TechnologyModel = new TechnologyModel('', '', false);
  editAction: boolean = false;
  loading = true

  constructor(
    private dialog: MatDialog,
    private technologiesService: TechnologyService
  ) { }

  displayedColumns: string[] = ['name', 'actionEdit', 'actionDelete'];
  dataSource = new MatTableDataSource(technologies);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.technologiesService.getAll()
      .pipe(
        first()
      ).subscribe( (response: any) => {
      this.dataSource.data = response.filter( (technology: any) => {
        if (technology.active) {
          return technology;
        }
      })
      this.loading = false;
    })
  }

  openDialog(technology?: TechnologyModel) {

    if (technology) {
      this.technology = technology;
      this.editAction = true;
    }

    const dialogRef = this.dialog.open(TechnologyCreateEditComponent, {
      // disableClose: true,
      data: {
        technology: this.technology,
        editAction: this.editAction,
      }
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          window.location.reload();
        }
      })
  }

  removeTechnology(id: string) {
    Swal.fire({
      title: '¿Quiere eliminar la tecnologia?',
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
        this.technologiesService.update(id, { active: false })
          .subscribe( () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Curso eliminado',
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
    })
  }

}
