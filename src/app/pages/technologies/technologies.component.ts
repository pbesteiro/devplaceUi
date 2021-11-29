import { Component, OnInit } from '@angular/core';
import {TechnologyModel} from "../../models/technology.model";
import {TechnologyService} from "../../services/technology.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {first} from "rxjs";
import {TechnologyCreateEditComponent} from "./technology-create-edit/technology-create-edit.component";

const technologies: TechnologyModel[] = []

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  technology: TechnologyModel = new TechnologyModel('');

  constructor(
    private dialog: MatDialog,
    private technologiesService: TechnologyService
  ) { }

  displayedColumns: string[] = ['name'];
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
      this.dataSource.data = response
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(TechnologyCreateEditComponent, {
      data: { name: this.technology }
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        const data = this.dataSource.data
        this.technology.name = result
        data.push(this.technology)
        this.dataSource.data = data;
      })
  }

}
